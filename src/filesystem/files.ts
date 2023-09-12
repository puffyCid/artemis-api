import { GlobInfo } from "../../types/filesystem/globs.d.ts";
import { FileInfo } from "./directory.ts";

/**
 * Return basic metadata about a file or directory
 * @param path File or directory to get metadata about
 * @returns `FileInfo` for provided `path`
 */
export function stat(path: string): FileInfo | Error {
  //@ts-ignore: Custom Artemis function
  const result = fs.stat(path);
  if (result instanceof Error) {
    return result;
  }
  const value: FileInfo = JSON.parse(result);

  return value;
}

/**
 * Hashing algorithms supported by the Runtime
 */
export interface Hashes {
  /**MD5 hash value */
  md5: string;
  /**SHA1 hash value */
  sha1: string;
  /**SHA256 value */
  sha256: string;
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
): Hashes | Error {
  //@ts-ignore: Custom Artemis function
  const result = fs.hash(path, md5, sha1, sha256);
  if (result instanceof Error) {
    return result;
  }
  const data: Hashes = result;
  return data;
}

/**
 * Read a text file. Currently only files less than 2GB in size can be read
 * @param path Text file to read
 * @returns String containing text of file
 */
export function readTextFile(path: string): string | Error {
  //@ts-ignore: Custom Artemis function
  const result = fs.readTextFile(path);
  if (result instanceof Error) {
    return result;
  }
  const data: string = result;
  return data;
}

/**
 * Parse glob patterns based on Rust Glob support (https://docs.rs/glob/latest/glob/)
 * @param pattern Glob pattern to parse. Ex: `C:\\*` to get all files and directories at Windows C directory
 * @returns Array of `GlobInfo` or Error
 */
export function glob(pattern: string): GlobInfo[] | Error {
  //@ts-ignore: Custom Artemis function
  const result = fs.glob(pattern);
  if (result instanceof Error) {
    return result;
  }

  const data: GlobInfo[] = JSON.parse(result);
  return data;
}
