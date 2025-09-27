/**
 * Bil of Materials (BOM) files are created whenever the macOS Installer is used to install an application.
 * BOM files track what files were created by the Installer. It is commonly used to ensure files are removed when the application is uninstalled
 * The format is undocumented
 *
 * References:
 *  - https://github.com/iineva/bom
 *  - https://github.com/hogliux/bomutils
 */
import { Bom, BomFiles } from "../../types/macos/bom";
import { extractUtf8String } from "../encoding/mod";
import { FileError } from "../filesystem/errors";
import { readFile } from "../filesystem/files";
import { NomError } from "../nom/error";
import {
  Endian,
  nomUnsignedEightBytes,
  nomUnsignedOneBytes,
  nomUnsignedTwoBytes,
} from "../nom/helpers";
import { nomUnsignedFourBytes, take } from "../nom/mod";
import { unixEpochToISO } from "../time/conversion";
import { MacosError } from "./errors";
import { getPlist } from "./plist";

/**
 * Parse a Bill of Materials (BOM) file and get file paths described in the file. When an application (pkg) is install macOS creates a BOM file to track files the pkg creates
 * @param path Path to BOM file
 * @returns `BOM` file or `MacosError`
 */
export function parseBom(path: string): Bom | MacosError {
  const data = readFile(path);
  if (data instanceof FileError) {
    return new MacosError("BOM", `failed to read ${path}: ${data}`);
  }

  const header = parseHeader(data);
  if (header instanceof MacosError) {
    return new MacosError("BOM", `failed to parse header: ${header}`);
  }

  const table_data = take(data, header.index_table_offset);
  if (table_data instanceof NomError) {
    return new MacosError("BOM", `failed to get table data: ${table_data}`);
  }

  const table = getPointers(table_data.remaining as Uint8Array);
  if (table instanceof MacosError) {
    return new MacosError("BOM", `failed to parse table: ${table_data}`);
  }

  const var_data = take(data, header.var_offset);
  if (var_data instanceof NomError) {
    return new MacosError("BOM", `failed to get var data: ${table_data}`);
  }

  const vars = getVars(var_data.remaining as Uint8Array);
  if (vars instanceof MacosError) {
    return new MacosError("BOM", `failed to parse vars: ${table_data}`);
  }

  let boms: BomFiles[] = [];
  for (const entry of vars.vars) {
    // Only Paths entry contains our data
    if (entry.name !== "Paths") {
      continue;
    }

    const tree_entry = parseTreeEntry(data, entry.index, table.pointers);
    if (tree_entry instanceof MacosError) {
      return new MacosError("BOM", `failed to get tree entry: ${tree_entry}`);
    }

    let forward = tree_entry.index;
    const index_list: TreeIndex[] = [];
    while (forward !== 0) {
      let tree = parseTree(data, forward, table.pointers);
      if (tree instanceof MacosError) {
        return new MacosError("BOM", `failed to get tree info: ${tree}`);
      }
      let index_data = tree.data;

      // If entry is not a leaf get next Tree based on data
      while (!tree.is_leaf) {
        const index = parseTreeIndex(index_data);
        if (index instanceof MacosError) {
          return new MacosError("BOM", `failed to get tree index: ${index}`);
        }

        tree = parseTree(data, index.tree_index.value_index, table.pointers);
        if (tree instanceof MacosError) {
          return new MacosError("BOM", `failed to get tree info: ${tree}`);
        }
        index_data = tree.data;
      }

      let count = 0;

      while (count < tree.count) {
        const index = parseTreeIndex(index_data);
        if (index instanceof MacosError) {
          return new MacosError("BOM", `failed to get tree index: ${index}`);
        }

        index_list.push(index.tree_index);
        index_data = index.data;

        count++;
      }

      forward = tree.forward;
    }

    // Track data used to assemble file paths
    const bom_map = new Map<number, BomData>();
    for (const tree_index of index_list) {
      const key_data = getBlock(data, tree_index.key_index, table.pointers);
      if (key_data instanceof MacosError) {
        return new MacosError("BOM", `failed to get key data: ${key_data}`);
      }

      const bom_file = getFile(key_data);
      if (bom_file instanceof MacosError) {
        return new MacosError("BOM", `failed to get file: ${bom_file}`);
      }

      const value_data = getBlock(data, tree_index.value_index, table.pointers);
      if (value_data instanceof MacosError) {
        return new MacosError("BOM", `failed to get vale data: ${value_data}`);
      }

      const path = getPath(value_data);
      if (path instanceof MacosError) {
        return new MacosError(
          "BOM",
          `failed to get path id and index: ${value_data}`,
        );
      }

      const bom_info = getPathInfo(data, path.index, table.pointers);
      if (bom_info instanceof MacosError) {
        return new MacosError("BOM", `failed to get path info: ${bom_info}`);
      }
      bom_info.parent = bom_file.parent;

      const bom_data: BomData = {
        bom_file,
        bom_info,
      };

      bom_map.set(path.id, bom_data);
    }
    boms = boms.concat(...assembleBom(bom_map));
  }

  const receipt_file = path.replace(".bom", ".plist");
  const bom = parseReceipt(receipt_file);
  if (bom instanceof MacosError) {
    return new MacosError("BOM", `failed to parse receipt: ${table_data}`);
  }

  bom.files = boms;
  bom.bom_path = path;

  return bom;
}

