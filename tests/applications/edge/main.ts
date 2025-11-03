import { Edge, Format, Output, OutputType, PlatformType } from "../../../mod";
import { testChromiumJsonFiles, testChromiumLocalStorage, testChromiumPreferences, testChromiumSessions } from "../../test";

function main() {
    console.log('Running Microsoft Edge tests....');
    console.log(' Starting live test....');
    const client = new Edge(PlatformType.Darwin);
    const out: Output = {
        name: "edge_test",
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

    console.log('Starting Microsoft Edge JSON tests....');
    testChromiumJsonFiles();
    console.log(' Microsoft Edge JSON tests passed! 🥳\n');

    console.log('Starting Microsoft Edge Preferences tests....');
    testChromiumPreferences();
    console.log(' Microsoft Edge Preferences tests passed! 🥳\n');

    console.log('Starting Microsoft Edge Local Storage tests....');
    testChromiumLocalStorage();
    console.log(' Microsoft Edge Local Storage tests passed! 🥳\n');

    console.log('Starting Microsoft Edge Sessions tests....');
    testChromiumSessions();
    console.log(' Microsoft Edge Sessions tests passed! 🥳\n');

    console.log('All Microsoft Edge tests passed! 🥳💃🕺');


}

main();
