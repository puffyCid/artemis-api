import { readFile } from "../../../mod";
import { OneDriveLog } from "../../../types/applications/onedrive";
import { decompress_gzip } from "../../compression/decompress";
import { CompressionError } from "../../compression/errors";
import { encode } from "../../encoding/base64";
import { extractUtf8String } from "../../encoding/strings";
import { FileError } from "../../filesystem/errors";
import { NomError } from "../../nom/error";
import {
  Endian,
  nomUnsignedOneBytes,
  nomUnsignedTwoBytes,
} from "../../nom/helpers";
import {
  nomUnsignedEightBytes,
  nomUnsignedFourBytes,
  take,
} from "../../nom/mod";
import { unixEpochToISO } from "../../time/conversion";
import { ApplicationError } from "../errors";


/**
 * Function to read and parse OneDrive Log files
 * @param paths Array of `GlobInfo` to OneDrive Log files (odl)
 * @returns Array of `OneDriveLog` entries
 */
export function readOdlFiles(path: string): OneDriveLog[] | ApplicationError {
  const data = readFile(path);
  if (data instanceof FileError) {
    return new ApplicationError(`ONEDRIVE`, `could not read log ${path}: ${data.message}`);
  }
  let filename = "";
  if (path.includes("\\")) {
    filename = path.split("\\").pop() ?? "";
  } else {
    filename = path.split("/").pop() ?? "";
  }

  const logs = parseOdl(data, path, filename);
  if (logs instanceof ApplicationError) {
    return new ApplicationError(`ONEDRIVE`, `Failed to parse ${path}: ${logs.message}`);

  }
  return logs;
}

function parseOdl(
  data: Uint8Array,
  path: string,
  filename: string,
): OneDriveLog[] | ApplicationError {
  const sig = nomUnsignedEightBytes(data, Endian.Be);
  if (sig instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse header ${sig.message}`,
    );
  }

  const log_version = nomUnsignedFourBytes(sig.remaining, Endian.Le);
  if (log_version instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse version ${log_version.message}`,
    );
  }

  const version_support = 3;
  if (log_version.value !== version_support) {
    console.warn(
      `Got version ${log_version.value} for ${path}. Only version ${version_support} supported`,
    );
    return [];
  }

  const unknown_size = 16;
  const unknown = take(log_version.remaining, unknown_size);
  if (unknown instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse unknown data ${unknown.message}`,
    );
  }

  const version_size = 64;
  const version = take(unknown.remaining, version_size);
  if (version instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse version data ${version.message}`,
    );
  }

  const os_version = take(version.remaining, version_size);
  if (os_version instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse version os ${os_version.message}`,
    );
  }

  const reserved = 100;
  const compressed_data = take(os_version.remaining, reserved);
  if (compressed_data instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse reserved ${compressed_data.message}`,
    );
  }

  const gzip_key = [31, 139, 8, 0];
  if (
    Array.from(compressed_data.remaining.slice(0, 4) as Uint8Array)
      .toString() === gzip_key.toString()
  ) {
    const decom_data = decompress_gzip(
      compressed_data.remaining as Uint8Array,
    );
    if (decom_data instanceof CompressionError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to decompress data ${decom_data.message}`,
      );
    }
    return odl_entry(
      decom_data,
      extractUtf8String(version.nommed as Uint8Array),
      extractUtf8String(os_version.nommed as Uint8Array),
      path,
      filename,
    );
  }

  return odl_entry(
    compressed_data.remaining as Uint8Array,
    extractUtf8String(version.nommed as Uint8Array),
    extractUtf8String(os_version.nommed as Uint8Array),
    path,
    filename,
  );
}

function odl_entry(
  data: Uint8Array,
  version: string,
  os_version: string,
  path: string,
  filename: string,
): OneDriveLog[] | ApplicationError {
  const entries: OneDriveLog[] = [];
  const min_size = 32;
  while (data.length > min_size) {
    const sig = nomUnsignedFourBytes(data, Endian.Le);
    if (sig instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to get odl entry signature: ${sig.message}`,
      );
    }

    const desc_size = nomUnsignedTwoBytes(sig.remaining, Endian.Le);
    if (desc_size instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to get odl entry des size: ${desc_size.message}`,
      );
    }

    const unknown = nomUnsignedTwoBytes(desc_size.remaining, Endian.Le);
    if (unknown instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to get odl entry unknown: ${unknown.message}`,
      );
    }

    const timestamp = nomUnsignedEightBytes(unknown.remaining, Endian.Le);
    if (timestamp instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to get odl entry timestamp: ${timestamp.message}`,
      );
    }

    const unknown_flag = nomUnsignedFourBytes(timestamp.remaining, Endian.Le);
    if (unknown_flag instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to parse odl entry unknown flag: ${unknown_flag.message}`,
      );
    }

    const unknown_flag2 = nomUnsignedFourBytes(
      unknown_flag.remaining,
      Endian.Le,
    );
    if (unknown_flag2 instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to parse odl entry unknown flag 2: ${unknown_flag2.message}`,
      );
    }

    const data_len = nomUnsignedFourBytes(unknown_flag2.remaining, Endian.Le);
    if (data_len instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to parse odl entry data len: ${data_len.message}`,
      );
    }

    const unknown2 = nomUnsignedFourBytes(data_len.remaining, Endian.Le);
    if (unknown2 instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to parse odl entry unknown2: ${unknown2.message}`,
      );
    }

    const entry_data = take(unknown2.remaining, data_len.value);
    if (entry_data instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to parse odl entry data: ${entry_data.message}`,
      );
    }

    data = entry_data.remaining as Uint8Array;

    const entry = parseData(entry_data.nommed as Uint8Array, desc_size.value);
    if (entry instanceof ApplicationError) {
      console.warn(entry);
      continue;
    }

    entry.created = unixEpochToISO(timestamp.value);
    entry.datetime = entry.created;
    entry.version = version;
    entry.os_version = os_version;
    entry.filename = filename;
    entry.path = path;
    entries.push(entry);
  }

  return entries;
}