/**
 * Parse the plist receipt associated with the BOM file
 * @param path Path to plist file containg BOM receipt
 * @returns `BOM` file or `MacosError`
 */
export function parseReceipt(path: string): Bom | MacosError {
  const data = readFile(path);
  if (data instanceof FileError) {
    return new MacosError("BOM", `failed to read ${path}: ${data}`);
  }
  const plist_data = getPlist(data);
  if (data instanceof MacosError) {
    return new MacosError("BOM", `failed to parse ${path}: ${data}`);
  }

  const receipt = plist_data as Record<string, string>;
  const bom: Bom = {
    package_name: receipt[ "PackageFileName" ] ?? "",
    install_data: receipt[ "InstallDate" ] ?? "",
    package_id: receipt[ "PackageIdentifier" ] ?? "",
    package_version: receipt[ "PackageVersion" ] ?? "",
    install_process_name: receipt[ "InstallProcessName" ] ?? "",
    install_prefix_path: receipt[ "InstallPrefixPath" ] ?? "",
    path,
    bom_path: "",
    files: [],
  };
  return bom;
}

interface Header {
  sig: bigint;
  version: number;
  number_blocks: number;
  index_table_offset: number;
  index_length: number;
  var_offset: number;
  var_length: number;
}
/**
 * Parse the Header of the BOM file
 * @param data raw BOM bytes
 * @returns BOM `Header` or `MacosError`
 */
function parseHeader(data: Uint8Array): Header | MacosError {
  const sig = nomUnsignedEightBytes(data, Endian.Be);
  if (sig instanceof NomError) {
    return new MacosError("BOM", `failed to parse signature: ${sig}`);
  }

  const version = nomUnsignedFourBytes(sig.remaining, Endian.Be);
  if (version instanceof NomError) {
    return new MacosError("BOM", `failed to parse version: ${version}`);
  }

  const number_blocks = nomUnsignedFourBytes(version.remaining, Endian.Be);
  if (number_blocks instanceof NomError) {
    return new MacosError(
      "BOM",
      `failed to parse number blocks: ${number_blocks}`,
    );
  }

  const index_table_offset = nomUnsignedFourBytes(
    number_blocks.remaining,
    Endian.Be,
  );
  if (index_table_offset instanceof NomError) {
    return new MacosError(
      "BOM",
      `failed to parse index table offset: ${index_table_offset}`,
    );
  }

  const index_length = nomUnsignedFourBytes(
    index_table_offset.remaining,
    Endian.Be,
  );
  if (index_length instanceof NomError) {
    return new MacosError(
      "BOM",
      `failed to parse index length: ${index_length}`,
    );
  }

  const var_offset = nomUnsignedFourBytes(index_length.remaining, Endian.Be);
  if (var_offset instanceof NomError) {
    return new MacosError("BOM", `failed to parse var offset: ${var_offset}`);
  }

  const var_length = nomUnsignedFourBytes(var_offset.remaining, Endian.Be);
  if (var_length instanceof NomError) {
    return new MacosError("BOM", `failed to parse var length: ${var_length}`);
  }

  const header: Header = {
    sig: sig.value,
    version: version.value,
    number_blocks: number_blocks.value,
    index_table_offset: index_table_offset.value,
    index_length: index_length.value,
    var_offset: var_offset.value,
    var_length: var_length.value,
  };

  return header;
}

