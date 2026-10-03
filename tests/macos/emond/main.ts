import { MacosError } from "../../../src/macos/errors";
import { emondRules } from "../../../src/macos/plist/emond";
import { testEmondRules } from "../../test";

function main() {
    console.log('Running macOS Emond tests....');
    console.log(' Starting live test....');
    const results = emondRules();
    if (results instanceof MacosError) {
        throw results;
    }
    if (results.length !== 0) {
        throw 'empty file?';
    }
    console.log(' Live test passed! 🥳\n');

    console.log(' Starting Emond test....');
    testEmondRules();
    console.log(' Emond test passed! 🥳');

    console.log('All Emond tests passed! 🥳💃🕺');
}

main();