function parseData(
  data: Uint8Array,
  desc_size: number,
): OneDriveLog | ApplicationError {
  let description = "";
  if (desc_size) {
    const desc_values = parseDescription(data);
    if (desc_values instanceof ApplicationError) {
      return desc_values;
    }
    data = desc_values.remaining;
    description = desc_values.desc;
  } else {
    const size = 16;
    const guid = take(data, size);
    if (guid instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to parse odl data guid: ${guid.message}`,
      );
    }

    const unknown = nomUnsignedEightBytes(
      guid.remaining as Uint8Array,
      Endian.Le,
    );
    if (unknown instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to parse odl data unknown: ${unknown.message}`,
      );
    }

    data = unknown.remaining;
  }

  const file_len = nomUnsignedFourBytes(data, Endian.Le);
  if (file_len instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse odl file length: ${file_len.message}`,
    );
  }

  const filename_bytes = take(file_len.remaining, file_len.value);
  if (filename_bytes instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse odl filename: ${filename_bytes.message}`,
    );
  }

  const code_file = extractUtf8String(filename_bytes.nommed as Uint8Array);

  const flags = nomUnsignedFourBytes(
    filename_bytes.remaining as Uint8Array,
    Endian.Le,
  );
  if (flags instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse odl flags: ${flags.message}`,
    );
  }

  const function_len = nomUnsignedFourBytes(flags.remaining, Endian.Le);
  if (function_len instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse odl function length: ${function_len.message}`,
    );
  }

  const function_bytes = take(function_len.remaining, function_len.value);
  if (function_bytes instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse odl function: ${function_bytes.message}`,
    );
  }

  const function_value = extractUtf8String(
    function_bytes.nommed as Uint8Array,
  );

  const entry: OneDriveLog = {
    path: "",
    filename: "",
    created: "",
    code_file,
    function: function_value,
    flags: flags.value,
    params: encode(function_bytes.remaining as Uint8Array),
    version: "",
    os_version: "",
    description,
    message: `${code_file}: ${function_value}`,
    datetime: "",
    timestamp_desc: "OneDrive Log Entry Created",
    artifact: "OneDrive Log",
    data_type: "applications:onedrive:logs:entry"
  };

  return entry;
}

interface DescriptionData {
  desc: string;
  remaining: Uint8Array;
}

/**
 * Function to extract description info from ODL files
 * @param data Description data
 * @returns `Description` object which contains description string and remaining bytes
 */
function parseDescription(
  data: Uint8Array,
): DescriptionData | ApplicationError {
  const count = nomUnsignedOneBytes(data);
  if (count instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse description count: ${count.message}`,
    );
  }

  const desc_size = nomUnsignedTwoBytes(count.remaining, Endian.Le);
  if (desc_size instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse description size: ${desc_size.message}`,
    );
  }

  const desc = take(desc_size.remaining, desc_size.value);
  if (desc instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse description: ${desc.message}`,
    );
  }

  let value_count = 0;
  let remaining = desc.remaining as Uint8Array;
  let values = "";
  while (value_count < count.value) {
    const size = nomUnsignedOneBytes(remaining);
    if (size instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to parse description extra size: ${size.message}`,
      );
    }
    const flag = nomUnsignedOneBytes(size.remaining);
    if (flag instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to parse description extra flag: ${flag.message}`,
      );
    }

    const extra = take(flag.remaining, size.value);
    if (extra instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to parse description extra string: ${extra.message}`,
      );
    }
    remaining = extra.remaining as Uint8Array;

    values += `${extractUtf8String(extra.nommed as Uint8Array)};`;
    value_count++;
  }

  return {
    desc: `${extractUtf8String(desc.nommed as Uint8Array)}: ${values}`,
    remaining,
  };
}

/**
 * Function to test the OneDrive ODL file parsing
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the OneDrive ODL parsing
 */
export function testReadOdlFiles(): void {
  const test = "../../tests/test_data/DFIRArtifactMuseum/onedrive/24.175.0830.0001/logs/Personal/SyncEngine-2024-09-23.1348.7960.2.odlgz";
  let results = readOdlFiles(test);
  if (results instanceof ApplicationError) {
    throw results;
  }

  if (results.length !== 4910) {
    throw `Got "${results.length}" expected 4910.......readOdlFiles ❌`
  }

  if (results[23]?.message !== "LoggingAPI.cpp: LoggingSetCommonDatapoint") {
    throw `Got '${results[23]?.message}' expected "LoggingAPI.cpp: LoggingSetCommonDatapoint".......readOdlFiles ❌`
  }

  console.info(`  Function readOdlFiles ✅`);

  const data = readFile(test);
  if (data instanceof FileError) {
    throw data;
  }

  results = parseOdl(data, "anything", "i want");
  if (results instanceof ApplicationError) {
    throw results;
  }

  if (results.length !== 4910) {
    throw `Got "${results.length}" expected 4910.......parseOdl ❌`
  }

  if (results[83]?.message !== "BaseHost.cpp: BaseHost::Initialize") {
    throw `Got '${results[83]?.message}' expected "BaseHost.cpp: BaseHost::Initialize".......parseOdl ❌`
  }

  console.info(`  Function parseOdl ✅`);

  const decom_test = "../../tests/test_data/DFIRArtifactMuseum/onedrive/24.175.0830.0001/decom_data.raw";
  const decom_data = readFile(decom_test);
  if (decom_data instanceof FileError) {
    throw data;
  }

  results = odl_entry(decom_data, "anything", "i want", "totally real path", "super file");
  if (results instanceof ApplicationError) {
    throw results;
  }

  if (results[390]?.datetime !== "2024-09-23T13:48:25.571Z") {
    throw `Got '${results[390]?.datetime}' expected "2024-09-23T13:48:25.571Z".......odl_entry ❌`
  }
  console.info(`  Function odl_entry ✅`);


  let desc_data = [190, 3, 59, 127, 95, 139, 9, 68, 159, 205, 101, 6, 103, 167, 150, 69, 224, 251, 193, 2, 1, 0, 0, 0, 14, 0, 0, 0, 76, 111, 103, 103, 105, 110, 103, 65, 80, 73, 46, 99, 112, 112, 36, 6, 0, 0, 30, 0, 0, 0, 85, 112, 100, 97, 116, 101, 79, 98, 102, 117, 115, 99, 97, 116, 105, 111, 110, 69, 110, 99, 114, 121, 112, 116, 105, 111, 110, 75, 101, 121, 14, 0, 0, 0, 76, 111, 103, 79, 98, 102, 117, 115, 99, 97, 116, 105, 111, 110, 22, 0, 0, 0, 82, 101, 116, 114, 105, 101, 118, 101, 79, 98, 102, 117, 115, 99, 97, 116, 105, 111, 110, 75, 101, 121, 7, 0, 0, 0, 83, 117, 99, 99, 101, 115, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const entry = parseData(new Uint8Array(desc_data), 0);
  if (entry instanceof ApplicationError) {
    throw entry;
  }

  if (entry.code_file !== "LoggingAPI.cpp") {
    throw `Got '${entry.code_file}' expected "LoggingAPI.cpp".......parseData ❌`
  }
  if (entry.params !== "DgAAAExvZ09iZnVzY2F0aW9uFgAAAFJldHJpZXZlT2JmdXNjYXRpb25LZXkHAAAAU3VjY2VzcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==") {
    throw `Got '${entry.params}' expected "DgAAAExvZ09iZnVzY2F0aW9uFgAAAFJldHJpZXZlT2JmdXNjYXRpb25LZXkHAAAAU3VjY2VzcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==".......parseData ❌`
  }
  console.info(`  Function parseData ✅`);


  desc_data = [1, 37, 0, 85, 110, 114, 101, 103, 105, 115, 116, 101, 114, 105, 110, 103, 32, 79, 110, 101, 68, 114, 105, 118, 101, 32, 110, 97, 109, 101, 115, 112, 97, 99, 101, 32, 114, 111, 111, 116, 15, 115, 110, 97, 109, 101, 115, 112, 97, 99, 101, 82, 111, 111, 116, 73, 100, 21, 0, 0, 0, 78, 97, 109, 101, 115, 112, 97, 99, 101, 82, 111, 111, 116, 85, 116, 105, 108, 46, 99, 112, 112, 87, 1, 0, 0, 50, 0, 0, 0, 78, 97, 109, 101, 115, 112, 97, 99, 101, 82, 111, 111, 116, 85, 116, 105, 108, 58, 58, 85, 110, 114, 101, 103, 105, 115, 116, 101, 114, 79, 110, 101, 68, 114, 105, 118, 101, 78, 97, 109, 101, 115, 112, 97, 99, 101, 82, 111, 111, 116, 38, 0, 0, 0, 123, 48, 49, 56, 68, 53, 67, 54, 54, 45, 52, 53, 51, 51, 45, 52, 51, 48, 55, 45, 57, 66, 53, 51, 45, 50, 50, 52, 68, 69, 50, 69, 68, 49, 70, 69, 54, 125];
  const desc = parseDescription(new Uint8Array(desc_data));
  if (desc instanceof ApplicationError) {
    throw desc;
  }

  if (desc.desc !== "Unregistering OneDrive namespace root: namespaceRootId;") {
    throw `Got '${desc.desc}' expected "Unregistering OneDrive namespace root: namespaceRootId;".......parseDescription ❌`
  }
  console.info(`  Function parseDescription ✅`);
}