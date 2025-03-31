import { Cron } from "../../types/unix/cron";
import { UnixError } from "./errors";

/**
 * Parse `Cron` files on an endpoint
 * @returns Array of `Cron` entries or `UnixError`
 */
export function getCron(): Cron[] | UnixError {
  try {
    //@ts-ignore: Custom Artemis function
    const data: Cron[] = js_get_cron();
    return data;
  } catch (err) {
    return new UnixError("CRON", `failed to parse cron jobs: ${err}`);
  }
}
