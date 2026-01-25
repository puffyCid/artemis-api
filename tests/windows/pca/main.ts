import { parsePca } from "../../../mod";
import { WindowsError } from "../../../src/windows/errors";
import { testParsePca } from "../../test";

function main() {
    console.log('Running Windows PCA tests....');
    console.log(' Starting live test....');

    const results = parsePca();
    if (results instanceof WindowsError) {
        throw results;
    }

    console.log(' Live test passed! 🥳\n');

    console.log(' Starting Windows PCA test....');
    testParsePca();

    console.log('All Windows PCAs tests passed! 🥳💃🕺');
}

main();
