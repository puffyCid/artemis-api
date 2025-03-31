import { LinuxError } from "./errors";
import { RpmPackages } from "../../types/linux/rpm";
import { querySqlite } from "../applications/sqlite";
import { ApplicationError } from "../applications/errors";
import { decode, encode } from "../encoding/base64";
import { EncodingError } from "../encoding/errors";
import { NomError } from "../nom/error";
import { extractUtf8String } from "../encoding/strings";
import {
  Endian,
  nomSignedFourBytes,
  nomUnsignedFourBytes,
  nomUnsignedOneBytes,
} from "../nom/helpers";
import { takeUntil } from "../nom/parsers";
import { unixEpochToISO } from "../time/conversion";

/**
 * Function to get installed RPM packages. This function only supports getting packages from the sqlite database. The historical Berkley database is not supported.
 * @param offset What offset to start the query at
 * @param limit How many packages to return
 * @param alt_path Optional path to the RPM sqlite database. Will default to `/var/lib/rpm/rpmdb.sqlite`
 * @returns Array of `RpmPackages` or `LinuxError`
 */
export function getRpmInfo(
  offset: number,
  limit: number,
  alt_path?: string,
): RpmPackages[] | LinuxError {
  const query = `SELECT * FROM Packages LIMIT ${limit} OFFSET ${offset}`;
  let path = "/var/lib/rpm/rpmdb.sqlite";
  if (alt_path != undefined) {
    path = alt_path;
  }

  const results = querySqlite(path, query);
  if (results instanceof ApplicationError) {
    return new LinuxError(
      `RPMPACKAGES`,
      `failed to query RPM DB ${results}`,
    );
  }

  const rpm_entries: RpmPackages[] = [];

  for (const entry of results) {
    // Packages are base64 encoded binary blobs that need to be parsed
    const raw_bytes = decode(entry["blob"] as string);
    if (raw_bytes instanceof EncodingError) {
      console.error(`Could not base64 decode RPM binary date: ${raw_bytes}`);
      continue;
    }

    const header = parseHeader(raw_bytes);
    if (header instanceof LinuxError) {
      console.error(`Could not parse RPM header: ${header}`);
      continue;
    }

    const rpm_tags = parseTags(raw_bytes, header);
    if (rpm_tags instanceof LinuxError) {
      continue;
    }

    const rpm: RpmPackages = {
      name: "",
      version: "",
      release: "",
      source: "",
      size: 0,
      sha1: "",
      arch: "",
      install_time: "",
      vendor: "",
      package_group: "",
      summary: "",
      url: "",
    };

    // Extract the tag values
    for (const value in rpm_tags) {
      switch (value) {
        case `${TagName.Name}`: {
          rpm.name = (rpm_tags[value] as string[]).at(0) ?? "";
          break;
        }
        case `${TagName.Version}`: {
          rpm.version = (rpm_tags[value] as string[]).at(0) ?? "";
          break;
        }
        case `${TagName.Release}`: {
          rpm.release = (rpm_tags[value] as string[]).at(0) ?? "";
          break;
        }
        case `${TagName.SourceRpm}`: {
          rpm.source = (rpm_tags[value] as string[]).at(0) ?? "";
          break;
        }
        case `${TagName.Size}`: {
          rpm.size = (rpm_tags[value] as number[]).at(0) ?? 0;
          break;
        }
        case `${TagName.Sha1Header}`: {
          rpm.sha1 = (rpm_tags[value] as string[]).at(0) ?? "";
          break;
        }
        case `${TagName.Arch}`: {
          rpm.arch = (rpm_tags[value] as string[]).at(0) ?? "";
          break;
        }
        case `${TagName.InstallTime}`: {
          rpm.install_time = unixEpochToISO(
            (rpm_tags[value] as number[]).at(0) ?? 0,
          );
          break;
        }
        case `${TagName.Vendor}`: {
          rpm.vendor = (rpm_tags[value] as string[]).at(0) ?? "";
          break;
        }
        case `${TagName.Group}`: {
          rpm.package_group = (rpm_tags[value] as string[]).at(0) ?? "";
          break;
        }
        case `${TagName.Summary}`: {
          rpm.summary = (rpm_tags[value] as string[]).at(0) ?? "";
          break;
        }
        case `${TagName.Url}`: {
          rpm.url = (rpm_tags[value] as string[]).at(0) ?? "";
          break;
        }
      }
    }

    rpm_entries.push(rpm);
  }

  return rpm_entries;
}

