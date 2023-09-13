import { FileInfo } from "../../types/filesystem/directory.d.ts";

/**
 * Read a provided directory and get list of files
 * @param path Directory to read
 * @returns An array of files with basic metadata
 */
export async function readDir(path: string): Promise<FileInfo[] | Error> {
  //@ts-ignore: Custom Artemis function
  const result = await fs.readDir(path);
  if (result instanceof Error) {
    return result;
  }
  const data: FileInfo[] = JSON.parse(result);

  return data;
}
