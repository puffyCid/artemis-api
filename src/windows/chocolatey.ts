import { AccessorProtocol, EntryKind, FileHandle } from "../../types/filesystem/accessor";
import { ChocolateyInfo } from "../../types/windows/chocolatey";
import { Nuspec } from "../../types/windows/nuspec";
import { EncodingError } from "../encoding/errors";
import { readXml } from "../encoding/xml";
import { getEnvValue } from "../environment/env";
import { Accessor } from "../filesystem/accessor";
import { FileError } from "../filesystem/errors";
import { WindowsError } from "./errors";

/**
 * Function to get installed Chocolatey packages.
 * By default will use the `ChocolateyInstall` ENV value to determine base path
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative Chocolatey installation base_path
 * @returns Array of `ChocolateyInfo` or `WindowsError`
 */
export function getChocolateyInfo(
  protocol = AccessorProtocol.Host,
  alt_path?: string,
): ChocolateyInfo[] | WindowsError {
  const base_path = getEnvValue("ChocolateyInstall");
  if (base_path === "" && alt_path === undefined) {
    return new WindowsError(
      "CHOCOLATEYINFO",
      `could not get chocolatey env variable`,
    );
  }
  let path = `${base_path}\\lib\\*\\*.nuspec`;

  if (alt_path !== undefined) {
    path = alt_path;
  }

  const accessor = new Accessor();
  // Based on the `AccessorProtocol` glob for nuspec files
  const matches = accessor.globfs(path, protocol);
  if (matches instanceof FileError) {
    return new WindowsError('CHOCOLATEYINFO', `failed to glob for ${path}: ${matches}`);
  }

  const packages: ChocolateyInfo[] = [];
  for (const path of matches) {
    if (path.meta.kind !== EntryKind.File) {
      continue;
    }

    // Read the Nuspec XML file
    const xml_data = readXml(path.handle as FileHandle);
    if (xml_data instanceof EncodingError) {
      console.warn(`failed to parse ${path.meta.display_path}: ${xml_data.message}`);
      continue;
    }
    const xml_value = xml_data as unknown as Nuspec;
    const entry = xml_value.package.metadata.at(0);
    if (entry === undefined) {
      continue;
    }

    // Try to grab some info
    const chocolate: ChocolateyInfo = {
      name: entry.id[0] ?? "",
      version: entry.version[0] ?? "",
      summary: typeof entry.summary === "undefined"
        ? ""
        : entry.summary[0] ?? "",
      author: entry.authors[0] ?? "",
      license: typeof entry.licenseUrl === "undefined"
        ? ""
        : entry.licenseUrl[0] ?? "",
      tags: typeof entry.tags === "undefined"
        ? []
        : (entry.tags[0] ?? "").split(" "),
      path: path.meta.full_path,
    };
    packages.push(chocolate);
  }

  return packages;
}
