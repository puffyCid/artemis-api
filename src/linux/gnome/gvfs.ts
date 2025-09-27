import type { GvfsEntry } from "../../../types/linux/gnome/gvfs";
import { extractUtf8String } from "../../encoding/mod";
import { FileError } from "../../filesystem/errors";
import { readFile } from "../../filesystem/files";
import { glob } from "../../filesystem/files";
import { NomError } from "../../nom/error";
import { Endian } from "../../nom/helpers";
import {
  nomUnsignedEightBytes,
  nomUnsignedFourBytes,
  nomUnsignedTwoBytes,
  take,
  takeUntil,
} from "../../nom/mod";
import { unixEpochToISO } from "../../time/conversion";
import { LinuxError } from "../errors";

/**
 * Function to parse GVFS metadata files. By default will parse all GVFS metadata files at `/home/%/.local/share/gvfs-metadata/%`
 * @param alt_path Alternative path (or glob) to a GVFS file
 * @returns Array of `GVFSEntry` or `LinuxError`
 */
export function parseGvfs(alt_path?: string): GvfsEntry[] | LinuxError {
  let path = "/home/*/.local/share/gvfs-metadata/*";

  if (alt_path !== undefined) {
    path = alt_path;
  }

  const glob_paths = glob(path);
  if (glob_paths instanceof FileError) {
    console.warn(`Could not glob ${path}: ${glob_paths}`);
    return new LinuxError(
      `GVFS`,
      "could not get recent files",
    );
  }

  let entries: GvfsEntry[] = [];

  for (const entry of glob_paths) {
    // Skip GVFS journal files
    if (entry.full_path.endsWith(".log")) {
      continue;
    }
    const data = readFile(entry.full_path);
    if (data instanceof FileError) {
      console.warn(
        `Could not read ${entry.full_path}: ${data}`,
      );
      continue;
    }

    const header = extractHeader(data);
    if (header instanceof NomError) {
      console.warn(
        `Could not parse header for ${entry.full_path}: ${header}`,
      );
      continue;
    }

    const keywords = getKeywords(
      data,
      header.keywords_offset,
    );
    if (keywords instanceof NomError) {
      console.warn(
        `Could not get keywords for ${entry.full_path}: ${keywords}`,
      );
      continue;
    }

    const root = getRoot(
      data,
      header.root_offset,
      header.base_time,
    );
    if (root instanceof NomError) {
      console.warn(
        `Could not get root start for ${entry.full_path}: ${root}`,
      );
      continue;
    }

    const children = getChildren(
      root.children_offset,
      data,
      [ root.name ],
      header.base_time,
      keywords,
      entry.full_path,
    );
    if (children instanceof NomError) {
      console.warn(
        `Could not get children for root at ${entry.full_path}: ${children}`,
      );
      continue;
    }
    entries = entries.concat(children);
  }

  return entries;
}

interface Header {
  magic: number;
  version: number;
  rotated_number: number;
  /**Random */
  tag: number;
  root_offset: number;
  keywords_offset: number;
  base_time: number;
}

/**
 * Function to get the header data associated with GVFS. Points to root, keywords, and our base timestamp
 * @param data GVFS bytes data
 * @returns `Header` info associated with GVFS metadata
 */
function extractHeader(data: Uint8Array): Header | NomError {
  const sig_size = 6;
  const magic = take(data, sig_size);
  if (magic instanceof NomError) {
    return new NomError("NOM", `failed to get magic sig: ${magic}`);
  }
  const version = nomUnsignedTwoBytes(
    magic.remaining as Uint8Array,
    Endian.Le,
  );
  if (version instanceof NomError) {
    return new NomError("NOM", `failed to get version: ${version}`);
  }
  const rotated_number = nomUnsignedFourBytes(version.remaining, Endian.Be);
  if (rotated_number instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to get rotated number: ${rotated_number}`,
    );
  }
  const tag = nomUnsignedFourBytes(rotated_number.remaining, Endian.Be);
  if (tag instanceof NomError) {
    return new NomError("NOM", `failed to get tag: ${tag}`);
  }

  const root_offset = nomUnsignedFourBytes(tag.remaining, Endian.Be);
  if (root_offset instanceof NomError) {
    return new NomError("NOM", `failed to get root offset: ${root_offset}`);
  }

  const keywords_offset = nomUnsignedFourBytes(
    root_offset.remaining,
    Endian.Be,
  );
  if (keywords_offset instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to get keywords_offset: ${keywords_offset}`,
    );
  }

  const base_time = nomUnsignedEightBytes(
    keywords_offset.remaining,
    Endian.Be,
  );
  if (base_time instanceof NomError) {
    return new NomError("NOM", `failed to get base time: ${base_time}`);
  }

  let magic_sig = 0;
  for (let i = 0; i < magic.nommed.length; i++) {
    magic_sig |= (magic.nommed as Uint8Array)[ i ] << (i * 8);
  }

  const header: Header = {
    magic: magic_sig,
    version: version.value,
    rotated_number: rotated_number.value,
    tag: tag.value,
    root_offset: root_offset.value,
    keywords_offset: keywords_offset.value,
    base_time: Number(base_time.value),
  };

  return header;
}

