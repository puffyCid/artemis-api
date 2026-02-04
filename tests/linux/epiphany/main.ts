import { Epiphany } from "../../../mod";
import { testEpiphany } from "../../test";

function main() {
    console.log('Running Linux Epiphany tests....');
    console.log(' Starting live test....');
    const client = new Epiphany();

    const history_hits = client.history();
    if (history_hits.length === 0) {
        throw "No history???";
    }

    console.log(' Live test passed! 🥳\n');
    console.log('All Linux Epiphany tests passed! 🥳💃🕺');

    console.log(' Starting Linux Epiphany Mock tests....');
    testEpiphany();
    console.log(' All Linux Epiphany Mock tests passed! 🥳\n');

    console.log('All Linux Epiphany tests passed! 🥳\n');

}

main();
