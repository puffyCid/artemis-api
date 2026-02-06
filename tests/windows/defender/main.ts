import { defenderQuarantineEventLog } from "../../../mod";
import { WindowsError } from "../../../src/windows/errors";
import { testDefenderQuarantineEventLog } from "../../test";

function main() {
    console.log('Running Windows Defender EventLogs tests....');
    console.log(' Starting live test....');
    const results = defenderQuarantineEventLog();
    if (results instanceof WindowsError) {
        throw results;
    }
    console.log(' Live test passed! 🥳\n');

    console.log(' Starting Windows Defender EventLogs test....');
    testDefenderQuarantineEventLog();

    console.log(' Windows Windows Defender EventLogs test passed! 🥳');
    console.log('All Windows Defender EventLogs tests passed! 🥳💃🕺');
}

main();