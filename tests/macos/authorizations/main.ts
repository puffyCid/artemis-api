import { MacosError } from "../../../src/macos/errors";
import { authorizations } from "../../../src/macos/sqlite/authd";

function main() {
  const data = authorizations();
  if (data instanceof MacosError) {
    throw data;
  }

  if (data.length === 0) {
    throw "no sensitive entries?!";
  }
}

main();
