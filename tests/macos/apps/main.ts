import { listApps } from "../../../mod.ts";

function main() {
  const results = listApps();
  if (results.length === 0) {
    throw "no apps!?";
  }
}

main();
