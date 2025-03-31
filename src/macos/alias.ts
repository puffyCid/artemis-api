import { Alias, AliasTags } from "../../types/macos/alias";
import { Nom } from "../../types/nom/nom";
import { extractUtf8String } from "../encoding/strings";
import { NomError } from "../nom/error";
import {
  Endian,
  nomSignedFourBytes,
  nomSignedTwoBytes,
  nomUnsignedFourBytes,
  nomUnsignedOneBytes,
  nomUnsignedTwoBytes,
} from "../nom/helpers";
import { take } from "../nom/parsers";
import { hfsToUnixEpoch, unixEpochToISO } from "../time/conversion";
import { MacosError } from "./errors";

/**
 * Function to parse macOS `alias` data
 * @param data Raw `alias` bytes to parse
 * @returns Parsed `alias` object or MacosError
 */
export function parseAlias(data: Uint8Array): Alias | MacosError {
  const sig = nomUnsignedFourBytes(data, Endian.Be);
  if (sig instanceof NomError) {
    return new MacosError("ALIAS", `failed to parse signature: ${sig}`);
  }

  const min_size = 150;
  const size = nomUnsignedTwoBytes(sig.remaining, Endian.Be);
  if (size instanceof NomError) {
    return new MacosError("ALIAS", `failed to parse size: ${size}`);
  } else if (size.value < min_size) {
    return new MacosError("ALIAS", `data too small: ${size.value}`);
  }

  const version = nomUnsignedTwoBytes(size.remaining, Endian.Be);
  if (version instanceof NomError) {
    return new MacosError("ALIAS", `failed to parse version: ${version}`);
  }

  const support = 2;
  if (version.value != support) {
    return new MacosError(
      "ALIAS",
      `unsupported alias version: ${version.value}`,
    );
  }

  const kind_data = nomUnsignedTwoBytes(version.remaining, Endian.Be);
  if (kind_data instanceof NomError) {
    return new MacosError("ALIAS", `failed to parse kind data: ${kind_data}`);
  }

  let kind = "";
  if (kind_data.value === 0) {
    kind = "file";
  } else if (kind_data.value === 1) {
    kind = "directory";
  }

  const volume_name_size = 28;
  let alias_data = take(kind_data.remaining as Uint8Array, volume_name_size);
  if (alias_data instanceof NomError) {
    return new MacosError("ALIAS", `failed to parse alias data: ${alias_data}`);
  }

  // First byte is the length of volume name
  const volume_data = nomUnsignedOneBytes(
    alias_data.nommed as Uint8Array,
  );
  if (volume_data instanceof NomError) {
    return new MacosError(
      "ALIAS",
      `failed to parse volume data: ${volume_data}`,
    );
  }

  // Now nom size of the volume name
  let string_data = take(volume_data.remaining, volume_data.value);
  if (string_data instanceof NomError) {
    return new MacosError(
      "ALIAS",
      `failed to parse string data: ${string_data}`,
    );
  }

  // Get the volume name
  const volume_name = extractUtf8String(string_data.nommed as Uint8Array);

  const created_data = nomUnsignedFourBytes(
    alias_data.remaining as Uint8Array,
    Endian.Be,
  );
  if (created_data instanceof NomError) {
    return new MacosError(
      "ALIAS",
      `failed to parse created data: ${created_data}`,
    );
  }

  const volume_created = created_data.value;

  const type_data = nomUnsignedTwoBytes(created_data.remaining, Endian.Be);
  if (type_data instanceof NomError) {
    return new MacosError("ALIAS", `failed to parse type data: ${type_data}`);
  }
  const filesystem_type = type_data.value;

  const disk_data = nomUnsignedTwoBytes(type_data.remaining, Endian.Be);
  if (disk_data instanceof NomError) {
    return new MacosError("ALIAS", `failed to parse disk data: ${disk_data}`);
  }

  const disk_type = disk_data.value;

  const cnid_data = nomSignedFourBytes(disk_data.remaining, Endian.Be);
  if (cnid_data instanceof NomError) {
    return new MacosError("ALIAS", `failed to cnid kind data: ${cnid_data}`);
  }

  const cnid = cnid_data.value;

  const target_name_size = 64;
  alias_data = take(cnid_data.remaining, target_name_size);
  if (alias_data instanceof NomError) {
    return new MacosError(
      "ALIAS",
      `failed to parse name size data: ${alias_data}`,
    );
  }

  // First byte of target name is the size of name
  const target_size = nomUnsignedOneBytes(
    alias_data.nommed as Uint8Array,
  );
  if (target_size instanceof NomError) {
    return new MacosError(
      "ALIAS",
      `failed to parse target size data: ${target_size}`,
    );
  }
  // Now nom size of the target name
  string_data = take(target_size.remaining, target_size.value);
  if (string_data instanceof NomError) {
    return new MacosError(
      "ALIAS",
      `failed to parse additional string data: ${string_data}`,
    );
  }

  const target_name = extractUtf8String(string_data.nommed as Uint8Array);

  const target_cnid_data = nomUnsignedFourBytes(
    alias_data.remaining as Uint8Array,
    Endian.Be,
  );
  if (target_cnid_data instanceof NomError) {
    return new MacosError(
      "ALIAS",
      `failed to parse target cnid data: ${target_cnid_data}`,
    );
  }

  const target_cnid = target_cnid_data.value;

  const target_created_data = nomUnsignedFourBytes(
    target_cnid_data.remaining,
    Endian.Be,
  );
  if (target_created_data instanceof NomError) {
    return new MacosError(
      "ALIAS",
      `failed to parse target created data: ${target_created_data}`,
    );
  }

  const target_created = target_created_data.value;

  const code_data = nomUnsignedFourBytes(
    target_created_data.remaining,
    Endian.Be,
  );
  if (code_data instanceof NomError) {
    return new MacosError("ALIAS", `failed to parse code data: ${kind_data}`);
  }

  const target_creator_code = code_data.value;

  const type_code_data = nomUnsignedFourBytes(code_data.remaining, Endian.Be);
  if (type_code_data instanceof NomError) {
    return new MacosError(
      "ALIAS",
      `failed to parse type code data: ${type_code_data}`,
    );
  }

  const target_type_code = type_code_data.value;

  const alias_root_data = nomSignedTwoBytes(
    type_code_data.remaining,
    Endian.Be,
  );
  if (alias_root_data instanceof NomError) {
    return new MacosError(
      "ALIAS",
      `failed to parse alias root data: ${alias_root_data}`,
    );
  }

  const number_directory_levels_from_alias_to_root = alias_root_data.value;

  const root_target_data = nomSignedTwoBytes(
    alias_root_data.remaining,
    Endian.Be,
  );
  if (root_target_data instanceof NomError) {
    return new MacosError(
      "ALIAS",
      `failed to parse root data: ${root_target_data}`,
    );
  }

  const number_directory_levels_from_root_to_target = root_target_data.value;

  const attributes_data = nomUnsignedFourBytes(
    root_target_data.remaining,
    Endian.Be,
  );
  if (attributes_data instanceof NomError) {
    return new MacosError(
      "ALIAS",
      `failed to parse attributes data: ${attributes_data}`,
    );
  }

  const volume_attributes = attributes_data.value;

  const id_data = nomUnsignedTwoBytes(attributes_data.remaining, Endian.Be);
  if (id_data instanceof NomError) {
    return new MacosError("ALIAS", `failed to parse id data: ${id_data}`);
  }

  const volume_filesystem_id = id_data.value;

  const reserved_size = 10;
  alias_data = take(id_data.remaining, reserved_size);
  if (alias_data instanceof NomError) {
    return new MacosError(
      "ALIAS",
      `failed to parse additional alias data: ${alias_data}`,
    );
  }

  const tags = getTags(alias_data.remaining as Uint8Array);
  const alias: Alias = {
    kind,
    volume_name,
    volume_created: unixEpochToISO(hfsToUnixEpoch(volume_created)),
    filesystem_type,
    disk_type,
    cnid,
    target_name,
    target_cnid,
    target_created: unixEpochToISO(hfsToUnixEpoch(target_created)),
    target_creator_code,
    target_type_code,
    number_directory_levels_from_alias_to_root,
    number_directory_levels_from_root_to_target,
    volume_attributes,
    volume_filesystem_id,
    tags,
  };

  return alias;
}

