import { RegistryData } from "../../../../types/windows/registry.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline RegistryData
 * @param data `RegistryData` object
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of RegistryData
 */
export function timelineRegistry(data: RegistryData): TimesketchTimeline[] {
  const entries = [];

  for (const item of data.registry_entries) {
    const entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.last_modified),
      timestamp_desc: "Registry Last Modified",
      message: "",
      hash: "",
      user: "",
      artifact: "Registry",
      data_type: "windows:registry:key",
      _raw: "",
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