interface Table {
  number_pointers: number;
  pointers: Pointer[];
}

interface Pointer {
  address: number;
  length: number;
}

/**
 * Get pointers in BOM file
 * @param data raw BOM bytes
 * @returns `Table` interface or `MacosError`
 */
function getPointers(data: Uint8Array): Table | MacosError {
  const number_pointers = nomUnsignedFourBytes(data, Endian.Be);
  if (number_pointers instanceof NomError) {
    return new MacosError(
      "BOM",
      `failed to parse number pointers: ${number_pointers}`,
    );
  }

  let count = 0;
  const table: Table = {
    number_pointers: number_pointers.value,
    pointers: [],
  };

  const pointer_data = number_pointers.remaining;
  const size = 4;
  const length_end = 8;
  while (count < table.number_pointers) {
    const start = count * length_end;
    if (
      start > pointer_data.length || start + size + size > pointer_data.length
    ) {
      return new MacosError("BOM", `pointer index greater than pointer data`);
    }

    // There can be over 900k pointers in a BOM file (seen in XCode BOM). Using nom to parse the data can take a very long time.
    // In addition, the pointer data can by ~7MB in size. Sending that much data between JS and Rust increases runtime by alot
    // Instead we parse using only JS. Its only 8 bytes of data
    const address_bytes = pointer_data.slice(start, start + size);
    const length_bytes = pointer_data.slice(start + size, start + size + size);

    const address = new DataView(
      address_bytes.buffer.slice(0, address_bytes.byteLength),
    ).getUint32(0, false);
    const length = new DataView(
      length_bytes.buffer.slice(0, length_bytes.byteLength),
    ).getUint32(0, false);

    const pointer: Pointer = {
      address: address,
      length: length,
    };
    table.pointers.push(pointer);

    count++;
  }
  return table;
}

interface Vars {
  count: number;
  vars: Var[];
}

interface Var {
  index: number;
  length: number;
  name: string;
}

/**
 * Get Variables in BOM file
 * @param data raw BOM bytes
 * @returns `Vars` interface or `MacosError`
 */
function getVars(data: Uint8Array): Vars | MacosError {
  const count = nomUnsignedFourBytes(data, Endian.Be);
  if (count instanceof NomError) {
    return new MacosError("BOM", `failed to parse vars count: ${count}`);
  }

  let var_count = 0;
  const vars: Vars = {
    count: count.value,
    vars: [],
  };

  let var_data = count.remaining;
  while (var_count < vars.count) {
    const index = nomUnsignedFourBytes(var_data, Endian.Be);
    if (index instanceof NomError) {
      return new MacosError("BOM", `failed to parse vars index: ${index}`);
    }

    const length = nomUnsignedOneBytes(index.remaining);
    if (length instanceof NomError) {
      return new MacosError("BOM", `failed to parse vars length: ${length}`);
    }

    const name_data = take(length.remaining, length.value);
    if (name_data instanceof NomError) {
      return new MacosError(
        "BOM",
        `failed to get vars name length: ${name_data}`,
      );
    }

    const name = extractUtf8String(name_data.nommed as Uint8Array);
    const var_entry: Var = {
      index: index.value,
      length: length.value,
      name,
    };

    vars.vars.push(var_entry);

    var_data = name_data.remaining as Uint8Array;
    var_count++;
  }

  return vars;
}

/**
 * Lookup block of data for BOM
 * @param data raw BOM bytes
 * @param index index to lookup in pointers
 * @param pointers Array of `Pointer`
 * @returns Block of bytes or `MacosError`
 */