/**
 * Function to get the keyword attributes in the GFVS metadata
 * @param data GVFS bytes data
 * @param offset Offset to start of keywords
 * @returns Array of keyword strings
 */
function getKeywords(
  data: Uint8Array,
  offset: number,
): string[] | NomError {
  const keyword_start = take(data, offset);
  if (keyword_start instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to get keyword start: ${keyword_start}`,
    );
  }
  const keywords: string[] = [];
  const keyword_count = nomUnsignedFourBytes(
    keyword_start.remaining as Uint8Array,
    Endian.Be,
  );
  if (keyword_count instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to get keyword count: ${keyword_count}`,
    );
  }

  let count = 0;
  let remaining_bytes = keyword_count.remaining;
  while (count < keyword_count.value) {
    count++;
    const keyword_offset = nomUnsignedFourBytes(
      remaining_bytes,
      Endian.Be,
    );
    if (keyword_offset instanceof NomError) {
      continue;
    }
    remaining_bytes = keyword_offset.remaining;
    const keyword_start = take(data, keyword_offset.value);
    if (keyword_start instanceof NomError) {
      continue;
    }

    const keyword_value = takeUntil(
      keyword_start.remaining,
      new Uint8Array([ 0 ]),
    );
    if (keyword_value instanceof NomError) {
      continue;
    }

    const keyword = extractUtf8String(keyword_value.nommed as Uint8Array);
    keywords.push(keyword);
  }
  return keywords;
}

interface RootDir {
  /**Should be "/" */
  name: string;
  name_offset: number;
  children_offset: number;
  metadata_offset: number;
  metadata: Record<number, string | string[]>;
  /**Last change for metadata */
  last_change: string;
}

/**
 * Function to get the root entry in the GVFS metadata
 * @param data GVFS bytes data
 * @param offset Offset to the root folder
 * @param base_time Base time for all entries in the GVFS metadata
 * @returns
 */
function getRoot(
  data: Uint8Array,
  offset: number,
  base_time: number,
): RootDir | NomError {
  const root_start = take(data, offset);
  if (root_start instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to get root start: ${root_start}`,
    );
  }
  const name_offset = nomUnsignedFourBytes(
    root_start.remaining as Uint8Array,
    Endian.Be,
  );
  if (name_offset instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to get root name offset: ${name_offset}`,
    );
  }

  const children_offset = nomUnsignedFourBytes(
    name_offset.remaining,
    Endian.Be,
  );
  if (children_offset instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to get children offset: ${children_offset}`,
    );
  }

  const meta_offset = nomUnsignedFourBytes(
    children_offset.remaining,
    Endian.Be,
  );
  if (meta_offset instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to get metadata offset: ${meta_offset}`,
    );
  }

  const last_change = nomUnsignedFourBytes(
    meta_offset.remaining,
    Endian.Be,
  );
  if (last_change instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to get last change: ${last_change}`,
    );
  }

  const name = getName(name_offset.value, data);
  if (name instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to get name: ${name}`,
    );
  }
  const root: RootDir = {
    name,
    name_offset: name_offset.value,
    children_offset: children_offset.value,
    metadata_offset: meta_offset.value,
    metadata: {},
    last_change: unixEpochToISO(last_change.value + base_time),
  };

  return root;
}

/**
 * Function to extract metadata attributes associated with the GVFS entry
 * @param offset Offset to the metadata attributes
 * @param data GVFS bytes data
 * @param keywords Array of keyword strings
 * @returns Object of metadata attributes
 */
