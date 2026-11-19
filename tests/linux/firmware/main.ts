import { firmwareHistory } from "../../../mod";
import { LinuxError } from "../../../src/linux/errors";
import { testFirmwareHistory } from "../../test";

function main() {
    console.log('Running firmware history tests....');
    console.log(' Starting live test....');
    const results = firmwareHistory();
    if (results instanceof LinuxError && !results.message.includes("failed to glob for /var/lib/fwupd")) {
        throw results;
    }
    console.log(' Live test passed! 🥳\n');

    console.log(' Starting firmware history test....');
    testFirmwareHistory();

    console.log(' Firmware history test passed! 🥳');
    console.log('All firmware history tests passed! 🥳💃🕺');
}

main();
