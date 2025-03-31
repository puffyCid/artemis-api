import { Prefetch } from "../../types/windows/prefetch";
import { WindowsError } from "./errors";

/**
 * Function to parse default `Prefetch` directory
 * @returns Array of `Prefetch` data or `WindowsError`
 */
export function getPrefetch(): Prefetch[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_prefetch();

    return data;
  } catch (err) {
    return new WindowsError("PREFETCH", `failed to parse prefetch: ${err}`);
  }
}
