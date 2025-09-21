import { getPlist, outputResults } from "../../../mod";
import { IosError } from "../error";
import { MacosError } from "../../macos/errors";
import { InfoPlist, StatusPlist } from "../../../types/ios/itunes/backup";
import { extractAppInfo, getAppPaths, parseAppItunesMetadata } from "./apps";
import { ManifestPlist } from "../../../types/ios/itunes/manifest";
import { queryDomains } from "./manifest";
import { Output } from "../../system/output";

/**
 * Resources:
 * https://www.richinfante.com/2017/3/16/reverse-engineering-the-ios-backup
 * https://theapplewiki.com/wiki/ITunes_Backup#Record_(variable_size)
 */

/**
 * Function to parse data from an iTunes backup
 * @param path Path to iTunes backup directory
 * @param output `Output` object
 * @returns Nothing or `IosError`
 */
export function extractBackup(
  path: string,
  output: Output,
): undefined | IosError {
  const info = getInfo(path);
  if (info instanceof IosError) {
    return info;
  }

  outputResults(info, "itunes_info.plist", output);

  const status = getStatus(path);
  if (status instanceof IosError) {
    return status;
  }
  outputResults(status, "itunes_status.plist", output);

  const manifest = getManifest(path);
  if (manifest instanceof IosError) {
    return manifest;
  }

  outputResults(manifest, "itunes_manifest.plist", output);

  const domains = queryDomains(path);
  if (domains instanceof IosError) {
    return domains;
  }

  output.directory = `${output.directory}/apps`;
  const output_name = output.name;
  for (const domain of domains) {
    const paths = getAppPaths(path, domain.namespace);
    if (paths instanceof IosError) {
      continue;
    }

    output.name = `${output_name}_${domain.namespace}`;
    outputResults(paths, domain.namespace, output);
    extractAppInfo(paths, domain.namespace, path, output);
  }
}

/**
 * Function to parse the `Info.plist` file and embedded metadata
 * @param path Path to iTunes backup directory
 * @returns `InfoPlist` object or `IosError`
 */
function getInfo(path: string): InfoPlist | IosError {
  const result = getPlist(`${path}/Info.plist`);
  if (result instanceof MacosError) {
    return new IosError(
      `INFO_PLIST`,
      `failed to parse Info.plist file: ${result}`,
    );
  }

  const info = result as unknown as InfoPlist;
  for (const key in info.Applications) {
    const data = info.Applications[ key ].iTunesMetadata;
    const result = parseAppItunesMetadata(Uint8Array.from(data as number[]));
    if (result instanceof IosError) {
      continue;
    }
    info.Applications[ key ].iTunesMetadata = result;
  }
  return info;
}

/**
 * Function to parse the `Status.plist` file
 * @param path Path to iTunes backup directory
 * @returns `StatusPlist` object or `IosError`
 */
function getStatus(path: string): StatusPlist | IosError {
  const result = getPlist(`${path}/Status.plist`);
  if (result instanceof MacosError) {
    return new IosError(
      `STATUS_PLIST`,
      `failed to parse Status.plist file: ${result}`,
    );
  }
  return result as unknown as StatusPlist;
}

/**
 * Function to parse the `Manifest.plist` file
 * @param path Path to iTunes backup directory
 * @returns `ManifestPlist` object or `IosError`
 */
function getManifest(path: string): ManifestPlist | IosError {
  const result = getPlist(`${path}/Manifest.plist`);
  if (result instanceof MacosError) {
    return new IosError(
      `MANIFEST_PLIST`,
      `failed to parse Manifest.plist file: ${result}`,
    );
  }

  return result as unknown as ManifestPlist;
}
