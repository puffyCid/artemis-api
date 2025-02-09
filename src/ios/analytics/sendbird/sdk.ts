import { getPlist } from "../../../../mod.ts";
import {
  Daily,
  StatStorage,
} from "../../../../types/ios/analytivs/sendbird.ts";
import { extractUtf8String } from "../../../encoding/mod.ts";
import { MacosError } from "../../../macos/errors.ts";
import { IosError } from "../../error.ts";

/**
 * Function to extract SendBird stat storage info
 * @param path Path to sendbird stat storage plist file
 * @returns `StatStorage` object or `IosError`
 */
export function extractStatStorage(path: string): StatStorage | IosError {
  const result = getPlist(path);
  if (result instanceof MacosError) {
    return new IosError(
      `SENDBIRD`,
      `failed to parse stat storage plist: ${result}`,
    );
  }
  const data = result as Record<string, string | number[]>;

  const stats: StatStorage = {
    device_id: data["com.sendbird.sdk.stat.unique_device_id"] as string,
    last_sent: data["com.sendbird.sdk.messaging.stat.lastSentAt"] as string,
    oldest_stat: data[
      "com.sendbird.sdk.chat.stat.default.oldest_stat_timestamp"
    ] as string,
    daily_states: [],
  };

  const bytes =
    data["com.sendbird.sdk.messaging.stat.daily_record.stats"] as number[];

  const payload = extractUtf8String(Uint8Array.from(bytes));
  const json_data = JSON.parse(payload);
  stats.daily_states = json_data as Daily[];

  return stats;
}
