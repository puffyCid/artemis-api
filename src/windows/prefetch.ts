import { Prefetch } from "../../types/windows/prefetch.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse default `Prefetch` directory
 * @returns Array of `Prefetch` data or `WindowsError`
 */
export function getPrefetch(): Prefetch[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_prefetch();
    const pf: Prefetch[] = JSON.parse(data);

    return pf;
  } catch (err) {
    return new WindowsError("PREFETCH", `failed to parse prefetch: ${err}`);
  }
}

/**
 * Function to parse a directory containing `Prefetch` files (.pf)
 * @returns Array of `Prefetch` data or `WindowsError`
 */
export function getPrefetchPath(path: string): Prefetch[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data: string = Deno.core.ops.get_prefetch_path(path);

    const pf: Prefetch[] = JSON.parse(data);
    return pf;
  } catch (err) {
    return new WindowsError(
      "PREFETCH",
      `failed to parse prefetch at ${path}: ${err}`,
    );
  }
}