function extractMetadata(
  offset: number,
  data: Uint8Array,
  keywords: string[],
): Record<string, string | string[]> | NomError {
  const meta_start = take(data, offset);
  if (meta_start instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to nom to metadata start: ${meta_start}`,
    );
  }

  const keys = nomUnsignedFourBytes(
    meta_start.remaining as Uint8Array,
    Endian.Be,
  );
  if (keys instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to key count: ${keys}`,
    );
  }

  let count = 0;
  let remaining_bytes = keys.remaining;
  const meta: Record<string, string> = {};
  while (count < keys.value) {
    const keyword = nomUnsignedFourBytes(remaining_bytes, Endian.Be);
    if (keyword instanceof NomError) {
      return new NomError(
        "NOM",
        `failed to get keyword: ${keyword}`,
      );
    }
    const keyword_value = keywords.at(keyword.value) ?? `${keyword.value}`;

    const value_offset = nomUnsignedFourBytes(keyword.remaining, Endian.Be);
    if (value_offset instanceof NomError) {
      return new NomError(
        "NOM",
        `failed to get value offset: ${value_offset}`,
      );
    }
    remaining_bytes = value_offset.remaining;
    const name = getName(value_offset.value, data);
    if (name instanceof NomError) {
      return new NomError(
        "NOM",
        `failed to get value: ${name}`,
      );
    }

    meta[ keyword_value ] = name;

    count++;
  }

  return meta;
}

/**
 * Function to parse all child and nested child metadata in the GVFS data
 * @param offset Offset to child
 * @param data GVFS bytes data
 * @param parents Parent GVFS entries
 * @param base_time Base time for all GVFS entries
 * @param keywords Array of keyword strings
 * @param source Source of the GVFS file
 * @returns Array of `GVFSEntry` or `NomError`
 */
function getChildren(
  offset: number,
  data: Uint8Array,
  parents: string[],
  base_time: number,
  keywords: string[],
  source: string,
): GvfsEntry[] | NomError {
  const child_data = take(data, offset);
  if (child_data instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to nom child offset: ${child_data}`,
    );
  }
  const childs_count = nomUnsignedFourBytes(
    child_data.remaining as Uint8Array,
    Endian.Be,
  );
  if (childs_count instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to get number of children: ${childs_count}`,
    );
  }

  let count = 0;
  let remaining_bytes = childs_count.remaining;
  let children: GvfsEntry[] = [];
  while (count < childs_count.value) {
    const name_offset = nomUnsignedFourBytes(
      remaining_bytes,
      Endian.Be,
    );
    if (name_offset instanceof NomError) {
      return new NomError(
        "NOM",
        `failed to get child name offset: ${name_offset}`,
      );
    }

    const child_offset = nomUnsignedFourBytes(
      name_offset.remaining,
      Endian.Be,
    );
    if (child_offset instanceof NomError) {
      return new NomError(
        "NOM",
        `failed to get child name offset: ${child_offset}`,
      );
    }

    const meta_offset = nomUnsignedFourBytes(
      child_offset.remaining,
      Endian.Be,
    );
    if (meta_offset instanceof NomError) {
      return new NomError(
        "NOM",
        `failed to get child name offset: ${meta_offset}`,
      );
    }

    const last_change = nomUnsignedFourBytes(
      meta_offset.remaining,
      Endian.Be,
    );
    if (last_change instanceof NomError) {
      return new NomError(
        "NOM",
        `failed to get child metadata last change: ${last_change}`,
      );
    }

    remaining_bytes = last_change.remaining;

    const name = getName(name_offset.value, data);
    if (name instanceof NomError) {
      return name;
    }

    const metadata = extractMetadata(meta_offset.value, data, keywords);
    if (metadata instanceof NomError) {
      return metadata;
    }

    const child: GvfsEntry = {
      name,
      metadata,
      last_change: unixEpochToISO(last_change.value + base_time),
      path: `${parents.join("/")}/${name}`.replace("//", "/"),
      source,
    };

    children.push(child);
    parents.push(child.name);
    const nested_child = getChildren(
      child_offset.value,
      data,
      parents,
      base_time,
      keywords,
      source,
    );
    if (nested_child instanceof NomError) {
      return children;
    }
    children = children.concat(nested_child);
    parents.pop();
    count++;
  }

  return children;
}

/**
 * Function to get the GVFS entry name
 * @param offset Offset to entry name
 * @param data GVFS bytes data
 * @returns string or `NomError`
 */
function getName(offset: number, data: Uint8Array): string | NomError {
  const name_start = take(data, offset);
  if (name_start instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to nom to name offset: ${name_start}`,
    );
  }

  const name_data = takeUntil(name_start.remaining, new Uint8Array([ 0 ]));
  if (name_data instanceof NomError) {
    return new NomError(
      "NOM",
      `failed to nom name data: ${name_data}`,
    );
  }

  const name = extractUtf8String(name_data.nommed as Uint8Array);
  return name;
}
