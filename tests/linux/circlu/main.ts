import { glob, hash } from "../../../mod";
import { FileError } from "../../../src/filesystem/errors";
import { circluHashlookup, testCircluHashlookup } from "../../../src/http/circlu";
import { HttpError } from "../../../src/http/errors";
import { HashlookupResponse, HashType, MissingHash } from "../../../types/http/circlu";

async function main() {
    console.log('Running HTTP circlu tests....');
    console.log(' Starting live test....');
    const paths = glob("/bin/*");
    if (paths instanceof FileError) {
        throw paths;
    }
    const limit = 10;
    let count = 0;
    const hash_array: string[] = [ "DCB0BDEF5B211DF6E0CB8B9BB6C037D3" ];
    for (const entry of paths) {
        if (count === limit) {
            break;
        }
        if (!entry.is_file) {
            continue;
        }

        const hashes = hash(entry.full_path, true, false, false);
        if (hashes instanceof FileError) {
            throw hashes;
        }
        hash_array.push(hashes.md5);
        count++;
    }
    const results = await circluHashlookup(hash_array, HashType.MD5);

    if (results instanceof HttpError) {
        throw results;
    }
    if (isMissing(results) || !Array.isArray(results)) {
        throw console.log(`Did not get an array from response`);
    }

    if (results.length !== 1) {
        throw console.log(`Did not get expected array length`);
    }
    const single_hash = "DCB0BDEF5B211DF6E0CB8B9BB6C037D3";
    const response = await circluHashlookup(single_hash, HashType.MD5);
    if (response instanceof HttpError) {
        throw response;
    }
    if (isMissing(response) || Array.isArray(response)) {
        throw `Got array or missing ${response}`;
    }
    if (response.FileName !== "./usr/bin/alsaunmute") {
        throw response;
    }
    if (response.FileSize !== "127") {
        throw response;
    }
    console.log(' Live test passed! 🥳\n');

    console.log(' Starting circlu test....');
    await testCircluHashlookup();

    console.log(' circlu test passed! 🥳');
    console.log('All circlu history tests passed! 🥳💃🕺');
}

function isMissing(value: MissingHash | HashlookupResponse | HashlookupResponse[]): value is MissingHash {
    return 'query' in value;
}

main();
