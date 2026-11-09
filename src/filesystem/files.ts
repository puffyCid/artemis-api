import { FileHandle } from "../../types/filesystem/accessor";
import { FileInfo } from "../../types/filesystem/directory";
import { Hashes } from "../../types/filesystem/files";
import { GlobInfo } from "../../types/filesystem/globs";
import { FileError } from "./errors";

/**
 * Return basic metadata about a file or directory
 * @param path File or directory to get metadata about
 * @returns `FileInfo` for provided `path`
 */
export function stat(path: string): FileInfo | FileError {
  try {
    // @ts-expect-error: Custom Artemis function
    const result = js_stat(path);
    return result;
  } catch (err) {
    return new FileError("STAT", `failed to stat ${path}: ${err}`);
  }
}

/**
 * Return hashes for a single file
 * @param path File to hash
 * @param md5 Enable MD5 hashing. Default is true
 * @param sha1 Enable SHA1 hashing. Default is false
 * @param sha256 Enable SHA256 hashing. Default is false
 * @returns Collection of `Hashes` or empty values if not provided a file
 */
export function hash(
  handle: FileHandle,
  md5 = true,
  sha1 = false,
  sha256 = false,
): Hashes | FileError {
  try {
    // @ts-expect-error: Custom Artemis function
    const result = js_hash_file(handle.File, md5, sha1, sha256);
    return result;
  } catch (err) {
    return new FileError("HASH", `failed to hash ${JSON.stringify(handle.File)}: ${err}`);
  }
}

/**
 * Read a text file. Currently only files less than 2GB in size can be read
 * @param path Text file to read
 * @returns String containing text of file
 */
export function readTextFile(path: string): string | FileError {
  try {
    // @ts-expect-error: Custom Artemis function
    const result = js_read_text_file(path);
    return result;
  } catch (err) {
    return new FileError(
      "READ_TEXT_FILE",
      `failed to read text file ${path}: ${err}`,
    );
  }
}

/**
 * Read a file using regular OS APIs. Currently only files less than 2GB in size can be read
 * @param path File to read
 * @returns Bytes of file
 */
export function readFile(path: string): Uint8Array | FileError {
  try {
    // @ts-expect-error: Custom Artemis function
    const result = js_read_file(path);
    return result;
  } catch (err) {
    return new FileError("READ_FILE", `failed to read file ${path}: ${err}`);
  }
}

/**
 * Parse glob patterns based on Rust Glob support (https://docs.rs/glob/latest/glob/)
 * @param pattern Glob pattern to parse. Ex: `C:\\*` to get all files and directories at Windows C directory
 * @returns Array of `GlobInfo` or Error
 */
export function glob(pattern: string): GlobInfo[] | FileError {
  try {
    // @ts-expect-error: Custom Artemis function
    const result = js_glob(pattern);
    return result;
  } catch (err) {
    return new FileError("GLOB", `failed to glob pattern ${pattern}: ${err}`);
  }
}

/**
 * Read lines from a file (UTF8 encoding)
 * @param handle `FileHandle` to text file to read
 * @param offset First line to start reading from. Default is 0. Cannot be less than 0.
 * @param limit Number of lines to read. Default is 100. Cannot be less than 0.
 * @returns Array of strings or `FileError`
 */
export function readLines(handle: FileHandle, offset: number = 0, limit: number = 100): string[] | FileError {
  if (offset < 0 || limit < 0) {
    return new FileError("READ_LINES", `neither offset (${offset}) or limit (${limit}) can be less than 0`);
  }
  try {
    // @ts-expect-error: Custom Artemis function
    const result = js_read_lines(handle.File, offset, limit);
    return result;
  } catch (err) {
    return new FileError("READ_LINES", `failed to read lines for ${JSON.stringify(handle.File)}: ${err}`);
  }
}