import { Icon, OSType } from "../../types/images/icns";
import { encode, extractUtf8String } from "../encoding/mod";
import { Endian } from "../nom/helpers";
import { nomUnsignedFourBytes, take } from "../nom/mod";
import { ImageError } from "./errors";

/**
 * Parse a `icns` file and return all the icons in the file
 * @param data Raw icns bytes
 * @returns Array of `Icon` or error
 */
export function parseIcon(data: Uint8Array): Icon[] | ImageError {
  const sig = nomUnsignedFourBytes(data, Endian.Be);
  if (sig instanceof Error) {
    return new ImageError(
      "ICON_ICNS",
      `failed to parse signature for icns: ${sig}`,
    );
  }
  const header = 1768124019;
  if (sig.value != header) {
    return new ImageError(
      "ICON_ICNS",
      `not icns file wanted 1768124019, got ${sig.value}`,
    );
  }
  const file_len = nomUnsignedFourBytes(sig.remaining, Endian.Be);
  if (file_len instanceof Error) {
    return new ImageError(
      "ICON_ICNS",
      `failed to parse file length for icns: ${file_len}`,
    );
  }

  const icons: Icon[] = [];
  let icon_data = file_len.remaining;

  while (icon_data.length != 0) {
    const icon_size = 4;
    const icon_type = take(icon_data, icon_size);
    if (icon_type instanceof Error) {
      break;
    }

    const size = osType(icon_type.nommed as Uint8Array);
    const unknown = 0;
    if (size == unknown) {
      break;
    }
    const icon_len = nomUnsignedFourBytes(
      icon_type.remaining as Uint8Array,
      Endian.Be,
    );
    if (icon_len instanceof Error) {
      break;
    }
    // Icon data length includes OSType and length data. We already nom'd that away
    const adjust = 8;
    const raw_icon = take(icon_len.remaining, icon_len.value - adjust);
    if (raw_icon instanceof Error) {
      break;
    }
    icon_data = raw_icon.remaining as Uint8Array;

    const icon: Icon = {
      size,
      image: encode(raw_icon.nommed as Uint8Array),
    };
    icons.push(icon);
  }
  return icons;
}

/**
 * Determine OSType value for icon picture
 * @param type Raw OSType bytes
 * @returns The size of the App icon picture
 */
function osType(type: Uint8Array): number {
  const value = extractUtf8String(type) as OSType;

  if (
    [
      OSType.icon,
      OSType.icn,
      OSType.icl4,
      OSType.icl8,
      OSType.il32,
      OSType.l8mk,
      OSType.icp5,
      OSType.ic11,
      OSType.ic05,
    ].includes(value)
  ) {
    return 32;
  } else if (
    [
      OSType.icm,
      OSType.icm4,
      OSType.icm8,
      OSType.ics,
      OSType.ics4,
      OSType.ics8,
      OSType.is32,
      OSType.s8mk,
      OSType.ic04,
    ].includes(value)
  ) {
    return 16;
  } else if (
    [
      OSType.ich,
      OSType.ich4,
      OSType.ih32,
      OSType.h8mk,
      OSType.ich8,
      OSType.icp6,
      OSType.SB24,
    ].includes(value)
  ) {
    return 48;
  } else if ([OSType.it32, OSType.t8mk, OSType.ic07].includes(value)) {
    return 128;
  } else if ([OSType.icp4].includes(value)) {
    return 16;
  } else if ([OSType.ic08, OSType.ic13].includes(value)) {
    return 256;
  } else if ([OSType.ic09, OSType.ic14].includes(value)) {
    return 512;
  } else if ([OSType.ic10].includes(value)) {
    return 1024;
  } else if ([OSType.ic12].includes(value)) {
    return 64;
  } else if ([OSType.icsb].includes(value)) {
    return 18;
  } else if ([OSType.icsB].includes(value)) {
    return 36;
  } else if ([OSType.sb24].includes(value)) {
    return 24;
  } else if (
    [
      OSType.toc,
      OSType.icnV,
      OSType.name,
      OSType.info,
      OSType.sbtp,
      OSType.slct,
    ].includes(value)
  ) {
    // Unknown types or contains non-image data
    return -1;
  }
  console.warn(`Unknown OSType ${value}`);
  return 0;
}
