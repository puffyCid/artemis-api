import { getHomebrewInfo } from "../../../mod";
import { testHomebrew } from "../../test";

function main() {
  console.log('Running Homebrew tests....');
  console.log(' Starting live test....');
  const data = getHomebrewInfo();

  if (data.packages.length !== 0 && data.packages[ 0 ]?.installTime === '') {
    throw `Missing install time ${data.packages[ 0 ]?.installTime}`;
  }

  console.log(' Live test passed! 🥳\n');

  console.log(' Starting homebrew test....');
  testHomebrew();

  console.log(' Homebrew test passed! 🥳');
  console.log('All Homebrew tests passed! 🥳💃🕺');
}

main();
