import { Cookie, CookieFlag, SafariProfile } from "../../../types/macos/safari";
import { extractUtf8String } from "../../encoding/mod";
import { FileError } from "../../filesystem/errors";
import { readFile } from "../../filesystem/files";
import { NomError } from "../../nom/error";
import { Endian } from "../../nom/helpers";
import {
  nomUnsignedEightBytes,
  nomUnsignedFourBytes,
  take,
  takeUntil,
} from "../../nom/mod";
import { PlatformType } from "../../system/systeminfo";
import { cocoatimeToUnixEpoch, unixEpochToISO } from "../../time/conversion";
import { MacosError } from "../errors";

export function safariCookies(paths: SafariProfile[], platform: PlatformType): Cookie[] {
  let hits: Cookie[] = [];
  for (const path of paths) {
    let full_path = `${path.container_path}/Library/Cookies/Cookies.binarycookies`;
    if (platform === PlatformType.Windows) {
      full_path = `${path.container_path}\\Library/Cookies\\Cookies.binarycookies`;
    }

    const cookie = parseCookies(full_path);
    if (cookie instanceof MacosError) {
      console.warn(`failed to parse Safari cookie ${full_path}: ${cookie}`);
      continue;
    }

    cookie.forEach(x => x[ "version" ] = path.version);
    hits = hits.concat(cookie);

  }
  return hits;
}

/**
 * Function to parse the Safari binary cookie format
 * @param path Path to the binary cookie files
 * @returns Array of `Cookie` or `MacosError`
 */
export function parseCookies(path: string): Cookie[] | MacosError {
  const bytes = readFile(path);
  if (bytes instanceof FileError) {
    return new MacosError(
      `COOKIES`,
      `failed to read safari cookies at ${path}: ${bytes}`,
    );
  }

  const header = parseHeader(bytes);
  if (header instanceof NomError) {
    return new MacosError(
      `COOKIES`,
      `failed to read safari cookies header ${path}: ${header}`,
    );
  }

  const cook = 1802465123;
  if (header.sig !== cook) {
    return new MacosError(
      `COOKIES`,
      `got wrong safari cookies sig ${path}: ${header.sig}`,
    );
  }

  let cookies: Cookie[] = [];
  let remaining = header.remaining_bytes;
  for (let i = 0; i < header.pages_count; i++) {
    const page_size = header.page_sizes[ i ];
    if (page_size === undefined) {
      continue;
    }

    const page_bytes = take(remaining, page_size);
    if (page_bytes instanceof NomError) {
      continue;
    }
    remaining = page_bytes.remaining as Uint8Array;
    const cookie = parsePage(page_bytes.nommed as Uint8Array, page_size);
    if (cookie instanceof NomError) {
      return new MacosError(
        `COOKIES`,
        `failed to read safari cookies page ${path}: ${cookie}`,
      );
    }
    cookies = cookies.concat(cookie);
  }

  return cookies;
}

interface Header {
  sig: number;
  pages_count: number;
  page_sizes: number[];
  remaining_bytes: Uint8Array;
}

function parseHeader(data: Uint8Array): Header | NomError {
  let input = nomUnsignedFourBytes(data, Endian.Le);
  if (input instanceof NomError) {
    return input;
  }

  const sig = input.value;

  input = nomUnsignedFourBytes(input.remaining, Endian.Be);
  if (input instanceof NomError) {
    return input;
  }
  const pages_count = input.value;
  const page_sizes: number[] = [];
  for (let i = 0; i < pages_count; i++) {
    input = nomUnsignedFourBytes(input.remaining, Endian.Be);
    if (input instanceof NomError) {
      return input;
    }
    page_sizes.push(input.value);
  }

  const header: Header = {
    sig,
    pages_count,
    page_sizes,
    remaining_bytes: input.remaining,
  };

  return header;
}

interface Page {
  sig: number;
  cookie_count: number;
  cookie_offsets: number[];
  remaining_bytes: Uint8Array;
}

