import { getHomebrewInfo } from "../../../mod";
import { MacosError } from "../../../src/macos/errors";
import { testHomebrew } from "../../test";

function main() {


  console.log('Running Homebrew tests....');
  console.log(' Starting live test....');
  const data = getHomebrewInfo();
  if (data instanceof MacosError) {
    throw data;
  }

  if (data.packages.length === 0) {
    throw "no results!";
  }
  if(data.packages[0]?.installTime === '') {
    throw `Missing install time ${data.packages[0]?.installTime}`;
  }
  console.log(' Live test passed! 🥳\n');

  console.log(' Starting homebrew test....');
  testHomebrew();

  console.log(' Homebrew test passed! 🥳');
  console.log('All Homebrew tests passed! 🥳💃🕺');
}

main();
