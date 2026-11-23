import { AccessorProtocol, EntryKind, FileHandle, GlobMatch } from "../../types/filesystem/accessor";
import {
  HomebrewData,
  HomebrewFormula,
  HomebrewReceipt,
} from "../../types/macos/homebrew";
import { Accessor } from "../filesystem/accessor";
import { FileError } from "../filesystem/errors";
import { readTextFile } from "../filesystem/files";
import { unixEpochToISO } from "../time/conversion";

/**
 * Function to get Homebrew info on installed packages and Casks
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @returns `HomebrewData` which includes data on Homebrew packages and Casks
 */
export function getHomebrewInfo(protocol = AccessorProtocol.Host): HomebrewData {
  const packages = getPackages(protocol);
  const casks = getCasks(protocol);

  const info: HomebrewData = {
    packages,
    casks,
  };

  return info;
}

/**
 * Function to get installed Homebrew packages. Does **not** include Casks.
 * Use `getHomebrewInfo()` to get packages and Casks
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional path to Homebrew data
 * @returns Array of `HomebrewReceipt`
 */
export function getPackages(protocol = AccessorProtocol.Host, alt_path?: string): HomebrewReceipt[] {
  // Default paths to glob if we are not provided a path
  const paths = alt_path ? [ alt_path ] : [
    "/opt/homebrew/Cellar/*/*/INSTALL_RECEIPT.json",
    "/usr/local/Cellar/*/*/INSTALL_RECEIPT.json",
  ];

  const brew_receipts: HomebrewReceipt[] = [];
  const accessor = new Accessor();
  for (const path of paths) {
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
      continue;
    }

    for (const entry of matches) {
      if (entry.meta.kind !== EntryKind.File) {
        continue;
      }

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

      const ruby_file = `${entry.meta.directory}/.brew/*.rb`;
      const ruby_match = accessor.globfs(ruby_file, protocol);
      if (ruby_match instanceof FileError) {
        continue;
      }

      // Loop through the ruby file(s)
      for (const rb of ruby_match) {
        if (rb.meta.kind !== EntryKind.File) {
          continue;
        }
        const formula = parseRuby(rb);
        if (formula instanceof FileError) {
          console.warn(
            `failed to parse ruby formula ${rb.meta.display_path}: ${formula}`,
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
        brew_info.name = rb.meta.filename.substring(0, rb.meta.filename.length - 3);

        // Parse the INSTALL_RECEIPT.json now
        const receipt = readTextFile(entry.handle as FileHandle);
        if (receipt instanceof FileError) {
          console.warn(
            `failed to read install_receipt.json format ${entry.meta.display_path}: ${receipt}`,
          );
          continue;
        }
        const receipt_data = JSON.parse(receipt);

        brew_info.installTime = unixEpochToISO(receipt_data[ "time" ]);
        brew_info.installedAsDependency =
          receipt_data[ "installed_as_dependency" ];
        brew_info.installedOnRequest = receipt_data[ "installed_on_request" ];
        brew_info.sourceModified = unixEpochToISO(
          receipt_data[ "source_modified_time" ],
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
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional path to use for Homebrew Casks
 * @returns Array of `HomebrewFormula`
 */
export function getCasks(protocol = AccessorProtocol.Host, alt_path?: string): HomebrewFormula[] {
  const paths = alt_path ? [ alt_path ] : [
    "/usr/local/Caskroom/*/.metadata/*/*/Casks/*.rb",
    "/opt/homebrew/Caskroom/*/.metadata/*/*/Casks/*.rb",
    "/usr/local/Caskroom/*/.metadata/*/*/Casks/*.json",
    "/opt/homebrew/Caskroom/*/.metadata/*/*/Casks/*.json",
  ];
  const accessor = new Accessor();

  const casks: HomebrewFormula[] = [];
  for (const path of paths) {
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
      console.warn(`failed to glob ${path}: ${matches}`);
      continue;
    }

    for (const entry of matches) {
      if (entry.meta.kind !== EntryKind.File) {
        continue;
      }

      if (entry.meta.extension === "json") {
        const text = readTextFile(entry.handle as FileHandle);
        if (text instanceof FileError) {
          console.warn(
            `failed to read json '${entry.meta.display_path}': ${text}`,
          );
          continue;
        }

        const data = JSON.parse(text);
        const formula: HomebrewFormula = {
          description: data[ "desc" ],
          homepage: data[ "homepage" ],
          url: data[ "url" ],
          license: "",
          caskName: data[ "name" ].join(" "),
          formulaPath: entry.meta.display_path,
          version: data[ "version" ],
        };
        casks.push(formula);
      } else if (entry.meta.extension === "rb") {
        const formula = parseRuby(entry);
        if (formula instanceof FileError) {
          console.warn(
            `failed to parse ruby formula ${entry.meta.display_path}: ${formula}`,
          );
          continue;
        }
        casks.push(formula);

      }
    }
  }

  return casks;
}

/**
 * Function to parse the Ruby formula associated with Homebrew package
 * @param entry `GlobMatch` object to the Ruby file to parse
 * @returns `HomebrewFormula` or FileError
 */
function parseRuby(entry: GlobMatch): HomebrewFormula | FileError {
  const desc = /(?<=desc ).*$/m;
  const homepage_reg = /(?<=homepage ).*$/m;
  const reg_license = /(?<=license ).*$/m;
  const reg_url = /(?<=url ).*$/m;
  const reg_name = /(?<=name ).*$/m;

  const version_value = entry.meta.full_path.split("/");
  let version;
  if (entry.meta.full_path.includes("/Casks/")) {
    version = version_value[ version_value.length - 4 ] ?? "";
  } else {
    version = version_value[ version_value.length - 3 ] ?? "";
  }

  const rubyText = readTextFile(entry.handle as FileHandle);
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
    formulaPath: entry.meta.display_path,
    version,
  };
  if (typeof description?.[ 0 ] === "string") {
    receipt.description = description?.[ 0 ].replaceAll('"', "");
  }

  const homepage = rubyText.match(homepage_reg);
  if (typeof homepage?.[ 0 ] === "string") {
    receipt.homepage = homepage?.[ 0 ].replaceAll('"', "");
  }

  const license = rubyText.match(reg_license);
  if (typeof license?.[ 0 ] === "string") {
    receipt.license = license?.[ 0 ].replaceAll('"', "");
  }

  const url = rubyText.match(reg_url);
  if (typeof url?.[ 0 ] === "string") {
    receipt.url = url?.[ 0 ].replaceAll('"', "");
  }

  const name = rubyText.match(reg_name);
  if (typeof name?.[ 0 ] === "string" && entry.meta.full_path.includes("Cask")) {
    receipt.caskName = name?.[ 0 ].replaceAll('"', "");
  }

  return receipt;
}

/**
 * Function to test Homebrew parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate Homebrew parsing
 */
export function testHomebrew(): void {
  const install = "../../test_data/macos/homebrew/INSTALL_RECEIPT.json";
  const results = getPackages(AccessorProtocol.Host, install);

  if (results.length !== 1 || results[ 0 ] === undefined) {
    throw `Got ${results.length} expected 1.......getPackages ❌`;
  }

  if (results[ 0 ].name != "typescript") {
    throw `Got ${results[ 0 ].name} expected typescript.......getPackages ❌`;
  }

  console.info(`  Function getPackages ✅`);

  const casks = "../../test_data/macos/homebrew/casks/.metadata/1.157.0,541/20250926015539.699/Casks/duckduckgo.json";

  const results_casks = getCasks(AccessorProtocol.Host, casks);

  if (results_casks.length !== 1 || results_casks[ 0 ] === undefined) {
    throw `Got ${results_casks.length} expected 1.......getCasks ❌`;
  }

  if (results_casks[ 0 ].caskName != "DuckDuckGo") {
    throw `Got ${results_casks[ 0 ].caskName} expected DuckDuckGo.......getCasks ❌`;
  }

  console.info(`  Function getCasks ✅`);

  const ruby = "../../test_data/macos/homebrew/.brew/typescript.rb";
  const matches = new Accessor().globfs(ruby);
  if (matches instanceof FileError) {
    return;
  }

  const results_ruby = parseRuby(matches.at(0) as GlobMatch);
  if (results_ruby instanceof FileError) {
    throw results;
  }

  if (results_ruby.url != "https://registry.npmjs.org/typescript/-/typescript-5.9.2.tgz") {
    throw `Got ${results_ruby.url} expected 'https://registry.npmjs.org/typescript/-/typescript-5.9.2.tgz'.......parseRuby ❌`;
  }

  console.info(`  Function parseRuby ✅`);
}