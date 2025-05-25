import { getPlist, querySqlite } from "../../../mod";
import {
  FileMetadata,
  ManifestApp,
} from "../../../types/ios/itunes/manifest";
import { AppMetadata } from "../../../types/ios/itunes/metadata";
import { ApplicationError } from "../../applications/errors";
import { decode } from "../../encoding/base64";
import { EncodingError } from "../../encoding/errors";
import { MacosError } from "../../macos/errors";
import { Output } from "../../system/output";
import { unixEpochToISO } from "../../time/conversion";
import { extractAmazonEcho } from "../apps/amazon/echo/echo";
import { extractDuckDuckGo } from "../apps/duckduckgo/duck";
import { extractHingeInfo } from "../apps/hinge/hinge";
import { extractZoom } from "../apps/zoom/zoom";
import { extractHomeDomain } from "../domains/home/home";
import { extractRootDomain } from "../domains/root/root";
import { extractAppleLinkd } from "../domains/syscontainer/linkd";
import { IosError } from "../error";

/**
 * Function to parse the binary plist info in `iTunesMetadata`
 * @param data Binary plist
 * @returns `AppMetadata` object or `IosError`
 */
export function parseAppItunesMetadata(
  data: Uint8Array,
): AppMetadata | IosError {
  const result = getPlist(data);
  if (result instanceof MacosError) {
    return new IosError(
      `APP_ITUNES_METADATA`,
      `failed to parse binary plist for app itunes metadata: ${result}`,
    );
  }

  return result as unknown as AppMetadata;
}

/**
 * Function to extract App paths in the backup for a specific namespace
 * @param path Path to the iTunes backup directory
 * @param namespace App namespace to query
 * @returns Array of `ManifestApp` or `IosError`
 */
export function getAppPaths(
  path: string,
  namespace: string,
): ManifestApp[] | IosError {
  const db_path = `${path}/Manifest.db`;
  const query = `SELECT
                    domain, 
                    relativePath, 
                    flags,
                    file,
                    fileID,
                    IIF(
                        relativePath != '',
                        CONCAT(domain, '-', relativePath) ,
                        domain
                    ) AS hash_path,
                    IIF(
                        flags = 1, 
                        'IsFile', 
                        IIF(
                            flags = 2, 
                            'IsDirectory', 
                        IIF(flags = 3, 'IsSymlink', 'Unknown'))
                    ) as file_type, 
                    IIF(
                        domain LIKE '%AppDomainPlugin%', true, 
                        false) as is_plugin, 
                    IIF(
                        domain LIKE '%AppDomainGroup%', true, 
                        false) as is_group, 
                    SUBSTR(fileID, 1, 2) as directory 
                FROM 
                    Files 
                WHERE domain LIKE '%${namespace}%'`;
  const results = querySqlite(db_path, query);
  if (results instanceof ApplicationError) {
    return new IosError(
      `MANIFEST_DB`,
      `could not get app paths in Manifest.db: ${results}`,
    );
  }

  const app = results as unknown as ManifestApp[];
  for (let i = 0; i < app.length; i++) {
    app[ i ].namespace = namespace;
  }

  return app;
}

/**
 * Function to parse the binary plist in the `Manifest.db` file. Contains `FileMetadata`
 * @param payload Base64 binary plist
 * @returns `FileMetadata` associated with app data or `IosError
 */
export function parseManifestAppPlist(
  payload: string,
): FileMetadata | IosError {
  const bytes = decode(payload);
  if (bytes instanceof EncodingError) {
    return new IosError(
      `MANIFEST_DB`,
      `failed to base64 decode binary plist: ${bytes}`,
    );
  }
  const info = getPlist(bytes);
  if (info instanceof EncodingError) {
    return new IosError(
      `MANIFEST_DB`,
      `failed to parse binary plist: ${info}`,
    );
  }

  const objects = info as Record<string, unknown>;
  const meta: FileMetadata = {
    modified: "",
    flags: 0,
    extended_attributes: 0,
    group_id: 0,
    changed: "",
    created: "",
    relative_path: 0,
    size: 0,
    inode: 0,
    mode: 0,
    user_id: 0,
    path: "",
  };
  for (const object of objects[ "$objects" ] as unknown[]) {
    if (typeof object === "string" && (object as string).startsWith("$")) {
      continue;
    }

    if (typeof object === "string") {
      meta.path = object as string;
      continue;
    }
    if (
      typeof object === "object" &&
      Object.prototype.hasOwnProperty.call(object, "LastModified")
    ) {
      const data = object as Record<string, number>;
      meta.created = unixEpochToISO(data[ "Birth" ]);
      meta.changed = unixEpochToISO(data[ "LastStatusChange" ]);
      meta.modified = unixEpochToISO(data[ "LastModified" ]);
      meta.mode = data[ "Mode" ];
      meta.flags = data[ "Flags" ];
      meta.group_id = data[ "GroupId" ];
      meta.relative_path = data[ "RelativePath" ];
      meta.size = data[ "Size" ];
      meta.inode = data[ "InodeNumber" ];
      meta.user_id = data[ "UserID" ];
      meta.extended_attributes = data[ "ExtendedAttributes" ];
    }
  }

  return meta;
}

/**
 * Function to parse supported apps and domains
 * @param paths Array of `ManifestApp`
 * @param namespace App or domain name
 * @param db_path iTunes backup directory
 * @param output `Output` object
 */
export function extractAppInfo(
  paths: ManifestApp[],
  namespace: string,
  db_path: string,
  output: Output,
) {
  switch (namespace) {
    case "com.amazon.echo":
      extractAmazonEcho(paths, db_path, output);
      break;
    case "us.zoom.videomeetings":
      extractZoom(paths, db_path, output);
      break;
    case "com.duckduckgo.mobile.ios":
      extractDuckDuckGo(paths, db_path, output);
      break;
    case "co.hinge.mobile.ios":
      extractHingeInfo(paths, db_path, output);
      break;
    case "HomeDomain":
      extractHomeDomain(paths, db_path, output);
      break;
    case "RootDomain":
      extractRootDomain(paths, db_path, output);
      break;
    case "SysContainerDomain-com.apple.linkd":
      extractAppleLinkd(paths, db_path, output);
      break;
  }
}
