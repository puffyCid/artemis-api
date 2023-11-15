import { Cron } from "../../types/unix/cron.d.ts";
import { UnixError } from "./errors.ts";

/**
 * Parse `Cron` files on an endpoint
 * @returns Array of `Cron` entries or `UnixError`
 */
export function getCron(): Cron[] | UnixError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_cron();

    const cron: Cron[] = JSON.parse(data);
    return cron;
  } catch (err) {
    return new UnixError("CRON", `failed to parse cron jobs: ${err}`);
  }
}
