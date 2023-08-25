import { Nom } from "../../types/nom/nom.d.ts";

/**
 * Nom string or bytes
 * @param data Data to provide to nom
 * @param input How much data to nom. It must be a postive number.
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
  const result: Nom = Deno.core.ops.js_nom_take_bytes(data, input);
  return result;
}

/**
 * Nom data until provided input
 * @param data String or bytes to provide to nom
 * @param input Nom `data` until input. Must be same type as `data`
 * @returns A `Nom` structure
 */
export function take_until(
  data: string | Uint8Array,
  input: Uint8Array | string,
): Nom | Error {
  if (typeof data === "string" && typeof input === "string") {
    //@ts-ignore: Custom Artemis function
    const result_string: string = Deno.core.ops.js_nom_take_until_string(
      data,
      input,
    );
    const nom_string: Nom = JSON.parse(result_string);
    return nom_string;
  } else if (data instanceof Uint8Array && input instanceof Uint8Array) {
    //@ts-ignore: Custom Artemis function
    const result_string: string = Deno.core.ops.js_nom_take_until_bytes(
      data,
      input,
    );
    const nom_string: Nom = JSON.parse(result_string);
    return nom_string;
  }

  return new Error("provided unsupported data and/or input types");
}

/**
 * Nom data while data is **NOT** equal to input
 * @param data String or bytes to provide to nom
 * @param input Nom `data` while `data` does **NOT** equal input. Must be a single character or <= 255. Must be same type as `data`
 * @returns A `Nom` structure
 */
export function take_while(
  data: string | Uint8Array,
  input: number | string,
): Nom | Error {
  if (typeof input === "string" && input.length != 1) {
    const err = new Error("provided string length greater than 1");
    return err;
  } else if (typeof input === "number" && input < 0) {
    const err = new Error("provided negative number");
    return err;
  }

  if (typeof data === "string" && typeof input === "string") {
    //@ts-ignore: Custom Artemis function
    const result_string: string = Deno.core.ops.js_nom_take_while_string(
      data,
      input,
    );
    const nom_string: Nom = JSON.parse(result_string);
    return nom_string;
  } else if (data instanceof Uint8Array && typeof input === "number") {
    //@ts-ignore: Custom Artemis function
    const result_string: string = Deno.core.ops.js_nom_take_while_bytes(
      data,
      input,
    );
    const nom_string: Nom = JSON.parse(result_string);
    return nom_string;
  }

  return new Error("provided unsupported data and/or input types");
}
