import { MacosError } from "../../../src/macos/errors.ts";
import { queryTccDb } from "../../../src/macos/sqlite/tcc.ts";

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
