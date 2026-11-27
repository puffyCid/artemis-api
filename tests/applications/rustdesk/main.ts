import { RustDesk } from "../../../mod";
import { AccessorProtocol } from "../../../types/filesystem/accessor";
import { testRustDesk, testRustDeskLogs } from "../../test";

function main() {
    console.log('Running RustDesk tests....');
    console.log(' Starting live test....');
    const results = new RustDesk(AccessorProtocol.Host, "host:", "../../test_data/rustdesk/1.4.6");
    const hits = results.logs();
    if (hits.length !== 148) {
        throw `Got ${hits.length} rows. Expected 148`;
    }
    console.log(' Live test passed! 🥳\n');

    console.log(' Starting Logs tests....');
    testRustDeskLogs();
    testRustDesk();

    console.log(' All Logs tests passed! 🥳\n');

    console.log('All RustDesk tests passed! 🥳💃🕺');
}

main();