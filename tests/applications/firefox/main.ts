import { FireFox, Format, Output, OutputType, PlatformType } from "../../../mod";
import { testFirefoxJsonFiles } from "../../test";

function main() {
    console.log('Running Firefox tests....');
    console.log(' Starting live test....');
    const client = new FireFox(PlatformType.Windows);
    const out: Output = {
        name: "firefox_test",
        directory: "./tmp",
        format: Format.JSONL,
        compress: false,
        endpoint_id: "",
        collection_id: 0,
        destination: OutputType.LOCAL
    };
    client.retrospect(out);


    console.log(' Live test passed! 🥳\n');

    console.log('Starting Firefox JSON tests....');
    testFirefoxJsonFiles();
    console.log(' Firefox JSON tests passed! 🥳\n');

}

main();
