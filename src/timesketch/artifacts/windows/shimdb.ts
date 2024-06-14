import { Shimdb } from "../../../../types/windows/shimdb.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";

/**
 * Function to timeline Shimdb
 * @param data Array of `Shimdb`
 * @returns Array `TimesketchTimeline` of Shimdb
 */
export function timelineShimdb(
  data: Shimdb[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: item.db_data.compile_time,
      timestamp_desc: "Shim Compile Time",
      message: "",
      artifact: "Shimdb",
      data_type: "windows:shimdb:entry",
    };

    // If we include Indexes, memory usage will explode (~2GB) and crash the JS stack. Indexes primarily contain base64 binary data. There's nothing parsable in it
    // This likely only affects sysmain.sdb due to the large number of Shims. We could split this into separate entries if needed
    // Custom Shims would likely be unaffected
    // entry["indexes"] = JSON.stringify(item.indexes);

    entry["sdb_version"] = item.db_data.sdb_version;
    entry["compile_time"] = item.db_data.compile_time;
    entry["compiler_version"] = item.db_data.compiler_version;
    entry["name"] = item.db_data.name;
    entry["platform"] = item.db_data.platform;
    entry["database_id"] = item.db_data.database_id;
    entry["additional_metadata"] = JSON.stringify(
      item.db_data.additional_metadata,
    );

    // If we parsed the sysmain.sdb file. This will be a lot of data
    for (let i = 0; i < item.db_data.list_data.length; i++) {
      entry.message = `${item.sdb_path}  |  Shim Tag Name: ${
        item.db_data.list_data[i].data["TAG_NAME"]
      }`;
      entry["tag_info"] = JSON.stringify(item.db_data.list_data[i]);
      entries.push(Object.assign({}, entry));
    }
  }

  return entries;
}
