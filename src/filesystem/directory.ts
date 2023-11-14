import { FileInfo } from "../../types/filesystem/directory.d.ts";
import { FileError } from "./errors.ts";

/**
 * Read a provided directory and get list of files
 * @param path Directory to read
 * @returns An array of files with basic metadata
 */
export async function readDir(path: string): Promise<FileInfo[] | FileError> {
  try {
    //@ts-ignore: Custom Artemis function
    const result = await fs.readDir(path);
    const data: FileInfo[] = JSON.parse(result);
    return data;
  } catch (err) {
    return new FileError(
      "READ_DIR",
      `failed to read directory ${path}: ${err}`,
    );
  }
}
