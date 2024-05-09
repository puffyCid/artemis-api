import { parseBiome } from "../../../mod.ts";
import { MacosError } from "../../../src/macos/errors.ts";

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
