import { RecentFilesLibreOffice } from "../../types/applications/libreoffice";
import { EncodingError } from "../encoding/errors";
import { readXml } from "../encoding/xml";
import { getEnvValue } from "../environment/env";
import { FileError } from "../filesystem/errors";
import { glob } from "../filesystem/files";
import { PlatformType } from "../system/systeminfo";
import { ApplicationError } from "./errors";

/**
 * Return a list of files opened by LibreOffice for all users
 * @param platform OS Platform type to lookup
 * @returns Array of `History` entries or `ApplicationError`
 */
export function recentFiles(
  platform: PlatformType,
): RecentFilesLibreOffice[] | ApplicationError {
  // Get all user paths
  let path = "";
  switch (platform) {
    case PlatformType.Darwin: {
      path =
        "/Users/*/Library/Application Support/LibreOffice/*/user/registrymodifications.xcu";
      break;
    }
    case PlatformType.Windows: {
      let drive = getEnvValue("SystemDrive");
      if (drive === "") {
        drive = "C";
      }
      path =
        `${drive}:\\Users\\*\\AppData\\Roaming\\LibreOffice\\*\\user\\registrymodifications.xcu`;
      break;
    }
    case PlatformType.Linux: {
      path = "/home/*/.config/libreoffice/*/user/registrymodifications.xcu";
    }
  }

  const paths = glob(path);
  if (paths instanceof FileError) {
    return new ApplicationError(
      "LIBREOFFICE",
      `failed to glob paths: ${paths}`,
    );
  }

  const entries: RecentFilesLibreOffice[] = [];
  // Loop through registrymodifications.xcu path for all users
  for (const path of paths) {
    if (!path.is_file) {
      continue;
    }

    // Read XML into JSON. registrymodifications.xcu is an XML file
    const xml_result = readXml(path.full_path);
    if (xml_result instanceof EncodingError) {
      console.error(`Could not parse xml at ${path}: ${xml_result}`);
      continue;
    }

    // Loop through the JSON arrays and objects
    const items = xml_result[ "oor:items" ] as Record<string, object>;
    for (
      const xml_entry of items[ "item" ] as Record<
        string,
        Record<string, object | object[]>
      >[]
    ) {
      if (
        xml_entry[ "node" ] === undefined ||
        xml_entry[ "node" ] as object[][ 0 ] as Record<string, object>[ "$" ] ===
        undefined
      ) {
        continue;
      }

      const node_object = xml_entry[ "node" ] as unknown as Record<
        string,
        object
      >[];
      const data = node_object[ 0 ];
      if (
        data[ "$" ] as unknown as Record<string, string>[ "oor:name" ] === undefined
      ) {
        continue;
      }

      if (data[ "prop" ] === undefined) {
        continue;
      }

      const prop_data = data[ "prop" ] as Record<string, object>[];
      const path_data = data[ "$" ] as Record<string, string>;
      if (
        path_data[ "oor:name" ] === undefined ||
        !path_data[ "oor:name" ].startsWith("file")
      ) {
        continue;
      }
      const office: RecentFilesLibreOffice = {
        path: path_data[ "oor:name" ],
        title: "",
        filter: "",
        pinned: false,
        password: "",
        readonly: false,
        thumbnail: "",
        source: path.full_path,
      };

      // Finally at section containing data of interest
      for (const prop_entry of prop_data) {
        const meta_entry = prop_entry[ "$" ] as Record<string, object>;
        if (meta_entry[ "oor:name" ] as unknown as string === "Title") {
          const title_data = prop_entry[ "value" ] as string[];
          office.title = title_data.at(0) as string;
        } else if (meta_entry[ "oor:name" ] as unknown as string === "Filter") {
          const filter_data = prop_entry[ "value" ] as string[];
          office.filter = filter_data.at(0) as string;
        } else if (meta_entry[ "oor:name" ] as unknown as string === "Pinned") {
          const pin_data = prop_entry[ "value" ] as string[];
          office.pinned = pin_data.at(0) === "true";
        } else if (meta_entry[ "oor:name" ] as unknown as string === "Password") {
          const pass_data = prop_entry[ "value" ] as string[];
          office.password = pass_data.at(0) as string;
        } else if (meta_entry[ "oor:name" ] as unknown as string === "ReadOnly") {
          const read_data = prop_entry[ "value" ] as string[];
          office.readonly = read_data.at(0) === "true";
        } else if (
          meta_entry[ "oor:name" ] as unknown as string === "Thumbnail"
        ) {
          const thumb_data = prop_entry[ "value" ] as string[];
          office.thumbnail = thumb_data.at(0) as string;
        }
      }

      entries.push(office);
    }
  }

  return entries;
}
