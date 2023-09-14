import { SingleRequirement } from "../../../types/macos/codesigning.d.ts";
import { bytesToHexString, extractUtf8String } from "../../encoding/strings.ts";
import { Endian, nomUnsignedFourBytes } from "../../nom/helpers.ts";
import { take } from "../../nom/parsers.ts";

/**
 * Function to parse a Single Requirement blob and extract data
 * @param data Bytes containing a `Single Requirement` blob
 * @returns `SingleRequirement` object containing the `Team ID` and `Identifier`
 */
export function parseRequirementBlob(
  data: Uint8Array,
): SingleRequirement | Error {
  // First four (4) bytes are signature
  let result = nomUnsignedFourBytes(data, Endian.Be);
  if (result instanceof Error) {
    return result;
  }

  const sig = 4208856064;
  if (result.value != sig) {
    return new Error(
      `Invalid sigature expected 4208856064 got: ${result.value}`,
    );
  }

  // Size of data including the header and size itself
  result = nomUnsignedFourBytes(result.remaining, Endian.Be);
  if (result instanceof Error) {
    return result;
  }

  const data_size = result.value;
  const cdhash_size = 40;

  // Check if only CD Hash is present
  if (data_size === cdhash_size) {
    let cd_hash_data = take(data, data_size / 2);
    if (cd_hash_data instanceof Error) {
      return cd_hash_data;
    }

    cd_hash_data = take(cd_hash_data.remaining, data_size / 2);
    if (cd_hash_data instanceof Error) {
      return cd_hash_data;
    }

    const requirement: SingleRequirement = {
      identifier: "",
      team_id: "",
      cdhash: bytesToHexString(cd_hash_data.nommed as Uint8Array),
    };

    return requirement;
  }

  // Unknown
  result = nomUnsignedFourBytes(result.remaining, Endian.Be);
  if (result instanceof Error) {
    return result;
  }

  // Unknown
  result = nomUnsignedFourBytes(result.remaining, Endian.Be);
  if (result instanceof Error) {
    return result;
  }

  // Unknown
  result = nomUnsignedFourBytes(result.remaining, Endian.Be);
  if (result instanceof Error) {
    return result;
  }

  // Size of identifier string
  result = nomUnsignedFourBytes(result.remaining, Endian.Be);
  if (result instanceof Error) {
    return result;
  }

  // Now have nommed identifier
  let remaining = take(result.remaining, result.value);
  if (remaining instanceof Error) {
    return remaining;
  }

  // We know its a `Uint8Array` value because thats what we have been parsing
  const identifier = extractUtf8String(remaining.nommed as Uint8Array);

  // No Team IDs for Apple applications
  if (identifier.startsWith("com.apple.")) {
    const requirement: SingleRequirement = {
      identifier,
      team_id: "",
      cdhash: "",
    };

    return requirement;
  }
  /**
   * We could parse the rest of the format one step at a time. But its primarily Apple root certs.
   * Instead we jump to last ~10 bytes to get the the Team ID
   */

  const padding = 2;
  const id_size = 10;

  const id_start = data_size - (id_size + padding);
  // Go to start of Team ID data
  remaining = take(data, id_start);
  if (remaining instanceof Error) {
    return remaining;
  }

  // Now nom the team id bytes
  remaining = take(remaining.remaining, id_size);
  if (remaining instanceof Error) {
    return remaining;
  }

  // We know its a `Uint8Array` value because thats what we have been parsing
  const team_id = extractUtf8String(remaining.nommed as Uint8Array);
  const requirement: SingleRequirement = {
    identifier,
    team_id,
    cdhash: "",
  };

  return requirement;
}