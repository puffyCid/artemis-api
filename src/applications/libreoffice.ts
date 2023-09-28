import { readXml } from "../encoding/xml.ts";
import { glob } from "../filesystem/files.ts";

/**
 * Return a list of files opened by LibreOffice for all users
 * @returns Array of `History` entries
 */
export function fileHistory(): History[] | Error {
  // Get all user paths
  const paths = glob(
    "/Users/*/Library/Application Support/LibreOffice/*/user/registrymodifications.xcu",
  );
  if (paths instanceof Error) {
    return paths;
  }

  const entries = [];
  for (const path of paths) {
    if (!path.is_file) {
      continue;
    }
    // Read XML into JSON
    const xml_result = readXml(path.full_path);
    if (xml_result instanceof Error) {
      console.error(`Could not parse xml at ${path}: ${xml_result}`);
      continue;
    }

    // Loop through the JSON arrays and objects
    const items = xml_result["oor:items"] as Record<string, object>;
    for (
      const xml_entry of items["item"] as Record<
        string,
        Record<string, object | object[]>
      >[]
    ) {
      if (
        xml_entry["node"] === undefined ||
        xml_entry["node"] as object[][0] as Record<string, object>["$"] ===
          undefined
      ) {
        continue;
      }

      const node_object = xml_entry["node"] as unknown as Record<
        string,
        object
      >[];
      const data = node_object[0];
      if (
        data["$"] as unknown as Record<string, string>["oor:name"] === undefined
      ) {
        continue;
      }

      if (data["prop"] === undefined) {
        continue;
      }

      const prop_data = data["prop"] as Record<string, object>[];
      const path_data = data["$"] as Record<string, string>;
      if (
        path_data["oor:name"] === undefined ||
        !path_data["oor:name"].startsWith("file")
      ) {
        continue;
      }
      const office: History = {
        path: path_data["oor:name"],
        title: "",
        filter: "",
        pinned: false,
        password: "",
        readonly: false,
        thumbnail: "",
        source: path.full_path,
      };
      for (const prop_entry of prop_data) {
        const meta_entry = prop_entry["$"] as Record<string, object>;
        if (meta_entry["oor:name"] as unknown as string === "Title") {
          const title_data = prop_entry["value"] as string[];
          office.title = title_data.at(0) as string;
        } else if (meta_entry["oor:name"] as unknown as string === "Filter") {
          const filter_data = prop_entry["value"] as string[];
          office.filter = filter_data.at(0) as string;
        } else if (meta_entry["oor:name"] as unknown as string === "Pinned") {
          const pin_data = prop_entry["value"] as string[];
          office.pinned = pin_data.at(0) === "true";
        } else if (meta_entry["oor:name"] as unknown as string === "Password") {
          const pass_data = prop_entry["value"] as string[];
          office.password = pass_data.at(0) as string;
        } else if (meta_entry["oor:name"] as unknown as string === "ReadOnly") {
          const read_data = prop_entry["value"] as string[];
          office.readonly = read_data.at(0) === "true";
        } else if (
          meta_entry["oor:name"] as unknown as string === "Thumbnail"
        ) {
          const thumb_data = prop_entry["value"] as string[];
          office.thumbnail = thumb_data.at(0) as string;
        }
      }

      entries.push(office);
    }
  }

  return entries;
}
