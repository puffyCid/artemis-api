import { AppFocus } from "../../../types/macos/biome.ts";
import { MacosError } from "../errors.ts";
import { parseProtobufBytes } from "../../encoding/protobuf.ts";
import { EncodingError } from "../../encoding/errors.ts";
import { cocoatimeToUnixEpoch } from "../../time/conversion.ts";

export function extractAppFocus(
  proto_bytes: Uint8Array,
): AppFocus | MacosError {
  const results = parseProtobufBytes(proto_bytes);
  if (results instanceof EncodingError) {
    return new MacosError(`BIOME`, `failed to parse protobuf data: ${results}`);
  }
  console.log(results);
  const focus: AppFocus = {
    entry_created: 0,
    start: 0,
    end: 0,
    bundle_id: "",
    action_guid: "",
    version: "",
    internal_version: "",
    raw_entry: results,
  };

  const start = results["2"];
  if (typeof start === "number") {
    focus.start = cocoatimeToUnixEpoch(start);
  }

  const end = results["3"];
  if (typeof end === "number") {
    focus.end = cocoatimeToUnixEpoch(end);
  }

  if (typeof results["4"] === "object") {
    const bundle = (results["4"] as Record<string, unknown>)["3"];
    if (typeof bundle === "string") {
      focus.bundle_id = bundle;
    }
  }

  const action = results["5"];
  if (typeof action === "string") {
    focus.action_guid = action;
  }

  const versions = results["7"];
  if (Array.isArray(versions)) {
    for (const entry of versions) {
      if (entry["2"]["3"] === undefined) {
        continue;
      }
      if (focus.version === "") {
        focus.version = entry["2"]["3"] as string;
        continue;
      }
      if (focus.internal_version === "") {
        focus.internal_version = entry["2"]["3"] as string;
      }
    }
  }

  return focus;
}
