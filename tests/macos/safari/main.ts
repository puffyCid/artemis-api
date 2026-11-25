import { Safari } from "../../../mod";

function main() {
    console.log('Running Safari tests....');
    console.log(' Starting Safari live test....');
    const client = new Safari();
    const values = client.history();
    if (values.length === 0) {
        throw `Got no history?`;
    }
    console.log(values[0]);
    console.log(' Live test passed! 🥳\n');

    console.log('All Safari tests passed! 🥳💃🕺');

}

main();