import { getPacmanInfo } from "../../../mod";
import { LinuxError } from "../../../src/linux/errors";
import { testPacmanInfo } from "../../test";

function main() {
    console.log('Running Pacman tests....');
    console.log(' Starting live test....');
    const results = getPacmanInfo();
    if (results instanceof LinuxError) {
        throw results;
    }
    console.log(' Live test passed! 🥳\n');

    console.log(' Starting Pacman info test....');
    testPacmanInfo();

    console.log(' Pacman info test passed! 🥳');
    console.log('All Pacman tests passed! 🥳💃🕺');
}

main();
