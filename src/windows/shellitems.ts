import { JsShellItem } from "../../types/windows/shellitems.ts";
import { WindowsError } from "./errors.ts";

/**
 * Parse raw bytes that contain a shellitem. Can be used to parse data that contains multiple Shellitems
 * @param data Raw bytes of shellitem
 * @returns `JsShellItem` or `WindowsError`
 */
export function getShellItem(data: Uint8Array): JsShellItem | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const result: JsShellItem = Deno.core.ops.js_get_shellitem(data);
    return result;
  } catch (err) {
    return new WindowsError("SHELLITEMS", `failed to get shellitems: ${err}`);
  }
}
