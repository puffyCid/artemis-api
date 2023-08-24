import { Nom } from "../../types/nom/nom.d.ts";

/**
 * Nom string or bytes
 * @param data Data to provide to nom
 * @param input How much data to nom
 * @returns A `Nom` structure
 */
export function take(data: string | Uint8Array, input: number): Nom | Error {
  if (input < 0) {
    const err = new Error("provided negative number");
    return err;
  }
  if (typeof data === "string") {
    //@ts-ignore: Custom Artemis function
    const result_string: string = Deno.core.ops.js_nom_take_string(data, input);
    const nom_string: Nom = JSON.parse(result_string);
    return nom_string;
  }

  //@ts-ignore: Custom Artemis function
  const result: string = Deno.core.ops.js_nom_take_bytes(data, input);
  const nom: Nom = JSON.parse(result);
  return nom;
}