function getBlock(
  data: Uint8Array,
  index: number,
  pointers: Pointer[],
): Uint8Array | MacosError {
  if (index > pointers.length) {
    return new MacosError("BOM", `index greater than pointers length`);
  }

  const pointer = pointers[ index ];
  if (pointer === undefined) {
    return new MacosError("BOM", `got undefined pointer`);
  }
  if (
    pointer.address > data.length ||
    pointer.address + pointer.length > data.length
  ) {
    return new MacosError("BOM", `pointer greater than data length`);
  }

  // Instead of using nom we just use slice to get the block data. Avoids having to send large amounts bytes to Rust
  const block_data = data.buffer.slice(
    pointer.address,
    pointer.address + pointer.length,
  );
  return new Uint8Array(block_data);
}

interface TreeEntry {
  sig: number;
  version: number;
  index: number;
  block_size: number;
  path_count: number;
  unknown: number;
}

/**
 * Parse BOM TreeEntry
 * @param data raw BOM bytes
 * @param index index to lookup in pointers
 * @param pointers Array of `Pointer`
 * @returns `TreeEntry` or `MacosError`
 */
function parseTreeEntry(
  data: Uint8Array,
  index: number,
  pointers: Pointer[],
): TreeEntry | MacosError {
  const tree_data = getBlock(data, index, pointers);
  if (tree_data instanceof MacosError) {
    return new MacosError("BOM", `failed to get tree entry data: ${tree_data}`);
  }

  const sig = nomUnsignedFourBytes(tree_data, Endian.Be);
  if (sig instanceof NomError) {
    return new MacosError("BOM", `failed to parse tree entry sig: ${sig}`);
  }

  const version = nomUnsignedFourBytes(sig.remaining, Endian.Be);
  if (version instanceof NomError) {
    return new MacosError(
      "BOM",
      `failed to parse tree entry version: ${version}`,
    );
  }

  const tree_index = nomUnsignedFourBytes(version.remaining, Endian.Be);
  if (tree_index instanceof NomError) {
    return new MacosError(
      "BOM",
      `failed to parse tree entry index: ${tree_index}`,
    );
  }

  const block_size = nomUnsignedFourBytes(tree_index.remaining, Endian.Be);
  if (block_size instanceof NomError) {
    return new MacosError(
      "BOM",
      `failed to parse tree entry block size: ${block_size}`,
    );
  }

  const path_count = nomUnsignedFourBytes(block_size.remaining, Endian.Be);
  if (path_count instanceof NomError) {
    return new MacosError(
      "BOM",
      `failed to parse tree entry path count: ${path_count}`,
    );
  }

  const unknown = nomUnsignedOneBytes(block_size.remaining);
  if (unknown instanceof NomError) {
    return new MacosError(
      "BOM",
      `failed to parse tree entry unknown: ${unknown}`,
    );
  }

  const tree_entry: TreeEntry = {
    sig: sig.value,
    version: version.value,
    index: tree_index.value,
    block_size: block_size.value,
    path_count: path_count.value,
    unknown: unknown.value,
  };

  return tree_entry;
}

interface Tree {
  is_leaf: boolean;
  count: number;
  forward: number;
  backward: number;
  list: TreeIndex[];
  data: Uint8Array;
}

interface Index {
  tree_index: TreeIndex;
  data: Uint8Array;
}

interface TreeIndex {
  value_index: number;
  key_index: number;
}

/**
 * Parse BOM Tree
 * @param data raw BOM bytes
 * @param index index to lookup in pointers
 * @param pointers Array of `Pointer`
 * @returns `Tree` or `MacosError`
 */
