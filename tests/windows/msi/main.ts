import { msiInstalled } from "../../../mod";
import { WindowsError } from "../../../src/windows/errors";
import { testMsiInstalled } from "../../test";

function main() {
    console.log('Running Windows MSI Installed EventLogs tests....');
    console.log(' Starting live test....');
    const results = msiInstalled();
    if (results instanceof WindowsError) {
        throw results;
    }
    console.log(' Live test passed! 🥳\n');

    console.log(' Starting Windows MSI Installed test....');
    testMsiInstalled();

    console.log(' Windows Windows MSI Installed EventLogs test passed! 🥳');
    console.log('All Windows MSI Installed EventLogs tests passed! 🥳💃🕺');
}

main();