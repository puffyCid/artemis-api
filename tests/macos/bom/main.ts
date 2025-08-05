import { parseBom } from "../../../mod";
import { FileError } from "../../../src/filesystem/errors";
import { glob } from "../../../src/filesystem/files";
import { MacosError } from "../../../src/macos/errors";

function main() {
  const path = "/var/db/receipts/*.bom";
  const paths = glob(path);
  if (paths instanceof FileError) {
    throw paths;
  }
  for (const entry of paths) {
    const data = parseBom(entry.full_path);
    if (data instanceof MacosError) {
      throw data;
    }

    if (data.package_name.length === 0) {
      throw "no name?!";
    }
  }
}

main();
