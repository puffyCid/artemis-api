import { getAmcache, quarantineEvents } from "../../../mod.ts";
import { MacosError } from "../../../src/macos/errors.ts";
import { WindowsError } from "../../../src/windows/errors.ts";

function main() {
  const data = quarantineEvents();
  if (data instanceof MacosError && !data.message.includes("no such table")) {
    throw data;
  }

  const test = getAmcache();
  if (test instanceof WindowsError) {
    throw "this should fail";
  }
}

main();
