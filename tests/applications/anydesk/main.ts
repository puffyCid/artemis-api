import { AnyDesk, dumpData, Format, Output, OutputType, PlatformType } from "../../../mod";
import { testReadTrace } from "../../test";

function main() {
    console.log('Running AnyDesk tests....');
    console.log(' Starting live test....');
    const results = new AnyDesk(PlatformType.Linux, "../../test_data/anydesk");
    const used_alt_dir = true;
    const hits = results.traceFiles(used_alt_dir);
    if (hits.length !== 2872) {
        throw `Got ${hits.length} rows. Expected 2872`;
    }
    if (hits[ 0 ].account !== "cipice2205@dotxan.com") {
        throw `Got ${hits[ 0 ].account} account. Expected 'cipice2205@dotxan.com'`;
    }
    if (hits[ 0 ].version !== "7.1.0") {
        throw `Got version ${hits[ 0 ].version}. Expected '7.1.0'`;
    }
    if (hits[ 0 ].id !== "633952986") {
        throw `Got ID ${hits[ 0 ].id}. Expected '633952986'`;
    }
    console.log(' Live test passed! 🥳\n');

    const out: Output = {
        name: "local",
        directory: "./tmp",
        format: Format.JSONL,
        compress: false,
        timeline: false,
        endpoint_id: "",
        collection_id: 0,
        output: OutputType.LOCAL
    };
    dumpData(hits, "anydesk_logs", out);
    console.log(' Starting Trace tests....');
    testReadTrace();
    console.log(' All Trace tests passed! 🥳\n');


    console.log('All AnyDesk tests passed! 🥳💃🕺');

}

main();