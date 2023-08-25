import { NomSigned, NomUnsigned } from "../../types/nom/nom.d.ts";

/**
 * Nom helper to parse four bytes
 * @param data Bytes to provide to nom
 * @returns Unsigned four byte value
 */
export function nom_unsigned_four_bytes(data: Uint8Array): NomUnsigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomUnsigned = Deno.core.ops.js_nom_unsigned_four_bytes(data);
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}

/**
 * Nom helper to parse eight bytes
 * @param data Bytes to provide to nom
 * @returns Unsigned eight byte value
 */
export function nom_unsigned_eight_bytes(
  data: Uint8Array,
): NomUnsigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomUnsigned = Deno.core.ops.js_nom_unsigned_eight_bytes(data);
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}

/**
 * Nom helper to parse two bytes
 * @param data Bytes to provide to nom
 * @returns Unsigned two byte value
 */
export function nom_unsigned_two_bytes(data: Uint8Array): NomUnsigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomUnsigned = Deno.core.ops.js_nom_unsigned_two_bytes(data);
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}

/**
 * Nom helper to parse one bytes
 * @param data Bytes to provide to nom
 * @returns Unsigned one byte value
 */
export function nom_unsigned_one_bytes(data: Uint8Array): NomUnsigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomUnsigned = Deno.core.ops.js_nom_unsigned_one_bytes(data);
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}

/**
 * Nom helper to parse sixteen bytes
 * @param data Bytes to provide to nom
 * @returns Unsigned sixteen byte value
 */
export function nom_unsigned_sixteen_bytes(
  data: Uint8Array,
): NomUnsigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomUnsigned = Deno.core.ops.js_nom_unsigned_sixteen_bytes(data);
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}

/**
 * Nom helper to parse four bytes
 * @param data Bytes to provide to nom
 * @returns Signed four byte value
 */
export function nom_signed_four_bytes(data: Uint8Array): NomSigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomSigned = Deno.core.ops.js_nom_signed_four_bytes(data);
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}

/**
 * Nom helper to parse eight bytes
 * @param data Bytes to provide to nom
 * @returns Signed eight byte value
 */
export function nom_signed_eight_bytes(data: Uint8Array): NomSigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomSigned = Deno.core.ops.js_nom_signed_eight_bytes(data);
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}

/**
 * Nom helper to parse two bytes
 * @param data Bytes to provide to nom
 * @returns Signed two byte value
 */
export function nom_signed_two_bytes(data: Uint8Array): NomSigned | Error {
  //@ts-ignore: Custom Artemis function
  const result: NomSigned = Deno.core.ops.js_nom_signed_two_bytes(data);
  if (result.remaining.length === 0 && result.value === 0) {
    return new Error("nommed zero bytes");
  }
  return result;
}
