import { extractAppCrash } from "../../../mod";
import { WindowsError } from "../../../src/windows/errors";
import { testExtractAppCrash } from "../../test";

function main() {
    console.log('Running Windows AppCrash tests....');
    console.log(' Starting live test....');

    const results = extractAppCrash();
    if (results instanceof WindowsError) {
        throw results;
    }

    console.log(' Live test passed! 🥳\n');

    console.log(' Starting Windows AppCrash test....');
    testExtractAppCrash();
    console.log(' Windows AppCrash test passed! 🥳');

    console.log('All Windows AppCrash tests passed! 🥳💃🕺');
}

main();
