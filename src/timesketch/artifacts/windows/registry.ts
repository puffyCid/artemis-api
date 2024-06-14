import { RegistryData } from "../../../../types/windows/registry.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline RegistryData
 * @param data `RegistryData` object
 * @returns Array `TimesketchTimeline` of RegistryData
 */
export function timelineRegistry(data: RegistryData): TimesketchTimeline[] {
  const entries = [];

  for (const item of data.registry_entries) {
    const entry: TimesketchTimeline = {
      datetime: item.last_modified,
      timestamp_desc: "Registry Last Modified",
      message: "",
      artifact: "Registry",
      data_type: "windows:registry:key",
    };
    entry["registry_path"] = data.registry_path;
    entry["registry_file"] = data.registry_file;
    entry["depth"] = item.depth;
    entry["key"] = item.key;
    entry["path"] = item.path;
    entry["name"] = item.name;
    entry["security_offset"] = item.security_offset;
    for (const value of item.values) {
      entry.message = `${item.path}  |  Value: ${value.value}`;
      entry["value"] = value.value;
      entry["data"] = value.data;
      entry["reg_data_type"] = value.data_type;

      entries.push(Object.assign({}, entry));
    }
  }

  return entries;
}