interface HeaderInfo {
  entries: Entry[];
  il: number;
  dl: number;
  data_start: number;
  data_end: number;
  region_tag: number;
  ril: number;
  rdl: number;
}

enum TagType {
  Null = 0,
  Char = 1,
  Int8 = 2,
  Int16 = 3,
  Int32 = 4,
  Int64 = 5,
  String = 6,
  Bin = 7,
  StringArray = 8,
  I18nString = 9,
}

/**
 * References:
 * - https://github.com/yybit/rpmdb-rs
 * - https://github.com/knqyf263/go-rpmdb
 * - https://refspecs.linuxfoundation.org/LSB_5.0.0/LSB-Core-generic/LSB-Core-generic/pkgformat.html
 * - all tags - https://github.com/rpm-software-management/rpm/blob/rpm-4.14.3-release/lib/rpmtag.h
 */
enum TagName {
  Name = 1000,
  Version = 1001,
  Release = 1002,
  Epoch = 1003,
  Summary = 1004,
  Description = 1005,
  InstallTime = 1008,
  Size = 1009,
  Distribution = 1010,
  Vendor = 1011,
  License = 1014,
  Packager = 1015,
  Group = 1016,
  Url = 1020,
  Os = 1021,
  Arch = 1022,
  FileSizes = 1028,
  FileModes = 1030,
  FileDigests = 1035,
  FileFlags = 1037,
  FileGroupName = 1040,
  SourceRpm = 1044,
  ArchiveSize = 1046,
  ProvideName = 1047,
  RequireName = 1049,
  RpmVersion = 1064,
  DirIndexes = 1116,
  BaseNames = 1117,
  DirNames = 1118,
  DistUrl = 1023,
  PayloadCompressor = 1125,
  PayloadFlags = 1026,

  //Private Tag values. All optional
  HeaderImutable = 63,
  I18nTable = 100,
  HeaderSig = 62,

  // Install Tag values. All optional
  PreIn = 1023,
  PostIn = 1024,
  PreUn = 1025,
  PostUn = 1026,
  PreInProg = 1085,
  PostInProg = 1086,
  PreUnProg = 1087,
  PostUnProg = 1088,

  // File Tag values
  OldFileNames = 1027,
  FileRdevs = 1033,
  FileModifiedTime = 1034,
  FileMD5s = 1035,
  FileLinkToS = 1036,
  FileUsername = 1039,
  FileDevices = 1042,
  FileInodes = 1096,
  FileLangs = 1097,

  // Dependency Tag values
  RequireFlags = 1048,
  RequireVersion = 1050,
  ConflictFlags = 1053,
  ConflictName = 1054,
  ConflictVersion = 1055,
  ObsoleteName = 1090,
  ProvideFlags = 1112,
  ProvideVersion = 1113,
  ObsoleteFlags = 1114,
  ObsoleteVersion = 1115,

  // Other Tag values
  BuildTime = 1006,
  BuildHost = 1007,
  FileVerifyFlags = 1045,
  ChangelogTime = 1080,
  ChangelogText = 1082,
  OptFlags = 1122,
  RhnPlatform = 1131,
  Platform = 1132,
  PayloadDigestAlgo = 5093,
  PayloadDigest = 5092,
  FileDigestAlgo = 5011,
  BugUrl = 5012,
  Encoding = 5062,
  FileSignatures = 5090,
  InstallColor = 1127,

  // Sig Tag  values
  SigBase = 256,
  SigSize = 257,
  SigLeMD5 = 259,
  SigMd5 = 261,
  RsaHeader = 268,
  Sha1Header = 269,
  Sha256Header = 273,

