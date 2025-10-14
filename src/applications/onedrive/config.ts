import { getPlist, getRegistry } from "../../../mod";
import { OneDriveAccount } from "../../../types/applications/onedrive";
import { MacosError } from "../../macos/errors";
import { unixEpochToISO } from "../../time/conversion";
import { WindowsError } from "../../windows/errors";
import { ApplicationError } from "../errors";

/**
 * Function to extract Account details associated with OneDrive
 * @param path Path to NTUSER.DAT file
 * @returns Array of `OneDriveAccount`
 */
export function accountWindows(path: string): OneDriveAccount[] | ApplicationError {
    const accounts: OneDriveAccount[] = [];
    const values = getRegistry(path, "\\\\software\\\\microsoft\\\\onedrive\\\\accounts");
    if (values instanceof WindowsError) {
        return new ApplicationError(`ONEDRIVE`, `Failed to parse ${path}: ${values.message}`);
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
            data_type: "applications:onedrive:account:entry"
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
export function accountMacos(path: string): OneDriveAccount[] | ApplicationError {
    const accounts: OneDriveAccount[] = [];
    const values = getPlist(path);
    if (values instanceof MacosError) {
        return new ApplicationError(`ONEDRIVE`, `Failed to parse ${path}: ${values.message}`);

    }

    if (Array.isArray(values) || values instanceof Uint8Array) {
        return new ApplicationError(`ONEDRIVE`, `Unexpected PLIST type. Wanted HashMap. Got array`);
    }

    for (const key in values) {
        // Lazy check if the plist data contains the data we want
        if (!JSON.stringify(values[key]).includes("UserEmail")) {
            continue;
        }
        const account_value = values[key] as Record<string, string | number>;

        const account: OneDriveAccount = {
            email: account_value["UserEmail"] as string,
            device_id: account_value["OneDriveDeviceId"] as string,
            account_id: account_value["OneAutoAccountId"] as string,
            last_signin: "1970-01-01T00:00:00.000Z",
            cid: account_value["cid"] as string,
            message: account_value["UserEmail"] as string,
            datetime: "1970-01-01T00:00:00.000Z",
            timestamp_desc: "OneDrive Last Signin",
            artifact: "OneDrive Account Info",
            data_type: "applications:onedrive:account:entry"
        };
        accounts.push(account);
    }


    return accounts;
}