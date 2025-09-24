import { AnyDeskUsers, Config } from "../../../types/applications/anydesk";
import { FileError } from "../../filesystem/errors";
import { readLines, stat } from "../../filesystem/files";
import { ApplicationError } from "../errors";

/**
 * Function to parse AnyDesk config files
 * @param path Path to conf file
 * @param user User profile info associated with AnyDesk
 * @returns `Config` object
 */
export function readConfig(path: string, user: AnyDeskUsers): Config | ApplicationError {
    // Config should be really small. Less than 100 lines
    const limit = 500;
    const results = readLines(path, 0, limit);
    if (results instanceof FileError) {
        return new ApplicationError(`ANYDESK`, `could not read ${path}: ${results}`);
    }

    let created = "1970-01-01T00:00:00.000Z";
    const meta = stat(path);
    if (!(meta instanceof FileError)) {
        created = meta.created;
    }
    const value: Config = {
        message: path,
        datetime: created,
        timestamp_desc: "Config Created",
        artifact: "AnyDesk Config",
        data_type: "applications:anydesk:config:entry",
        account: user.account,
        version: user.version,
        id: user.id
    };
    for (const entry of results) {
        const key_value = entry.split("=", 2);
        const key = key_value.at(0);
        if (key === undefined) {
            continue;
        }
        value[ key ] = key_value.at(1) ?? "";
    }

    return value;
}

/**
 * Function to test the AnyDesk config file parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the AnyDesk config parsing
 */
export function testReadConfig(): void {
    const test = "../../test_data/anydesk/user.conf";
    const results = readConfig(test, { user_path: "", id: "1234", account: "adfasdf@adfads.com", version: "7.1.0" });

    if (results[ "ad.roster.discovered.view_type" ] !== "2") {
        throw `Got view_type ${results[ "ad.roster.discovered.view_type" ]} expected 2.......readConfig ❌`;
    }

    const test2 = "../../test_data/anydesk/system.conf";
    const results2 = readConfig(test2, { user_path: "", id: "1234", account: "adfasdf@adfads.com", version: "7.1.0" });

    if (results2[ "ad.inst.id" ] !== "34b44fe840517fc112b20e806a28ec18") {
        throw `Got ID ${results2[ "ad.inst.id" ]} expected 34b44fe840517fc112b20e806a28ec18.......readConfig ❌`;
    }

    console.info(`  Function readConfig ✅`);
}