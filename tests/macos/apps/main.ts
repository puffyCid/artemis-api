import { listApps } from "../../../mod";

function main() {
  console.log('Running macOS Apps tests....');
  console.log(' Starting live test....');
  const results = listApps();
  if (results.length === 0) {
    throw "no apps!?";
  }
  console.log(' Live test passed! 🥳\n');
}

main();
