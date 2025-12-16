import { getEventlogProviders } from "../../../mod";

function main() {
    console.log('Running Windows EventLog provider tests....');
    console.log(' Starting live test....');

    const results = getEventlogProviders();
    if (results.length === 0) {
        throw `Did not get any providers?`;
    }
    console.log(' Live test passed! 🥳\n');


    console.log('All Windows EventLog provider tests passed! 🥳💃🕺');
}

main();