/**
 * Function to get the optional tags of an `alias`
 * @param data Raw tag bytes from `alias`
 * @returns `AliasTags` object
 */
function getTags(data: Uint8Array): AliasTags {
  // Remaining data is all tags (if any)
  let tag = 0;

  const alias_tags: AliasTags = {
    carbon_paths: [],
    paths: [],
  };

  let tag_data = data;
  tag_parser:
  while (tag != 255 && tag != -1 && tag_data.length != 0) {
    const result = nomUnsignedTwoBytes(tag_data, Endian.Be);
    if (result instanceof NomError) {
      break;
    }

    tag = result.value;

    // Parse data based on tag type. Only supporting path like tags for now
    switch (tag) {
      case 0:
      case 2: {
        const path_data = parseTag(result.remaining);
        if (path_data instanceof NomError) {
          break tag_parser;
        }
        // Extract path string
        const path = extractUtf8String(path_data.nommed as Uint8Array);

        alias_tags.carbon_paths.push(path);
        // Move on to the next tag
        tag_data = path_data.remaining as Uint8Array;
        break;
      }
      case 18:
      case 19: {
        const path_data = parseTag(result.remaining);
        if (path_data instanceof NomError) {
          break tag_parser;
        }
        // Extract path string
        const path = extractUtf8String(path_data.nommed as Uint8Array);

        alias_tags.paths.push(path);
        // Move on to the next tag
        tag_data = path_data.remaining as Uint8Array;
        break;
      }
      default: {
        // Handle unsupported tags
        const result_data = parseTag(result.remaining);
        if (result_data instanceof NomError) {
          break tag_parser;
        }

        if (tag_data.length === result.remaining.length) {
          console.error("Encountered infinte loop. Stopping parsing!");
          break tag_parser;
        }

        tag_data = result_data.remaining as Uint8Array;
        break;
      }
    }
  }

  return alias_tags;
}

/**
 * Function to parse the bytes of tag
 * @param data Raw bytes of the tag data
 * @returns `Nom` bytes that were parsed
 */
function parseTag(data: Uint8Array): Nom | NomError {
  // Get size of path
  let result = nomUnsignedTwoBytes(data, Endian.Be);
  if (result instanceof NomError) {
    return result;
  }

  // Nom the path data
  const path_data = take(result.remaining, result.value);
  if (path_data instanceof NomError) {
    return path_data;
  }

  // If size is odd. There is a padding byte
  if (result.value & 1) {
    result = nomUnsignedOneBytes(path_data.remaining as Uint8Array);
    if (result instanceof NomError) {
      return result;
    }
    path_data.remaining = result.remaining;
  }
  return path_data;
}
