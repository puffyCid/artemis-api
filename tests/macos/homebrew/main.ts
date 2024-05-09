import { getHomebrewInfo } from "../../../mod.ts";
import { MacosError } from "../../../src/macos/errors.ts";

function main() {
  const data = getHomebrewInfo();
  if (data instanceof MacosError) {
    throw data;
  }

  if (data.packages.length === 0) {
    throw "no results!";
  }
}

main();
