import {
  NomSigned,
  NomUnsigned,
  NomUnsignedLarge,
} from "../../types/nom/nom.ts";
import { NomError } from "./error.ts";

/**
 * Determines Endian type to use when parsing bytes
 */
export enum Endian {
  /**Big Endian */
  Be,
  /**Little Endian */
  Le,
}

/**
 * Nom helper to parse four bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Unsigned four byte value
 */
export function nomUnsignedFourBytes(
  data: Uint8Array,
  endianess: Endian,
): NomUnsigned | NomError {
  try {
    //@ts-ignore: Custom Artemis function
    const result: NomUnsigned = Deno.core.ops.js_nom_unsigned_four_bytes(
      data,
      endianess,
    );
    return result;
  } catch (err) {
    return new NomError(
      "NOM",
      `failed to nom unsigned four byte: ${err}`,
    );
  }
}

/**
 * Nom helper to parse eight bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Unsigned eight byte value
 */
export function nomUnsignedEightBytes(
  data: Uint8Array,
  endianess: Endian,
): NomUnsigned | NomError {
  try {
    //@ts-ignore: Custom Artemis function
    const result: NomUnsigned = Deno.core.ops.js_nom_unsigned_eight_bytes(
      data,
      endianess,
    );
    return result;
  } catch (err) {
    return new NomError(
      "NOM",
      `failed to nom unsigned eight byte: ${err}`,
    );
  }
}

/**
 * Nom helper to parse two bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Unsigned two byte value
 */
export function nomUnsignedTwoBytes(
  data: Uint8Array,
  endianess: Endian,
): NomUnsigned | NomError {
  try {
    //@ts-ignore: Custom Artemis function
    const result: NomUnsigned = Deno.core.ops.js_nom_unsigned_two_bytes(
      data,
      endianess,
    );
    return result;
  } catch (err) {
    return new NomError(
      "NOM",
      `failed to nom unsigned two byte: ${err}`,
    );
  }
}

/**
 * Nom helper to parse one bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Unsigned one byte value
 */
export function nomUnsignedOneBytes(
  data: Uint8Array,
  endianess: Endian,
): NomUnsigned | NomError {
  try {
    //@ts-ignore: Custom Artemis function
    const result: NomUnsigned = Deno.core.ops.js_nom_unsigned_one_bytes(
      data,
      endianess,
    );
    return result;
  } catch (err) {
    return new NomError(
      "NOM",
      `failed to nom unsigned one byte: ${err}`,
    );
  }
}

/**
 * Nom helper to parse sixteen bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Unsigned sixteen byte value
 */
export function nomUnsignedSixteenBytes(
  data: Uint8Array,
  endianess: Endian,
): NomUnsignedLarge | NomError {
  try {
    //@ts-ignore: Custom Artemis function
    const result: NomUnsignedLarge = Deno.core.ops
      .js_nom_unsigned_sixteen_bytes(
        data,
        endianess,
      );
    return result;
  } catch (err) {
    return new NomError(
      "NOM",
      `failed to nom unsigned sixteen byte: ${err}`,
    );
  }
}

/**
 * Nom helper to parse four bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Signed four byte value
 */
export function nomSignedFourBytes(
  data: Uint8Array,
  endianess: Endian,
): NomSigned | NomError {
  try {
    //@ts-ignore: Custom Artemis function
    const result: NomSigned = Deno.core.ops.js_nom_signed_four_bytes(
      data,
      endianess,
    );
    return result;
  } catch (err) {
    return new NomError(
      "NOM",
      `failed to nom signed four byte: ${err}`,
    );
  }
}

/**
 * Nom helper to parse eight bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Signed eight byte value
 */
export function nomSignedEightBytes(
  data: Uint8Array,
  endianess: Endian,
): NomSigned | NomError {
  try {
    //@ts-ignore: Custom Artemis function
    const result: NomSigned = Deno.core.ops.js_nom_signed_eight_bytes(
      data,
      endianess,
    );
    return result;
  } catch (err) {
    return new NomError(
      "NOM",
      `failed to nom signed eight byte: ${err}`,
    );
  }
}

/**
 * Nom helper to parse two bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Signed two byte value
 */
export function nomSignedTwoBytes(
  data: Uint8Array,
  endianess: Endian,
): NomSigned | NomError {
  try {
    //@ts-ignore: Custom Artemis function
    const result: NomSigned = Deno.core.ops.js_nom_signed_two_bytes(
      data,
      endianess,
    );
    return result;
  } catch (err) {
    return new NomError(
      "NOM",
      `failed to nom signed two byte: ${err}`,
    );
  }
}
