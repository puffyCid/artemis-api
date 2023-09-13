import { Prefetch } from "../../types/windows/prefetch.d.ts";

/**
 * Function to parse default `Prefetch` directory
 * @returns Array of `Prefetch` data
 */
export function getPrefetch(): Prefetch[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_prefetch();
  const pf: Prefetch[] = JSON.parse(data);

  return pf;
}

/**
 * Function to parse `Prefetch` directory on an alternative drive
 * @param drive Alternative drive letter to use
 * @returns Array of `Prefetch` data
 */
export function getAltPrefetch(drive: string): Prefetch[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_alt_prefetch(drive);
  const pf: Prefetch[] = JSON.parse(data);

  return pf;
}

/**
 * Function to parse a directory containing `Prefetch` files (.pf)
 * @returns Array of `Prefetch` data
 */
export function getPrefetchPath(path: string): Prefetch[] {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_prefetch_path(path);

  const pf: Prefetch[] = JSON.parse(data);
  return pf;
}
