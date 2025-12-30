import { testCheckEolStatus } from "../../test";
import { HttpError } from "../../../src/http/errors";
import { checkEolStatus } from "../../../src/http/eol";

async function main() {
    console.log('Running HTTP End of Life tests....');
    console.log(' Starting live test....');
    const app = "libreoffice";
    const version = "25.2";
    const result = await checkEolStatus(app, version);
    if (result instanceof HttpError) {
        throw console.log(result);
    }
    if (result.url !== "https://endoflife.date/libreoffice") {
        throw console.log(`Got empty URL wanted ${result.url}`);
    }
    if (result.eol !== "2025-11-30") {
        throw console.log(`Got EOL "${result.eol}". Wanted: 2025-11-30`);
    }
    console.log(' Live test passed! 🥳\n');

    console.log(' Starting End of Life test....');
    await testCheckEolStatus();

    console.log(' End of Life test passed! 🥳');
    console.log('All End of Life tests passed! 🥳💃🕺');
}


main();
