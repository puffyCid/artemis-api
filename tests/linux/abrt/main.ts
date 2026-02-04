import { extractAbrt } from "../../../mod";
import { LinuxError } from "../../../src/linux/errors";

async function main() {
    console.log('Running Linux Abrt tests....');
    console.log(' Starting live test....');
    const results = await extractAbrt();
    if (results instanceof LinuxError) {
        throw results;
    }

    if (results.length === 0) {
        throw "No abrt???";
    }

    console.log(' Live test passed! 🥳\n');
    console.log('All Linux Abrt tests passed! 🥳\n');
}

main();
