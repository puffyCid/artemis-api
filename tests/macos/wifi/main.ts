import { wifiNetworks } from "../../../mod";
import { FileError } from "../../../src/filesystem/errors";
import { stat } from "../../../src/filesystem/files";

function main() {
  //github actions runner has no wifi networks
  const status = stat(
    "/Library/Preferences/com.apple.wifi.known-networks.plist",
  );
  if (status instanceof FileError || !status.is_file) {
    return;
  }
  const results = wifiNetworks();
  if (results.length === 0) {
    throw "no wifi?!";
  }
}

main();
