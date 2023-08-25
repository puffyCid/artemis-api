import { NomSigned, NomUnsigned } from "../../types/nom/nom.d.ts";

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
export function nom_unsigned_four_bytes(
  data: Uint8Array,
  endianess: Endian,
): NomUnsigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomUnsigned = Deno.core.ops.js_nom_unsigned_four_bytes(
    data,
    endianess,
  );
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}

/**
 * Nom helper to parse eight bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Unsigned eight byte value
 */
export function nom_unsigned_eight_bytes(
  data: Uint8Array,
  endianess: Endian,
): NomUnsigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomUnsigned = Deno.core.ops.js_nom_unsigned_eight_bytes(
    data,
    endianess,
  );
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}

/**
 * Nom helper to parse two bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Unsigned two byte value
 */
export function nom_unsigned_two_bytes(
  data: Uint8Array,
  endianess: Endian,
): NomUnsigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomUnsigned = Deno.core.ops.js_nom_unsigned_two_bytes(
    data,
    endianess,
  );
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}

/**
 * Nom helper to parse one bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Unsigned one byte value
 */
export function nom_unsigned_one_bytes(
  data: Uint8Array,
  endianess: Endian,
): NomUnsigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomUnsigned = Deno.core.ops.js_nom_unsigned_one_bytes(
    data,
    endianess,
  );
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}

/**
 * Nom helper to parse sixteen bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Unsigned sixteen byte value
 */
export function nom_unsigned_sixteen_bytes(
  data: Uint8Array,
  endianess: Endian,
): NomUnsigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomUnsigned = Deno.core.ops.js_nom_unsigned_sixteen_bytes(
    data,
    endianess,
  );
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}

/**
 * Nom helper to parse four bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Signed four byte value
 */
export function nom_signed_four_bytes(
  data: Uint8Array,
  endianess: Endian,
): NomSigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomSigned = Deno.core.ops.js_nom_signed_four_bytes(
    data,
    endianess,
  );
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}

/**
 * Nom helper to parse eight bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Signed eight byte value
 */
export function nom_signed_eight_bytes(
  data: Uint8Array,
  endianess: Endian,
): NomSigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomSigned = Deno.core.ops.js_nom_signed_eight_bytes(
    data,
    endianess,
  );
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}

/**
 * Nom helper to parse two bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Signed two byte value
 */
export function nom_signed_two_bytes(
  data: Uint8Array,
  endianess: Endian,
): NomSigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomSigned = Deno.core.ops.js_nom_signed_two_bytes(
    data,
    endianess,
  );
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}
