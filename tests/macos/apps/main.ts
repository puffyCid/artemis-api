import { listApps } from "../../../mod";

function main() {
  const results = listApps();
  if (results.length === 0) {
    throw "no apps!?";
  }
}

main();
