import { parseGvfs } from "../../../mod";
import { LinuxError } from "../../../src/linux/errors";
import { testParseGvfs } from "../../test";

function main() {
    console.log('Running GNOME GVFS tests....');
    console.log(' Starting live test....');
    const results = parseGvfs();
    if (results instanceof LinuxError) {
        throw results;
    }

    console.log(' Live test passed! 🥳\n');

    console.log(' Starting GNOME GVFS test....');
    testParseGvfs();

    console.log(' GNOME GVFS test passed! 🥳');
    console.log('All GNOME GVFS tests passed! 🥳💃🕺');
}

main();
