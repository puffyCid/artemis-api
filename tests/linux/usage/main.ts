import { gnomeAppUsage } from "../../../mod";
import { LinuxError } from "../../../src/linux/errors";
import { testGnomeAppUsage } from "../../test";

function main() {
    console.log('Running GNOME Application Usage tests....');
    console.log(' Starting live test....');
    const results = gnomeAppUsage();
    if (results instanceof LinuxError) {
        throw results;
        return;
    }
    console.log(' Live test passed! 🥳\n');

    console.log(' Starting GNOME Application Usage test....');
    testGnomeAppUsage();

    console.log(' GNOME Application Usage test passed! 🥳');
    console.log('All GNOME Application Usage tests passed! 🥳💃🕺');
}

main();
