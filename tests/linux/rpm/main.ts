import { getRpmInfo } from "../../../mod";
import { LinuxError } from "../../../src/linux/errors";
import { testRpmInfo } from "../../test";

function main() {
    console.log('Running RPM tests....');
    console.log(' Starting live test....');
    const results = getRpmInfo(0, 100);
    if (results instanceof LinuxError && !results.message.includes("unable to open database file")) {
        throw results;
    }
    console.log(' Live test passed! 🥳\n');

    console.log(' Starting RPM info test....');
    testRpmInfo();

    console.log(' RPM info test passed! 🥳');
    console.log('All RPM tests passed! 🥳💃🕺');
}

main();
