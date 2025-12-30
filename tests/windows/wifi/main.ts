import { wifiNetworksWindows } from "../../../mod";
import { WindowsError } from "../../../src/windows/errors";
import { testWindowsWifiNetworks } from "../../test";

function main() {
    console.log('Running Windows WiFi networks tests....');
    console.log(' Starting live test....');
    const results = wifiNetworksWindows();

    if (results instanceof WindowsError) {
        throw results;
    }

    console.log(' Live test passed! 🥳\n');
    console.log(' Starting Windows Wifi network test....');
    testWindowsWifiNetworks();

    console.log('All Windows WiFi networks tests passed! 🥳💃🕺');
}

main();
