import { parseBom } from "../../../mod";
import { FileError } from "../../../src/filesystem/errors";
import { glob } from "../../../src/filesystem/files";
import { MacosError } from "../../../src/macos/errors";
import { testParseBom } from "../../test";

function main() {
  console.log('Running macOS Bom tests....');
  console.log(' Starting live test....');
  const path = "/var/db/receipts/*.bom";
  const paths = glob(path);
  if (paths instanceof FileError) {
    throw console.log(paths);
  }
  for (const entry of paths) {
    const data = parseBom(entry.full_path);
    if (data instanceof MacosError) {
      throw console.log(data);
    }

    if (data.package_name.length === 0) {
      throw "no name?!";
    }
  }
  console.log(' Live test passed! 🥳\n');

  console.log(' Starting Bom test....');
  testParseBom();
  console.log(' Bom test passed! 🥳');

  console.log('All Bom tests passed! 🥳💃🕺');
}

main();
