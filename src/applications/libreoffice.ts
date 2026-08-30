import { RawLibreOfficeRecent, RecentFilesLibreOffice } from "../../types/applications/libreoffice";
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
 * @param alt_path Optional alternative path to registrymodifications.xcu
 * @returns Array of `History` entries or `ApplicationError`
 */
export function recentFiles(
  platform: PlatformType,
  alt_path?: string,
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
        drive = "C:";
      }
      path =
        `${drive}:\\Users\\*\\AppData\\Roaming\\LibreOffice\\*\\user\\registrymodifications.xcu`;
      break;
    }
    case PlatformType.Linux: {
      path = "/home/*/.config/libreoffice/*/user/registrymodifications.xcu";
    }
  }

  if (alt_path !== undefined) {
    path = alt_path;
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

    const recent_json = xml_result as unknown as RawLibreOfficeRecent;

    if (!Array.isArray(recent_json[ "oor:items" ].item)) {
      recent_json[ "oor:items" ].item = [ recent_json[ "oor:items" ].item ];
    }

    // Loop through the JSON arrays and objects
    for (const entry of recent_json[ "oor:items" ].item) {
      if (entry.node === undefined
        || entry.node.prop === undefined
        || entry.node[ "@oor:name" ] === undefined
        || !entry[ "@oor:path" ].includes("HistoryInfo['PickList']/ItemList")) {
        continue;
      }

      const office: RecentFilesLibreOffice = {
        path: entry.node[ "@oor:name" ],
        title: "",
        filter: "",
        pinned: false,
        password: "",
        readonly: false,
        thumbnail: "",
        evidence: path.full_path,
        message: `Recent file opened by LibreOffice '${entry.node[ "@oor:name" ]}'`,
        timestamp_desc: "N/A",
        artifact: "LibreOffice Recent Files",
        data_type: "application:libreoffice:recentfiles:entry",
        datetime: "1970-01-01T00:00:00.000Z"
      };

      for (const prop of entry.node.prop) {
        switch (prop[ "@oor:name" ]) {
          case "Title": {
            office.title = prop.value as string;
            break;
          }
          case "Filter": {
            office.filter = prop.value as string;
            break;
          }
          case "Pinned": {
            office.pinned = Boolean(prop.value as Record<string, string>[ "@xsi.nil" ]);
            break;
          }
          case "ReadOnly": {
            office.readonly = Boolean(prop.value);
            break;
          }
          case "Thumbnail": {
            office.thumbnail = prop.value as string;
            break;
          }
          case "Password": {
            office.password = prop.value as string;
            break;
          }
        }
      }
      entries.push(office);

    }
  }

  return entries;
}

/**
 * Function to test LibreOffice recent files parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the LibreOffice recent files parsing
 */
export function testRecentFiles(): void {
  const test = "../../test_data/libreoffice/registrymodifications.xcu";
  const result = recentFiles(PlatformType.Linux, test);
  if (result instanceof ApplicationError) {
    throw result;
  }

  if (result[ 0 ]?.title === undefined) {
    throw `Got title undefined expected Hindsight Report (2025-09-18T00-18-20).......recentFiles ❌`;
  }

  if (result[ 0 ].title != "Hindsight Report (2025-09-18T00-18-20)") {
    throw `Got title ${result[ 0 ].title} expected Hindsight Report (2025-09-18T00-18-20).......recentFiles ❌`;
  }
  if (result[ 0 ].message != "Recent file opened by LibreOffice 'file:///home/test/Downloads/Hindsight%20Report%20(2025-09-18T00-18-20).xlsx'") {
    throw `Got message ${result[ 0 ].message} expected "Recent file opened by LibreOffice 'file:///home/test/Downloads/Hindsight%20Report%20(2025-09-18T00-18-20).xlsx'").......recentFiles ❌`;
  }

  console.info(`  Function recentFiles ✅`);
}