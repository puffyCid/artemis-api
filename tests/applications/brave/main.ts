import { Brave, Format, Output, OutputType, PlatformType } from "../../../mod";
import { testChromiumCache } from "../../test";

function main() {
    console.log('Running Brave tests....');
    console.log(' Starting live test....');
    const client = new Brave(PlatformType.Darwin);
    const out: Output = {
        name: "brave_test",
        directory: "./tmp",
        format: Format.JSONL,
        compress: false,
        timeline: false,
        endpoint_id: "",
        collection_id: 0,
        output: OutputType.LOCAL
    };
    client.retrospect(out);


    console.log(' Live test passed! 🥳\n');

    console.log('Starting Brave Cache tests....');
    testChromiumCache();
    console.log(' Brave Cache tests passed! 🥳\n');

    console.log('All Brave Cache tests passed! 🥳💃🕺');
}

main();