function parsePage(data: Uint8Array, size: number): Cookie[] | NomError {
  const page_input = take(data, size);
  if (page_input instanceof NomError) {
    return page_input;
  }
  let input = nomUnsignedFourBytes(page_input.nommed as Uint8Array, Endian.Le);
  if (input instanceof NomError) {
    return input;
  }

  const sig = input.value;

  input = nomUnsignedFourBytes(input.remaining, Endian.Le);
  if (input instanceof NomError) {
    return input;
  }
  const cookie_count = input.value;
  const cookie_offsets: number[] = [];
  for (let i = 0; i < cookie_count; i++) {
    input = nomUnsignedFourBytes(input.remaining, Endian.Le);
    if (input instanceof NomError) {
      return input;
    }
    cookie_offsets.push(input.value);
  }

  const page: Page = {
    sig,
    cookie_count,
    cookie_offsets,
    remaining_bytes: page_input.remaining as Uint8Array,
  };

  const cookies: Cookie[] = [];
  for (const offset of page.cookie_offsets) {
    const start = take(page_input.nommed, offset);
    if (start instanceof NomError) {
      continue;
    }

    const cookie = parseRecord(start.remaining as Uint8Array);
    if (cookie instanceof NomError) {
      continue;
    }
    cookies.push(cookie);
  }

  return cookies;
}

function parseRecord(data: Uint8Array): Cookie | NomError {
  let input = nomUnsignedFourBytes(data, Endian.Le);
  if (input instanceof NomError) {
    return input;
  }
  const size = input.value;
  // We already nom'd 4 bytes
  const adjust = 4;
  const record_input = take(input.remaining, size - adjust);
  if (record_input instanceof NomError) {
    return record_input;
  }
  // Unknown
  input = nomUnsignedFourBytes(record_input.nommed as Uint8Array, Endian.Le);
  if (input instanceof NomError) {
    return input;
  }
  input = nomUnsignedFourBytes(input.remaining, Endian.Le);
  if (input instanceof NomError) {
    return input;
  }
  const flags = input.value;
  // Unknown
  input = nomUnsignedFourBytes(input.remaining as Uint8Array, Endian.Le);
  if (input instanceof NomError) {
    return input;
  }

  input = nomUnsignedFourBytes(input.remaining as Uint8Array, Endian.Le);
  if (input instanceof NomError) {
    return input;
  }
  const domain_offset = input.value;

  input = nomUnsignedFourBytes(input.remaining as Uint8Array, Endian.Le);
  if (input instanceof NomError) {
    return input;
  }

  const name_offset = input.value;

  input = nomUnsignedFourBytes(input.remaining as Uint8Array, Endian.Le);
  if (input instanceof NomError) {
    return input;
  }

  const path_offset = input.value;

  input = nomUnsignedFourBytes(input.remaining as Uint8Array, Endian.Le);
  if (input instanceof NomError) {
    return input;
  }

  const value_offset = input.value;

  // Unknown
  const unknown = nomUnsignedEightBytes(input.remaining, Endian.Le);
  if (unknown instanceof NomError) {
    return unknown;
  }

  const time_size = 8;
  let time = take(unknown.remaining, time_size);
  if (time instanceof NomError) {
    return time;
  }

  const expiration = unixEpochToISO(
    cocoatimeToUnixEpoch(
      new DataView((time.nommed as Uint8Array).buffer).getFloat64(0, true),
    ),
  );

  time = take(time.remaining, time_size);
  if (time instanceof NomError) {
    return time;
  }

  const created = unixEpochToISO(
    cocoatimeToUnixEpoch(
      new DataView((time.nommed as Uint8Array).buffer).getFloat64(0, true),
    ),
  );

  const name = extractOffsets(data, name_offset);
  if (name instanceof NomError) {
    return name;
  }

  const path = extractOffsets(data, path_offset);
  if (path instanceof NomError) {
    return path;
  }

  const value = extractOffsets(data, value_offset);
  if (value instanceof NomError) {
    return value;
  }

  const domain = extractOffsets(data, domain_offset);
  if (domain instanceof NomError) {
    return domain;
  }

  const record: Cookie = {
    flag: getFlag(flags),
    domain,
    name,
    path,
    value,
    expiration,
    created,
    message: domain,
    datetime: expiration,
    timestamp_desc: "Cookie Expires",
    artifact: "Website Cookie",
    data_type: "macos:safari:cookies:entry"
  };

  return record;
}

function extractOffsets(data: Uint8Array, offset: number): string | NomError {
  const start = take(data, offset);
  if (start instanceof NomError) {
    return start;
  }

  const string_data = takeUntil(start.remaining, Uint8Array.from([ 0 ]));
  if (string_data instanceof NomError) {
    return string_data;
  }
  return extractUtf8String(string_data.nommed as Uint8Array);
}

function getFlag(flag: number): CookieFlag {
  if (flag === 1) {
    return CookieFlag.IsSecure;
  } else if (flag === 4) {
    return CookieFlag.IsHttp;
  } else if (flag === 5) {
    return CookieFlag.IsSecureHttp;
  } else {
    return CookieFlag.Unknown;
  }
}
