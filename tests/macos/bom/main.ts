import { parseBom } from "../../../mod";
import { MacosError } from "../../../src/macos/errors";
import { testParseBom } from "../../test";

function main() {
  console.log('Running macOS Bom tests....');
  console.log(' Starting live test....');

  const data = parseBom();
  if (data instanceof MacosError && !data.message.includes("NotADirectory")) {
    throw console.log(JSON.stringify(data));
  }
  console.log(' Live test passed! 🥳\n');

  console.log(' Starting Bom test....');
  testParseBom();
  console.log(' Bom test passed! 🥳');

  console.log('All Bom tests passed! 🥳💃🕺');
}

main();
