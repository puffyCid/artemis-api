import { getHomebrewInfo } from "../../../mod";
import { MacosError } from "../../../src/macos/errors";

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
