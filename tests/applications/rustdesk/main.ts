import { PlatformType, RustDesk } from "../../../mod";
import { testRustDeskLogs } from "../../test";

function main() {
    console.log('Running RustDesk tests....');
    console.log(' Starting live test....');
    const results = new RustDesk(PlatformType.Linux, "../../test_data/rustdesk/1.4.6");
    const used_alt_dir = true;
    const hits = results.logs(used_alt_dir);
    if (hits.length !== 148) {
        throw `Got ${hits.length} rows. Expected 148`;
    }

    console.log(' Live test passed! 🥳\n');

    console.log(' Starting Logs tests....');
    testRustDeskLogs();
    console.log(' All Logs tests passed! 🥳\n');

    console.log('All RustDesk tests passed! 🥳💃🕺');
}

main();