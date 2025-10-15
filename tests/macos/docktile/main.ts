import { dockTiles } from "../../../mod";

async function main() {
  console.log('Running macOS Docktile Apps tests....');
  console.log(' Starting live test....');
  const results = await dockTiles();
  if(results.length < 2) {
    throw "Should have found Apple Apps with Docktile persistence?";
  }
  console.log(' Live test passed! 🥳\n');
}

main();
