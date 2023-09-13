import { Cron } from "../../types/unix/cron.d.ts";

/**
 * Parse `Cron` files on an endpoint
 * @returns Array of `Cron` entries
 */
export function getCron(): Cron[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_cron();

  const history: Cron[] = JSON.parse(data);
  return history;
}
