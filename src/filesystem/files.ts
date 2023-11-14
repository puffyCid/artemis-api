import { FileInfo } from "../../types/filesystem/directory.d.ts";
import { Hashes } from "../../types/filesystem/files.d.ts";
import { GlobInfo } from "../../types/filesystem/globs.d.ts";
import { FileError } from "./errors.ts";

/**
 * Return basic metadata about a file or directory
 * @param path File or directory to get metadata about
 * @returns `FileInfo` for provided `path`
 */
export function stat(path: string): FileInfo | FileError {
  try {
    //@ts-ignore: Custom Artemis function
    const result = fs.stat(path);
    const value: FileInfo = JSON.parse(result);
    return value;
  } catch (err) {
    return new FileError("STAT", `failed to stat ${path}: ${err}`);
  }
}

/**
 * Return hashes for a single file
 * @param path File to hash
 * @param md5 Enable MD5 hashing
 * @param sha1 Enable SHA1 hashing
 * @param sha256 Enable SHA256 hashing
 * @returns Collection of `Hashes` or empty values if not provided a file
 */
export function hash(
  path: string,
  md5: boolean,
  sha1: boolean,
  sha256: boolean,
): Hashes | FileError {
  try {
    //@ts-ignore: Custom Artemis function
    const result = fs.hash(path, md5, sha1, sha256);
    const data: Hashes = result;
    return data;
  } catch (err) {
    return new FileError("HASH", `failed to hash ${path}: ${err}`);
  }
}

/**
 * Read a text file. Currently only files less than 2GB in size can be read
 * @param path Text file to read
 * @returns String containing text of file
 */
export function readTextFile(path: string): string | FileError {
  try {
    //@ts-ignore: Custom Artemis function
    const result = fs.readTextFile(path);
    const data: string = result;
    return data;
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
    //@ts-ignore: Custom Artemis function
    const result = fs.readFile(path);
    const data: Uint8Array = result;
    return data;
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
    //@ts-ignore: Custom Artemis function
    const result = fs.glob(pattern);
    const data: GlobInfo[] = JSON.parse(result);
    return data;
  } catch (err) {
    return new FileError("GLOB", `failed to glob pattern ${pattern}" ${err}`);
  }
}
