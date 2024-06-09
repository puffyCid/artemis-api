import { WindowsError } from "../../../src/windows/errors.ts";
import { logonsWindows } from "../../../src/windows/eventlogs/logons.ts";

function main() {
  const results = logonsWindows(
    "C:\\Windows\\System32\\winevt\\Logs\\Security.evtx",
  );
  if (results instanceof WindowsError) {
    throw results;
  }
  if (results.length === 0) {
    throw "no entries?";
  }
}

main();