  // Undocumented. Seen been unsure what they are
  /**Some kind of hash? */
  Unknown = 5097,
}

interface Entry {
  tag: TagName;
  offset: number;
  entry_type: TagType;
  count: number;
}

/**
 * Function to parse the header of the extract package blob
 * @param data Raw bytes from the package table
 * @returns `HeaderInfo` or `LinuxError`
 */
function parseHeader(data: Uint8Array): HeaderInfo | LinuxError {
  const il_data = nomSignedFourBytes(data, Endian.Be);
  if (il_data instanceof NomError) {
    return new LinuxError(`RPMPACKAGES`, `failed to get il value: ${il_data}`);
  }
  const il = il_data.value;
  if (il < 1) {
    return new LinuxError(
      `RPMPACKAGES`,
      `il value is less than 1. There is no data to parse`,
    );
  }

  const dl_data = nomSignedFourBytes(il_data.remaining, Endian.Be);
  if (dl_data instanceof NomError) {
    return new LinuxError(`RPMPACKAGES`, `failed to get dl value: ${il_data}`);
  }

  const dl = dl_data.value;
  const entry_size = 16;
  const size = 4;

  const data_start = size + size + il * entry_size;
  const data_end = data_start + dl;

  let count = 0;
  const entries: Entry[] = [];

  let entry_data = dl_data.remaining;
  while (count < il) {
    count++;
    const entry = getEntries(entry_data);
    if (entry instanceof LinuxError) {
      continue;
    }
    entries.push(entry.entry);
    entry_data = entry.data;
  }

  const header: HeaderInfo = {
    entries,
    il,
    dl,
    data_start,
    data_end,
    region_tag: 0,
    ril: 0,
    rdl: 0,
  };

  return header;
}

interface EntryData {
  entry: Entry;
  data: Uint8Array;
}

/**
 * Function to get the metadata associated with the RPM data
 * @param data Raw bytes from the package table
 * @returns `EntryData` or `LinuxError`
 */
function getEntries(data: Uint8Array): EntryData | LinuxError {
  const tag_data = nomSignedFourBytes(data, Endian.Be);
  if (tag_data instanceof NomError) {
    return new LinuxError(`RPMPACKAGES`, `failed to get tag data: ${tag_data}`);
  }
  const tag = tag_data.value;

  const entry_type_data = nomUnsignedFourBytes(tag_data.remaining, Endian.Be);
  if (entry_type_data instanceof NomError) {
    return new LinuxError(
      `RPMPACKAGES`,
      `failed to get entry type data: ${entry_type_data}`,
    );
  }
  const entry_type = entry_type_data.value;

  const offset_data = nomSignedFourBytes(entry_type_data.remaining, Endian.Be);
  if (offset_data instanceof NomError) {
    return new LinuxError(
      `RPMPACKAGES`,
      `failed to get offset data: ${tag_data}`,
    );
  }
  const offset = offset_data.value;

  const count_data = nomSignedFourBytes(offset_data.remaining, Endian.Be);
  if (count_data instanceof NomError) {
    return new LinuxError(
      `RPMPACKAGES`,
      `failed to get count data: ${count_data}`,
    );
  }
  const count = count_data.value;

  const entry: Entry = {
    tag,
    offset,
    entry_type,
    count,
  };

  const entry_data: EntryData = {
    entry,
    data: count_data.remaining,
  };

  return entry_data;
}

/**
 * Function to parse the Tags associated with the RPM data
 * @param data Raw bytes from the package table
 * @param header Heade info from `parseHeader`
 * @returns `Record<number, string[] | number[] | bigint[]>` or `LinuxError`
 */
