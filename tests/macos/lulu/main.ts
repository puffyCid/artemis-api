import { luluRules } from "../../../mod";
import { MacosError } from "../../../src/macos/errors";
import { testLuluRules } from "../../test";

function main() {
    console.log('Running macOS LuLu tests....');
    console.log(' Starting live test....');
    const results = luluRules();
    if (results instanceof MacosError) {
        throw results;
    }
    if (results.length !== 0 && results[ 0 ]?.file === "") {
        throw 'empty file?';
    }
    console.log(' Live test passed! 🥳\n');

    console.log(' Starting LuLu test....');
    testLuluRules();
    console.log(' LuLu test passed! 🥳');

    console.log('All LuLu tests passed! 🥳💃🕺');
}

main();
