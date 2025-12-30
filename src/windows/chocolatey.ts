import { ChocolateyInfo } from "../../types/windows/chocolatey";
import { Nuspec } from "../../types/windows/nuspec";
import { EncodingError } from "../encoding/errors";
import { readXml } from "../encoding/xml";
import { getEnvValue } from "../environment/env";
import { FileError } from "../filesystem/errors";
import { glob } from "../filesystem/files";
import { WindowsError } from "./errors";

/**
 * Function to get installed Chocolatey packages.
 * By default will use the `ChocolateyInstall` ENV value to determine base path
 * @param alt_base Optional alternative Chocolatey installation base_path
 * @returns Array of `ChocolateyInfo` or `WindowsError`
 */
export function getChocolateyInfo(
  alt_base?: string,
): ChocolateyInfo[] | WindowsError {
  let base_path = getEnvValue("ChocolateyInstall");
  if (base_path === "" && alt_base === undefined) {
    return new WindowsError(
      "CHOCOLATEYINFO",
      `could not get chocolatey env variable`,
    );
  } else if (alt_base !== undefined) {
    base_path = alt_base;
  }

  const glob_path = `${base_path}\\lib\\*\\*.nuspec`;
  const globs = glob(glob_path);
  if (globs instanceof FileError) {
    return new WindowsError(
      "CHOCOLATEYINFO",
      `failed to glob ${glob_path}: ${globs.message}`,
    );
  }

  const packages: ChocolateyInfo[] = [];
  for (const path of globs) {
    // Read the Nuspec XML file
    const xml_data = readXml(path.full_path) as unknown as Nuspec;
    if (xml_data instanceof EncodingError) {
      console.warn(`failed to parse ${path.full_path}: ${xml_data.message}`);
      continue;
    }
    const entry = xml_data.package.metadata.at(0);
    if (entry === undefined) {
      continue;
    }

    // Try to grab some info
    const chocolate: ChocolateyInfo = {
      name: entry.id[ 0 ] ?? "",
      version: entry.version[ 0 ] ?? "",
      summary: typeof entry.summary === "undefined"
        ? ""
        : entry.summary[ 0 ] ?? "",
      author: entry.authors[ 0 ] ?? "",
      license: typeof entry.licenseUrl === "undefined"
        ? ""
        : entry.licenseUrl[ 0 ] ?? "",
      tags: typeof entry.tags === "undefined"
        ? []
        : (entry.tags[ 0 ] ?? "").split(" "),
      path: path.full_path,
    };
    packages.push(chocolate);
  }

  return packages;
}
