import { Nom } from "../../types/nom/nom";
import { NomError } from "./error";

/**
 * Nom string or bytes
 * @param data Data to provide to nom
 * @param input How much data to nom. It must be a postive number.
 * @returns A `Nom` structure
 */
export function take(data: string | Uint8Array, input: number): Nom | NomError {
  if (input < 0) {
    return new NomError("NOM", "provided negative number");
  }
  if (data.length < input) {
    return new NomError("NOM", `wanted ${input} but input is ${data.length}`);
  }

  const nommed = data.slice(0, input);
  const value: Nom = {
    remaining: data.slice(input),
    nommed,
  };
  return value;
}

/**
 * Nom data until provided input
 * @param data String or bytes to provide to nom
 * @param input Nom `data` until input. Must be same type as `data`
 * @returns A `Nom` structure
 */
export function takeUntil(
  data: Uint8Array | string,
  input: Uint8Array | string,
): Nom | NomError {
  if (typeof data !== typeof input) {
    return new NomError("NOM", "data and input must be matching types");
  }

  if (typeof data === "string" && typeof input === "string") {
    try {
      //@ts-ignore: Custom Artemis function
      const result = js_nom_take_until_string(
        data,
        input,
      );
      return result;
    } catch (err) {
      return new NomError("NOM", `could not take until string ${err}`);
    }
  }

  try {
    //@ts-ignore: Custom Artemis function
    const result = js_nom_take_until_bytes(
      data,
      input,
    );

    const value: Nom = {
      nommed: result,
      remaining: data.slice(result.buffer.byteLength),
    };
    return value;
  } catch (err) {
    return new NomError("NOM", `could not take until bytes ${err}`);
  }
}

/**
 * Nom data while data **IS** equal to input
 * @param data String or bytes to provide to nom
 * @param input Nom `data` while `data` **IS** equal to input. Must be a single character or <= 255. Must be same type as `data`
 * @returns A `Nom` structure
 */
export function takeWhile(
  data: string | Uint8Array,
  input: string | number,
): Nom | NomError {
  if (typeof data !== typeof input) {
    return new NomError("NOM", "data and input must be matching types");
  }

  if (typeof input === "string" && input.length !== 1) {
    return new NomError("NOM", "provided string length greater than 1");
  } else if (typeof input === "number" && input < 0) {
    return new NomError("NOM", "provided negative number");
  }

  if (typeof data === "string" && typeof input === "string") {
    try {
      //@ts-ignore: Custom Artemis function
      const result: Nom = js_nom_take_while_string(
        data,
        input,
      );

      return result;
    } catch (err) {
      return new NomError("NOM", `could not take while string ${err}`);
    }
  }
  try {
    //@ts-ignore: Custom Artemis function
    const result = js_nom_take_while_bytes(
      data,
      input,
    );
    const value: Nom = {
      nommed: result,
      remaining: data.slice(0, result.buffer.byteLength + 1),
    };
    return value;
  } catch (err) {
    return new NomError("NOM", `could not take while bytes ${err}`);
  }
}