function parseTags(
  data: Uint8Array,
  header: HeaderInfo,
): Record<number, string[] | number[] | bigint[]> | LinuxError {
  // There are a massive amount of tags available we could get. Currently we only keep the tags below
  const tags_to_get = [
    TagName.Name,
    TagName.Arch,
    TagName.Version,
    TagName.Release,
    TagName.Size,
    TagName.Sha1Header,
    TagName.InstallTime,
    TagName.Group,
    TagName.Summary,
    TagName.SourceRpm,
    TagName.Url,
    TagName.Vendor,
  ];
  const tag_values: Record<
    number,
    string[] | number[] | bigint[]
  > = {};
  for (const entry of header.entries) {
    // Skip tags we do not want
    if (!tags_to_get.includes(entry.tag)) {
      continue;
    }
    const start = entry.offset + header.data_start;
    if (start > data.length) {
      return new LinuxError(
        `RPMPACKAGES`,
        `start offset greater than entire package data`,
      );
    }

    // Get the start of the index data
    const index_data = data.slice(start, start + data.length);
    const tag_value = extractTagValue(
      index_data,
      entry.entry_type,
      entry.count,
    );
    if (tag_value instanceof LinuxError) {
      continue;
    }

    tag_values[entry.tag] = tag_value;
  }

  return tag_values;
}

/**
 * Function to get the Tag values associated with the RPM data
 * @param data Raw bytes from the package table
 * @param tag_type The `TagType` associated with the metadata
 * @param count The number of times to get the Tag value (ex: count = 2, means there are 2 strings)
 * @returns `string[] | number[] | bigint[]` or `LinuxError`
 */
function extractTagValue(
  data: Uint8Array,
  tag_type: TagType,
  count: number,
): string[] | number[] | bigint[] | LinuxError {
  let count_value = 1;
  let tag_data = data;
  let values: any[] = [];

  if (data.length < count) {
    return new LinuxError(`RPMPACKAGES`, `count greater than remaining bytes`);
  }

  // To speed up parsing, we mainly use slices/buffers to parse the data
  switch (tag_type) {
    case TagType.Null:
      return [];
    case TagType.Char: {
      const value_data = tag_data.buffer.slice(0, count);
      values.push(
        extractUtf8String(new Uint8Array(value_data)),
      );
      return values;
    }
    case TagType.Int8: {
      const value_data = tag_data.buffer.slice(0, count);
      values = Array.from(new Uint8Array(value_data));
      return values;
    }
    case TagType.Int16: {
      const size = 2;
      let start = 0;
      while (count_value <= count) {
        const value_data = new DataView(
          tag_data.buffer.slice(start, count_value * size),
        ).getInt16(0, false);
        start += size;
        values.push(value_data);
        count_value++;
      }
      return values;
    }
    case TagType.Int32: {
      const size = 4;
      let start = 0;
      while (count_value <= count) {
        const value_data = new DataView(
          tag_data.buffer.slice(start, count_value * size),
        ).getInt32(0, false);
        start += size;
        values.push(value_data);
        count_value++;
      }
      return values;
    }
    case TagType.Int64: {
      const size = 8;
      let start = 0;
      while (count_value <= count) {
        const value_data = new DataView(
          tag_data.buffer.slice(start, count_value * size),
        ).getBigInt64(0, false);
        start += size;
        values.push(value_data);
        count_value++;
      }
      return values;
    }
    case TagType.StringArray:
    case TagType.I18nString:
    case TagType.String: {
      while (count_value <= count) {
        const value_data = takeUntil(tag_data, new Uint8Array([0]));
        if (value_data instanceof NomError) {
          console.error(`Could not nom string ${value_data}`);
          break;
        }
        values.push(extractUtf8String(value_data.nommed as Uint8Array));
        // Check if we reached end
        if (value_data.remaining.length === 0) {
          return values;
        }

        const eol = nomUnsignedOneBytes(value_data.remaining as Uint8Array);
        if (eol instanceof NomError) {
          console.error(`Could not nom end of line ${eol}`);
          break;
        }
        tag_data = eol.remaining;

        count_value++;
      }
      return values;
    }
    case TagType.Bin: {
      // For binary data, the count is actually the size of the data
      const value_data = tag_data.buffer.slice(0, count);
      values.push(encode(new Uint8Array(value_data)));
      return values;
    }
    default: {
      console.warn(`Unknown TagType ${tag_type} with count ${count}`);
      return [];
    }
  }
}
