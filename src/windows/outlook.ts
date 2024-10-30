import {
    FolderInfo,
    MessageDetails,
    TableBranchInfo,
    TableInfo,
} from "../../types/windows/outlook.ts";
import { WindowsError } from "./errors.ts";

export class Outlook {
    private path: string;
    private use_ntfs: boolean;

    /**
     * Construct a Outlook class to interact with a Windows OST file
     * @param path Path to the Outlook OST file
     * @param ntfs Should NTFS parser be used. Only works on **Windows**. Required if you want to parse a locked OST file
     */
    constructor(path: string, ntfs = false) {
        this.path = path;
        this.use_ntfs = ntfs;
    }

    /**
     * Function to extract the root (first) folder of an OST file.
     * @returns `FolderInfo` object or `WindowsError`
     */
    public rootFolder(): FolderInfo | WindowsError {
        try {
            //@ts-ignore: Custom Artemis function
            const data = Deno.core.ops.get_root_folder(
                this.path,
                this.use_ntfs,
            );

            const results: FolderInfo = JSON.parse(data);
            return results;
        } catch (err) {
            return new WindowsError(
                "OUTLOOK",
                `failed to determine root folder for ${this.path}: ${err}`,
            );
        }
    }

    /**
     * Function to read an Outlook folder. Use `rootFolder` to get the first folder
     * @param folder Folder number
     * @returns `FolderInfo` object or `WindowsError`
     */
    public readFolder(folder: number): FolderInfo | WindowsError {
        try {
            //@ts-ignore: Custom Artemis function
            const data = Deno.core.ops.read_folder(
                this.path,
                this.use_ntfs,
                folder,
            );

            const results: FolderInfo = JSON.parse(data);
            return results;
        } catch (err) {
            return new WindowsError(
                "OUTLOOK",
                `failed to read folder for ${this.path}: ${err}`,
            );
        }
    }

    /**
     * Function to read an email from an OST file. How many messages to read depends on rows in `TableInfo.rows`
     *
     * Ex: TableInfo.rows = [0..200]. Read the first 200 messages. TableInfo.rows = [20..25]. Read messages 20-25
     * @param table `TableInfo` object. Obtained from `readFolder`
     * @param branch Optional `TableBranchInfo` object. Obtained from `readFolder`
     * @returns `MessageDetails` object or `WindowsError`
     */
    public readMessage(
        table: TableInfo,
        branch?: TableBranchInfo,
    ): MessageDetails | WindowsError {
        try {
            //@ts-ignore: Custom Artemis function
            const data = Deno.core.ops.read_message(
                this.path,
                this.use_ntfs,
                table,
                branch,
            );

            const results: MessageDetails = JSON.parse(data);
            return results;
        } catch (err) {
            return new WindowsError(
                "OUTLOOK",
                `failed to read email message for ${this.path}: ${err}`,
            );
        }
    }
}
