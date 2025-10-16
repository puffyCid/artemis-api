import { queryLogons } from "../../../mod";
import { LinuxError } from "../../../src/linux/errors";
import { testQueryLogons } from "../../test";

function main() {
    console.log('Running Logons tests....');
    console.log(' Starting live test....');
    const results = queryLogons();
    if (results instanceof LinuxError && !results.message.includes("unable to open database file")) {
        throw results;
    }
    console.log(' Live test passed! 🥳\n');

    console.log(' Starting wtmpdb query test....');
    testQueryLogons();

    console.log(' WTMPDB query test passed! 🥳');
    console.log('All logons tests passed! 🥳💃🕺');
}

main();
