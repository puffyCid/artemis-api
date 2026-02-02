import { PlatformType, Syncthing } from "../../../mod";

function main() {
    console.log('Running Syncthing tests....');
    console.log(' Starting Syncthing live test....');
    const client = new Syncthing(PlatformType.Linux, "../../test_data/syncthing");
    const values = client.logs();
    if (values.length != 60) {
        throw `Got ${values.length} log entries. Expected '60'`;
    }
    console.log(' Live test passed! 🥳\n');

    console.log('All Syncthing tests passed! 🥳💃🕺');

}

main();