import { OneDriveLog } from "../../../types/applications/onedrive.ts";
import { decompress_gzip } from "../../compression/decompress.ts";
import { CompressionError } from "../../compression/errors.ts";
import { encode } from "../../encoding/base64.ts";
import { extractUtf8String } from "../../encoding/strings.ts";
import { NomError } from "../../nom/error.ts";
import { Endian } from "../../nom/helpers.ts";
import {
  nomUnsignedEightBytes,
  nomUnsignedFourBytes,
  take,
} from "../../nom/mod.ts";
import { unixEpochToISO } from "../../time/conversion.ts";
import { ApplicationError } from "../errors.ts";

export function parseOdl(
  data: Uint8Array,
  path: string,
  filename: string,
): OneDriveLog[] | ApplicationError {
  const sig = nomUnsignedFourBytes(data, Endian.Be);
  if (sig instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse header ${sig.message}`,
    );
  }

  const log_version = nomUnsignedFourBytes(sig.remaining, Endian.Be);
  if (log_version instanceof NomError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to parse version ${log_version.message}`,
    );
  }

  const unknown_size = 20;
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
  const entries = [];
  const min_size = 32;
  while (data.length > min_size) {
    const sig = nomUnsignedEightBytes(data, Endian.Le);
    if (sig instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to get odl entry signature: ${sig.message}`,
      );
    }

    const timestamp = nomUnsignedEightBytes(sig.remaining, Endian.Le);
    if (timestamp instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to get odl entry timestamp: ${timestamp.message}`,
      );
    }

    const unknown = nomUnsignedEightBytes(timestamp.remaining, Endian.Le);
    if (unknown instanceof NomError) {
      return new ApplicationError(
        `ONEDRIVE`,
        `failed to parse odl entry unknown: ${unknown.message}`,
      );
    }

    const data_len = nomUnsignedFourBytes(unknown.remaining, Endian.Le);
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

    const entry = parseData(entry_data.nommed as Uint8Array);
    if (entry instanceof ApplicationError) {
      console.warn(entry);
      continue;
    }

    entry.created = unixEpochToISO(timestamp.value);
    entry.version = version;
    entry.os_version = os_version;
    entry.filename = filename;
    entry.path = path;
    entries.push(entry);
  }

  return entries;
}

function parseData(data: Uint8Array): OneDriveLog | ApplicationError {
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

  const file_len = nomUnsignedFourBytes(unknown.remaining, Endian.Le);
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
  };

  return entry;
}
