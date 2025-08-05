import { FileError } from "../../../src/filesystem/errors";
import { glob } from "../../../src/filesystem/files";
import { WindowsError } from "../../../src/windows/errors";
import { parseMru } from "../../../src/windows/registry/recently_used";

function main() {
  const paths = glob("C:\\Users\\*\\NTUSER.DAT");
  if (paths instanceof FileError) {
    throw paths;
  }
  for (const entry of paths) {
    if (!entry.is_file || entry.full_path.includes("Default User")) {
      continue;
    }
    const results = parseMru(entry.full_path);
    if (results instanceof WindowsError) {
      throw results;
    }
    if (results.length === 0) {
      throw "no entries?";
    }
  }
}

main();