function parseTree(
  data: Uint8Array,
  index: number,
  pointers: Pointer[],
): Tree | MacosError {
  const tree_data = getBlock(data, index, pointers);
  if (tree_data instanceof MacosError) {
    return new MacosError("BOM", `failed to get tree data: ${tree_data}`);
  }

  const leaf = nomUnsignedTwoBytes(tree_data, Endian.Be);
  if (leaf instanceof NomError) {
    return new MacosError("BOM", `failed to parse tree leaf data: ${leaf}`);
  }

  const count = nomUnsignedTwoBytes(leaf.remaining, Endian.Be);
  if (count instanceof NomError) {
    return new MacosError("BOM", `failed to parse tree count data: ${count}`);
  }

  const forward = nomUnsignedFourBytes(count.remaining, Endian.Be);
  if (forward instanceof NomError) {
    return new MacosError(
      "BOM",
      `failed to parse tree forward data: ${forward}`,
    );
  }

  const backward = nomUnsignedFourBytes(forward.remaining, Endian.Be);
  if (backward instanceof NomError) {
    return new MacosError(
      "BOM",
      `failed to parse tree backward data: ${backward}`,
    );
  }

  const tree: Tree = {
    is_leaf: !!leaf.value,
    count: count.value,
    forward: forward.value,
    backward: backward.value,
    list: [],
    data: backward.remaining,
  };

  return tree;
}

/**
 * Parse BOM Tree Index data
 * @param data raw BOM bytes
 * @returns `Index` or `MacosError`
 */
function parseTreeIndex(data: Uint8Array): Index | MacosError {
  const value_index = nomUnsignedFourBytes(data, Endian.Be);
  if (value_index instanceof NomError) {
    return new MacosError(
      "BOM",
      `failed to parse tree value index: ${value_index}`,
    );
  }

  const key_index = nomUnsignedFourBytes(value_index.remaining, Endian.Be);
  if (key_index instanceof NomError) {
    return new MacosError(
      "BOM",
      `failed to parse tree key index: ${key_index}`,
    );
  }

  const tree_index: TreeIndex = {
    value_index: value_index.value,
    key_index: key_index.value,
  };

  const index: Index = {
    tree_index,
    data: key_index.remaining,
  };

  return index;
}

interface BomFile {
  parent: number;
  name: string;
}

/**
 * Get BOM File info
 * @param data raw BOM bytes
 * @returns `BomFile` or `MacosError`
 */
function getFile(data: Uint8Array): BomFile | MacosError {
  const parent = nomUnsignedFourBytes(data, Endian.Be);
  if (parent instanceof NomError) {
    return new MacosError("BOM", `failed to parse bom file parent: ${parent}`);
  }

  const name = extractUtf8String(parent.remaining);
  const bom_file: BomFile = {
    parent: parent.value,
    name,
  };

  return bom_file;
}

interface Path {
  id: number;
  index: number;
}

/**
 * Get BOM Path
 * @param data raw BOM bytes
 * @returns `Path` or `MacosError`
 */
function getPath(data: Uint8Array): Path | MacosError {
  const id = nomUnsignedFourBytes(data, Endian.Be);
  if (id instanceof NomError) {
    return new MacosError("BOM", `failed to parse path id: ${id}`);
  }

  const index = nomUnsignedFourBytes(id.remaining, Endian.Be);
  if (index instanceof NomError) {
    return new MacosError("BOM", `failed to parse path index: ${index}`);
  }

  const path: Path = {
    id: id.value,
    index: index.value,
  };

  return path;
}

interface PathInfo {
  type: PathType;
  architecture: number;
  mode: number;
  user: number;
  group: number;
  modified: number;
  size: number;
  checksum: string;
  dev_type: number;
  link_name: string;
  parent: number;
}

enum PathType {
  FILE = "FILE",
  DIR = "DIRECTORY",
  LINK = "LINK",
  DEV = "DEV",
  UNKNOWN = "UNKNOWN",
}

/**
 * Parse BOM PathInfo
 * @param data raw BOM bytes
 * @param index index to lookup in pointers
 * @param pointers Array of `Pointer`
 * @returns `PathInfo` or `MacosError`
 */
