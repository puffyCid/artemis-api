import { FileError } from "../../../src/filesystem/errors";
import { glob } from "../../../src/filesystem/files";
import { WindowsError } from "../../../src/windows/errors";
import { parseMru } from "../../../src/windows/registry/recently_used";
import { testParseMru } from "../../test";

function main() {
  console.log('Running Windows MRU tests....');
  console.log(' Starting live test....');

  const paths = glob("C:\\Users\\*\\NTUSER.*");
  if (paths instanceof FileError) {
    throw paths;
  }
  for (const entry of paths) {
    if (!entry.is_file || entry.full_path.includes("Default") || !entry.filename.toLocaleLowerCase().endsWith("dat") || entry.full_path.includes("WsiAccount")) {
      continue;
    }
    const results = parseMru(`ntfs:${entry.full_path}`);
    if (results instanceof WindowsError) {
      throw results;
    }
    if (results.length === 0) {
      throw "no entries?";
    }
  }
  console.log(' Live test passed! 🥳\n');

  console.log(' Starting Windows MRU test....');
  testParseMru();

  console.log('All Windows MRU tests passed! 🥳💃🕺');
}

main();
