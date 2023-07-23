import { FileInfo } from "./directory.ts";

/**
 * Return basic metadata about a file or directory
 * @param path File or directory to get metadata about
 * @returns `FileInfo` for provided `path`
 */
export function stat(path: string): FileInfo {
  //@ts-ignore: Custom Artemis function
  const data: string = fs.stat(path);
  const value: FileInfo = JSON.parse(data);

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
): Hashes {
  //@ts-ignore: Custom Artemis function
  const data: Hashes = fs.hash(path, md5, sha1, sha256);
  return data;
}

/**
 * Read a text file. Currently only files less than 2GB in size can be read
 * @param path Text file to read
 * @returns String containing text of file
 */
export function readTextFile(path: string): string {
  //@ts-ignore: Custom Artemis function
  const data: string = fs.readTextFile(path);
  return data;
}
