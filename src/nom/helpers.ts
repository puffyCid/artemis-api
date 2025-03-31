import {
  NomNumber,
  NomSignedLarge,
  NomUnsignedLarge,
} from "../../types/nom/nom";
import { NomError } from "./error";

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
): NomNumber | NomError {
  if (data.buffer.byteLength < 4) {
    return new NomError(
      "NOM",
      `fewer than four bytes in input`,
    );
  }
  let little = false;
  if (endianess === Endian.Le) {
    little = true;
  }
  const nom_bytes = data.buffer.slice(0, 4);
  const value = new DataView(nom_bytes.slice(0, nom_bytes.byteLength))
    .getUint32(0, little);
  const bytes: NomNumber = {
    remaining: data.slice(4),
    value,
  };
  return bytes;
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
): NomUnsignedLarge | NomError {
  if (data.buffer.byteLength < 8) {
    return new NomError(
      "NOM",
      `fewer than eight bytes in input`,
    );
  }
  let little = false;
  if (endianess === Endian.Le) {
    little = true;
  }
  const nom_bytes = data.buffer.slice(0, 8);
  const value = new DataView(nom_bytes.slice(0, nom_bytes.byteLength))
    .getBigUint64(0, little);
  const bytes: NomUnsignedLarge = {
    remaining: data.slice(8),
    value,
  };
  return bytes;
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
): NomNumber | NomError {
  if (data.buffer.byteLength < 2) {
    return new NomError(
      "NOM",
      `fewer than two bytes in input`,
    );
  }
  let little = false;
  if (endianess === Endian.Le) {
    little = true;
  }
  const nom_bytes = data.buffer.slice(0, 2);
  const value = new DataView(nom_bytes.slice(0, nom_bytes.byteLength))
    .getUint16(0, little);
  const bytes: NomNumber = {
    remaining: data.slice(2),
    value,
  };
  return bytes;
}

/**
 * Nom helper to parse one bytes
 * @param data Bytes to provide to nom
 * @param endianess Endian type of `data`
 * @returns Unsigned one byte value
 */
export function nomUnsignedOneBytes(
  data: Uint8Array,
): NomNumber | NomError {
  if (data.buffer.byteLength < 1) {
    return new NomError(
      "NOM",
      `fewer than one byte in input`,
    );
  }

  const nom_bytes = data.buffer.slice(0, 1);
  const value = new DataView(nom_bytes.slice(0, nom_bytes.byteLength))
    .getUint8(0);
  const bytes: NomNumber = {
    remaining: data.slice(1),
    value,
  };
  return bytes;
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
  if (data.buffer.byteLength < 16) {
    return new NomError(
      "NOM",
      `fewer than sixteen byte in input`,
    );
  }

  const fist_eight = data.buffer.slice(0, 8);
  const second_eight = data.buffer.slice(8, 16);
  let little = false;
  if (endianess === Endian.Le) {
    little = true;
  }

  const value = new DataView(fist_eight.slice(0, fist_eight.byteLength))
    .getBigUint64(0, little);
  const value2 = new DataView(second_eight.slice(0, second_eight.byteLength))
    .getBigUint64(0, little);

  const bytes: NomUnsignedLarge = {
    remaining: data.slice(16),
    value: BigInt(value.toString() + value2.toString()),
  };

  return bytes;
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
): NomNumber | NomError {
  if (data.buffer.byteLength < 4) {
    return new NomError(
      "NOM",
      `fewer than four bytes in input`,
    );
  }
  let little = false;
  if (endianess === Endian.Le) {
    little = true;
  }
  const nom_bytes = data.buffer.slice(0, 4);
  const value = new DataView(nom_bytes.slice(0, nom_bytes.byteLength))
    .getInt32(0, little);
  const bytes: NomNumber = {
    remaining: data.slice(4),
    value,
  };
  return bytes;
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
): NomSignedLarge | NomError {
  if (data.buffer.byteLength < 8) {
    return new NomError(
      "NOM",
      `fewer than eight bytes in input`,
    );
  }
  let little = false;
  if (endianess === Endian.Le) {
    little = true;
  }
  const nom_bytes = data.buffer.slice(0, 8);
  const value = new DataView(nom_bytes.slice(0, nom_bytes.byteLength))
    .getBigInt64(0, little);
  const bytes: NomUnsignedLarge = {
    remaining: data.slice(8),
    value,
  };
  return bytes;
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
): NomNumber | NomError {
  if (data.buffer.byteLength < 2) {
    return new NomError(
      "NOM",
      `fewer than two bytes in input`,
    );
  }
  let little = false;
  if (endianess === Endian.Le) {
    little = true;
  }
  const nom_bytes = data.buffer.slice(0, 2);
  const value = new DataView(nom_bytes.slice(0, nom_bytes.byteLength))
    .getInt16(0, little);
  const bytes: NomNumber = {
    remaining: data.slice(2),
    value,
  };
  return bytes;
}
