import { WindowsError } from "../../../src/windows/errors";
import { parseMru } from "../../../src/windows/registry/recently_used";
import { testParseMru } from "../../test";

function main() {
  console.log('Running Windows MRU tests....');
  console.log(' Starting live test....');

  const results = parseMru();
  if (results instanceof WindowsError) {
    throw results;
  }
  if (results.length === 0) {
    throw "no entries?";
  }

  console.log(' Live test passed! 🥳\n');

  console.log(' Starting Windows MRU test....');
  testParseMru();

  console.log('All Windows MRU tests passed! 🥳💃🕺');
}

main();
