import {
  HomebrewData,
  HomebrewFormula,
  HomebrewReceipt,
} from "../../types/macos/homebrew.ts";
import { FileError } from "../filesystem/errors.ts";
import { glob, readTextFile } from "../filesystem/files.ts";
import { unixEpochToISO } from "../time/conversion.ts";

/**
 * Function to get Homebrew info on installed packages and Casks
 * @returns `HomebrewData` which includes data on Homebrew packages and Casks
 */
export function getHomebrewInfo(): HomebrewData {
  const packages = getPackages();
  const casks = getCasks();

  const info: HomebrewData = {
    packages,
    casks,
  };

  return info;
}

/**
 * Function to get installed Homebrew packages. Does **not** include Casks.
 * Use `getHomebrewInfo()` to get packages and Casks
 * @param glob_path Optional glob to use for Homebrew data
 * @returns Array of `HomebrewReceipt`
 */
export function getPackages(glob_path?: string): HomebrewReceipt[] {
  // Default paths to glob if we are not provided a path
  let paths = [
    "/opt/homebrew/Cellar/*/*/INSTALL_RECEIPT.json",
    "/usr/local/Cellar/*/*/INSTALL_RECEIPT.json",
  ];

  // Use user provided glob path
  if (glob_path != undefined) {
    paths = [glob_path];
  }
  const brew_receipts: HomebrewReceipt[] = [];

  // Loop through all paths
  for (const path of paths) {
    const globs = glob(path);
    if (globs instanceof FileError) {
      console.warn(`failed to glob ${path}: ${globs}`);
      continue;
    }

    for (const entry of globs) {
      const brew_info: HomebrewReceipt = {
        installedAsDependency: false,
        installedOnRequest: false,
        installTime: "",
        sourceModified: "",
        version: "",
        name: "",
        description: "",
        homepage: "",
        url: "",
        license: "",
        caskName: "",
        formulaPath: "",
      };
      // Get base path for ruby formulas
      const dirs = entry.full_path.split("/");
      dirs.pop();
      dirs.push(".brew/*.rb");

      const rb_glob = dirs.join("/");
      // Now glob for ruby files
      const rb_path = glob(rb_glob);
      if (rb_path instanceof FileError) {
        continue;
      }

      // Loop through the ruby file(s)
      for (const rb of rb_path) {
        if (!rb.is_file) {
          continue;
        }
        const formula = parseRuby(rb.full_path);
        if (formula instanceof FileError) {
          console.warn(
            `failed to parse ruby formula ${entry.full_path}: ${formula}`,
          );
          continue;
        }

        brew_info.description = formula.description;
        brew_info.homepage = formula.homepage;
        brew_info.url = formula.url;
        brew_info.license = formula.license;
        brew_info.caskName = formula.caskName;
        brew_info.formulaPath = formula.formulaPath;
        brew_info.version = formula.version;
        brew_info.name = rb.filename.substring(0, rb.filename.length - 3);

        // Parse the INSTALL_RECEIPT.json now
        const receipt = readTextFile(entry.full_path);
        if (receipt instanceof FileError) {
          console.warn(
            `failed to read install_receipt.json format ${entry.full_path}: ${receipt}`,
          );
          continue;
        }
        const receipt_data = JSON.parse(receipt);

        brew_info.installTime = unixEpochToISO(receipt_data["time"]);
        brew_info.installedAsDependency =
          receipt_data["installed_as_dependency"];
        brew_info.installedOnRequest = receipt_data["installed_on_request"];
        brew_info.sourceModified = unixEpochToISO(
          receipt_data["source_modified_time"],
        );
      }

      brew_receipts.push(brew_info);
    }
  }
  return brew_receipts;
}

/**
 * Function to get Homebrew Casks. Does **not** include packages
 * Use `getHomebrewInfo()` to get packages and Casks
 * @param glob_path Optional glob to use for Homebrew Casks
 * @returns Array of `HomebrewFormula`
 */
export function getCasks(glob_path?: string): HomebrewFormula[] {
  let paths = [
    "/usr/local/Caskroom/*/.metadata/*/*/Casks/*.rb",
    "/opt/homebrew/Caskroom/*/.metadata/*/*/Casks/*.rb",
    "/usr/local/Caskroom/*/.metadata/*/*/Casks/*.json",
    "/opt/homebrew/Caskroom/*/.metadata/*/*/Casks/*.json",
  ];

  if (glob_path != undefined) {
    paths = [glob_path];
  }

  const casks: HomebrewFormula[] = [];

  for (const path of paths) {
    const globs = glob(path);
    if (globs instanceof FileError) {
      console.warn(`failed to glob ${path}: ${globs}`);
      continue;
    }

    for (const entry of globs) {
      if (entry.filename.endsWith(".json")) {
        const text = readTextFile(entry.full_path);
        if (text instanceof FileError) {
          console.warn(
            `failed to read json ${entry.full_path}: ${text}`,
          );
          continue;
        }

        const data = JSON.parse(text);
        const formula: HomebrewFormula = {
          description: data["desc"],
          homepage: data["homepage"],
          url: data["url"],
          license: "",
          caskName: data["name"].join(" "),
          formulaPath: entry.full_path,
          version: data["version"],
        };
        casks.push(formula);
      }
      if (!entry.filename.endsWith(".rb")) {
        continue;
      }

      const formula = parseRuby(entry.full_path);
      if (formula instanceof FileError) {
        console.warn(
          `failed to parse ruby formula ${entry.full_path}: ${formula}`,
        );
        continue;
      }
      casks.push(formula);
    }
  }
  return casks;
}

/**
 * Function to parse the Ruby formula associated with Hoembrew package
 * @param path Path to the Ruby file to parse
 * @returns `HomebrewFormula` or FileError
 */
function parseRuby(path: string): HomebrewFormula | FileError {
  const desc = /(?<=desc ).*$/m;
  const homepage_reg = /(?<=homepage ).*$/m;
  const reg_license = /(?<=license ).*$/m;
  const reg_url = /(?<=url ).*$/m;
  const reg_name = /(?<=name ).*$/m;
  const reg_version = /(?<=version ).*$/m;

  const rubyText = readTextFile(path);
  if (rubyText instanceof FileError) {
    return rubyText;
  }

  const description = rubyText.match(desc);
  const receipt: HomebrewFormula = {
    description: "",
    homepage: "",
    url: "",
    license: "",
    caskName: "",
    formulaPath: path,
    version: "",
  };
  if (typeof description?.[0] === "string") {
    receipt.description = description?.[0].replaceAll('"', "");
  }

  const homepage = rubyText.match(homepage_reg);
  if (typeof homepage?.[0] === "string") {
    receipt.homepage = homepage?.[0].replaceAll('"', "");
  }

  const license = rubyText.match(reg_license);
  if (typeof license?.[0] === "string") {
    receipt.license = license?.[0].replaceAll('"', "");
  }

  const url = rubyText.match(reg_url);
  if (typeof url?.[0] === "string") {
    receipt.url = url?.[0].replaceAll('"', "");
  }

  const name = rubyText.match(reg_name);
  if (typeof name?.[0] === "string") {
    receipt.caskName = name?.[0].replaceAll('"', "");
  }

  const version = rubyText.match(reg_version);
  if (typeof version?.[0] === "string") {
    receipt.version = version?.[0].replaceAll('"', "");
  }

  return receipt;
}
