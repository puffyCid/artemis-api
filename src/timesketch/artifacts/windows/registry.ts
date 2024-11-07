import { Registry } from "../../../../types/windows/registry.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline Registry
 * @param data `Registry` array
 * @returns Array `TimesketchTimeline` of Registry
 */
export function timelineRegistry(data: Registry[]): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: item.last_modified,
      timestamp_desc: "Registry Last Modified",
      message: "",
      artifact: "Registry",
      data_type: "windows:registry:key",
    };
    entry["registry_path"] = item.registry_path;
    entry["registry_file"] = item.registry_file;
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
