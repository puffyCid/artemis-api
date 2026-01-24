import { firewallRules } from "../../../mod";
import { WindowsError } from "../../../src/windows/errors";

function main() {
    console.log('Running Windows Firewall Rules tests....');
    console.log(' Starting live test....');

    const results = firewallRules();
    if(results instanceof WindowsError) {
        throw results;
    }
    if (results.length === 0) {
        throw `Did not get any firewall rules?`;
    }
    console.log(' Live test passed! 🥳\n');


    console.log('All Windows Firewall Rules tests passed! 🥳💃🕺');
}

main();
