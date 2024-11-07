import {
  type Attachment,
  FolderInfo,
  MessageDetails,
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
   * You can check how many messages are available via `TableInfo.total_rows` and/or `TableInfo.has_branch.rows_info.count`
   * @param table `TableInfo` object. Obtained from `readFolder`
   * @param offset What message to start. A value of 0 means start at the first message
   * @param limit How many messages to parse
   * @returns `MessageDetails` object or `WindowsError`
   */
  public readMessages(
    table: TableInfo,
    offset: number,
    limit = 50,
  ): MessageDetails[] | WindowsError {
    const rows: number[] = [];
    for (let i = offset; i < limit + offset; i++) {
      rows.push(i);
    }

    table.rows = rows;
    try {
      //@ts-ignore: Custom Artemis function
      const data = Deno.core.ops.read_messages(
        this.path,
        this.use_ntfs,
        JSON.stringify(table),
        offset,
      );

      const results: MessageDetails[] = JSON.parse(data);
      return results;
    } catch (err) {
      return new WindowsError(
        "OUTLOOK",
        `failed to read email message for ${this.path}: ${err}`,
      );
    }
  }

  /**
   * Function to extract attachment associated with email message
   * @param block_id Block ID for attachment
   * @param descriptor_id Descriptor ID for attachment
   * @returns `Attachment` object or `WindowsError`
   */
  public readAttachment(
    block_id: number,
    descriptor_id: number,
  ): Attachment | WindowsError {
    try {
      //@ts-ignore: Custom Artemis function
      const data = Deno.core.ops.read_attachment(
        this.path,
        this.use_ntfs,
        block_id,
        descriptor_id,
      );

      const results: Attachment = JSON.parse(data);
      return results;
    } catch (err) {
      return new WindowsError(
        "OUTLOOK",
        `failed to read email attachment for ${this.path}: ${err}`,
      );
    }
  }
}
