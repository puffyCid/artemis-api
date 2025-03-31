import { MacosError } from "../../../src/macos/errors";
import { queryTccDb } from "../../../src/macos/sqlite/tcc";

function main() {
  const data = queryTccDb();
  if (data instanceof MacosError) {
    throw data;
  }

  if (data.length === 0) {
    throw "no tcc entries?!";
  }
}

main();