function getPathInfo(
  data: Uint8Array,
  index: number,
  pointers: Pointer[],
): PathInfo | MacosError {
  const path_data = getBlock(data, index, pointers);
  if (path_data instanceof MacosError) {
    return new MacosError("BOM", `failed to get path data: ${path_data}`);
  }

  const type_data = nomUnsignedOneBytes(path_data);
  if (type_data instanceof NomError) {
    return new MacosError("BOM", `failed to parse path type: ${type_data}`);
  }

  const file_type = getType(type_data.value);

  const unknown = nomUnsignedOneBytes(type_data.remaining);
  if (unknown instanceof NomError) {
    return new MacosError("BOM", `failed to parse path unknown: ${unknown}`);
  }

  const arch = nomUnsignedTwoBytes(unknown.remaining, Endian.Be);
  if (arch instanceof NomError) {
    return new MacosError("BOM", `failed to parse path arch: ${arch}`);
  }

  const mode = nomUnsignedTwoBytes(arch.remaining, Endian.Be);
  if (mode instanceof NomError) {
    return new MacosError("BOM", `failed to parse path mode: ${mode}`);
  }

  const user = nomUnsignedFourBytes(mode.remaining, Endian.Be);
  if (user instanceof NomError) {
    return new MacosError("BOM", `failed to parse path user: ${user}`);
  }

  const group = nomUnsignedFourBytes(user.remaining, Endian.Be);
  if (group instanceof NomError) {
    return new MacosError("BOM", `failed to parse path group: ${group}`);
  }

  const modified = nomUnsignedFourBytes(group.remaining, Endian.Be);
  if (modified instanceof NomError) {
    return new MacosError("BOM", `failed to parse path modified: ${modified}`);
  }

  const size = nomUnsignedFourBytes(modified.remaining, Endian.Be);
  if (size instanceof NomError) {
    return new MacosError("BOM", `failed to parse path size: ${size}`);
  }

  const unknown2 = nomUnsignedOneBytes(size.remaining);
  if (unknown2 instanceof NomError) {
    return new MacosError("BOM", `failed to parse path unknown2: ${unknown2}`);
  }

  const path: PathInfo = {
    type: file_type,
    architecture: arch.value,
    mode: mode.value,
    user: user.value,
    group: group.value,
    modified: modified.value,
    size: size.value,
    checksum: "",
    dev_type: 0,
    link_name: "",
    parent: 0,
  };

  if (file_type === PathType.DIR || file_type === PathType.DEV) {
    return path;
  }

  const checksum = nomUnsignedFourBytes(unknown2.remaining, Endian.Be);
  if (checksum instanceof NomError) {
    return new MacosError("BOM", `failed to parse path checksum: ${checksum}`);
  }

  const dev_type = nomUnsignedFourBytes(checksum.remaining, Endian.Be);
  if (dev_type instanceof NomError) {
    return new MacosError("BOM", `failed to parse path dev type: ${dev_type}`);
  }

  path.checksum = checksum.value.toString();
  path.dev_type = dev_type.value;

  if (file_type !== PathType.LINK) {
    return path;
  }

  return path;
}

/**
 * Lookup file type
 * @param data Type of file
 * @returns `PathType`
 */
function getType(data: number): PathType {
  switch (data) {
    case 1:
      return PathType.FILE;
    case 2:
      return PathType.DIR;
    case 3:
      return PathType.LINK;
    case 4:
      return PathType.DEV;
    default:
      return PathType.UNKNOWN;
  }
}

interface BomData {
  bom_file: BomFile;
  bom_info: PathInfo;
}

/**
 * Assemble the file paths described in the BOM file
 * @param files Hashmap of `BomData`
 * @returns Array of `Bom`
 */
function assembleBom(files: Map<number, BomData>): BomFiles[] {
  const boms: BomFiles[] = [];
  const root = 0;

  for (const [ key, value ] of files) {
    // Root directory
    if (key === root) {
      continue;
    }

    let parent = value.bom_file.parent;
    let paths: string[] = [];
    while (parent !== root) {
      const parent_path = files.get(parent);
      if (parent_path === undefined) {
        break;
      }
      paths.push(parent_path.bom_file.name);
      parent = parent_path.bom_info.parent;
    }
    paths = paths.reverse();
    paths.push(value.bom_file.name);

    const bom: BomFiles = {
      uid: value.bom_info.user,
      gid: value.bom_info.group,
      mode: value.bom_info.mode,
      size: value.bom_info.size,
      path: paths.join("/"),
      modified: unixEpochToISO(value.bom_info.modified),
      checksum: value.bom_info.checksum,
    };
    boms.push(bom);
  }

  return boms;
}
