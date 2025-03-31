import { parseBiome } from "../../../mod";
import { MacosError } from "../../../src/macos/errors";

function main() {
  const results = parseBiome();
  if (results instanceof MacosError) {
    throw results;
  }

  if (results.length === 0) {
    throw "no results?";
  }

  if (results[0].path.length === 0) {
    throw "no path?";
  }
}

main();
