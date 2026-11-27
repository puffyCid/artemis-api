import { Accessor, getPlist, getRegistry } from "../../../mod";
import { OneDriveAccount } from "../../../types/applications/onedrive";
import { FileEntry, SourceHandle } from "../../../types/filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { MacosError } from "../../macos/errors";
import { unixEpochToISO } from "../../time/conversion";
import { WindowsError } from "../../windows/errors";
import { ApplicationError } from "../errors";

/**
 * Function to extract Account details associated with OneDrive
 * @param path Path to NTUSER.DAT file
 * @returns Array of `OneDriveAccount`
 */
export function accountWindows(entry: FileEntry): OneDriveAccount[] | ApplicationError {
    const accounts: OneDriveAccount[] = [];
    const values = getRegistry(entry.handle, "\\\\software\\\\microsoft\\\\onedrive\\\\accounts");
    if (values instanceof WindowsError) {
        return new ApplicationError(`ONEDRIVE`, `Failed to parse '${entry.meta.display_path}': ${values.message}`);
    }


    for (const reg of values) {
        if (reg.values.length === 0) {
            continue;
        }
        // Lazy check to see if UserEmail key found in Registry Key value names
        if (!JSON.stringify(reg.values).includes("UserEmail")) {
            continue;
        }

        const account: OneDriveAccount = {
            email: "",
            device_id: "",
            account_id: "",
            last_signin: "",
            cid: "",
            message: "",
            datetime: "",
            timestamp_desc: "OneDrive Last Signin",
            artifact: "OneDrive Account Info",
            data_type: "applications:onedrive:account:entry",
            evidence: entry.meta.display_path,
        };
        for (const value of reg.values) {
            switch (value.value) {
                case "UserEmail":
                    account.email = value.data;
                    account.message = `Last signin by ${account.email}`;
                    break;
                case "cid":
                    account.cid = value.data;
                    break;
                case "LastSignInTime":
                    account.last_signin = unixEpochToISO(Number(value.data));
                    account.datetime = account.last_signin;
                    break;
                case "OneDriveDeviceId":
                    account.device_id = value.data;
                    break;
                case "OneAuthAccountId":
                    account.account_id = value.data;
                    break;
            }
        }
        accounts.push(account);

    }

    return accounts;
}

/**
 * Function to extract Account details associated with OneDrive
 * @param path Path to OneDriveStandaloneSuite.plist plist file
 * @returns Array of `OneDriveAccount`
 */
export function accountMacos(entry: FileEntry, accessor: Accessor, source: SourceHandle): OneDriveAccount[] | ApplicationError {
    const accounts: OneDriveAccount[] = [];
    const bytes = accessor.sourceReadFileHandle(source, entry.handle);
    if (bytes instanceof FileError) {
        return new ApplicationError(`ONEDRIVE`, `Failed to read '${entry.meta.display_path}': ${bytes}`);

    }
    const values = getPlist(bytes);
    if (values instanceof MacosError) {
        return new ApplicationError(`ONEDRIVE`, `Failed to parse '${entry.meta.display_path}': ${values}`);

    }

    if (Array.isArray(values) || values instanceof Uint8Array) {
        return new ApplicationError(`ONEDRIVE`, `Unexpected PLIST type. Wanted HashMap. Got array`);
    }

    for (const key in values) {
        // Lazy check if the plist data contains the data we want
        if (!JSON.stringify(values[ key ]).includes("UserEmail")) {
            continue;
        }
        const account_value = values[ key ] as Record<string, string | number | undefined>;

        const account: OneDriveAccount = {
            email: account_value[ "UserEmail" ] as string | undefined ?? "",
            device_id: account_value[ "OneDriveDeviceId" ] as string | undefined ?? "",
            account_id: account_value[ "OneAuthAccountId" ] as string | undefined ?? "",
            last_signin: "1970-01-01T00:00:00.000Z",
            cid: account_value[ "cid" ] as string | undefined ?? "",
            message: account_value[ "UserEmail" ] as string | undefined ?? "",
            datetime: "1970-01-01T00:00:00.000Z",
            timestamp_desc: "OneDrive Last Signin",
            artifact: "OneDrive Account Info",
            data_type: "applications:onedrive:account:entry",
            evidence: entry.meta.display_path,
        };
        accounts.push(account);
    }


    return accounts;
}