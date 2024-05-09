import { wifiNetworks } from "../../../mod.ts";

function main() {
  const results = wifiNetworks();
  if (results.length === 0) {
    throw "no wifi?!";
  }
}

main();
