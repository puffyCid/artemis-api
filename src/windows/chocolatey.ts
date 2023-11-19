import { ChocolateyInfo } from "../../types/windows/chocolatey.ts";
import { Nuspec } from "../../types/windows/nuspec.ts";
import { EncodingError } from "../encoding/errors.ts";
import { readXml } from "../encoding/xml.ts";
import { getEnvValue } from "../environment/env.ts";
import { FileError } from "../filesystem/errors.ts";
import { glob } from "../filesystem/mod.ts";
import { WindowsError } from "./errors.ts";

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
    return [];
  } else if (alt_base != undefined) {
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

  const packages = [];
  for (const path of globs) {
    // Read the Nuspec XML file
    const xml_data = readXml(path.full_path) as unknown as Nuspec;
    if (xml_data instanceof EncodingError) {
      console.warn(`failed to parse ${path.full_path}: ${xml_data.message}`);
      continue;
    }

    // Try to grab some info
    const chocolate: ChocolateyInfo = {
      name: xml_data.package.metadata[0].id[0],
      version: xml_data.package.metadata[0].version[0],
      summary: typeof xml_data.package.metadata[0].summary === "undefined"
        ? ""
        : xml_data.package.metadata[0].summary[0],
      author: xml_data.package.metadata[0].authors[0],
      license: typeof xml_data.package.metadata[0].licenseUrl === "undefined"
        ? ""
        : xml_data.package.metadata[0].licenseUrl[0],
      tags: typeof xml_data.package.metadata[0].tags === "undefined"
        ? []
        : xml_data.package.metadata[0].tags[0].split(" "),
      path: path.full_path,
    };
    packages.push(chocolate);
  }

  return packages;
}
