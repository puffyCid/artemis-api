import {
  type Attachment,
  FolderInfo,
  FolderMetadata,
  MessageDetails,
  NameEntry,
  PropertyContext,
  TableInfo,
} from "../../types/windows/outlook";
import { WindowsError } from "./errors";

export class Outlook {
  private path: string;
  private use_ntfs: boolean;

  /**
   * Construct a Outlook class to interact with a Windows OST file
   * @param path Path to the Outlook OST file
   * @param ntfs Should NTFS parser be used. Only works on **Windows**. Required if you want to parse a locked OST file
   */
  constructor (path: string, ntfs = false) {
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
      const data: FolderInfo = js_root_folder(
        this.path,
        this.use_ntfs,
      );

      return data;
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
      const data: FolderInfo = js_read_folder(
        this.path,
        this.use_ntfs,
        folder,
      );

      return data;
    } catch (err) {
      return new WindowsError(
        "OUTLOOK",
        `failed to read folder for ${this.path}: ${err}`,
      );
    }
  }

  /**
   * Function to extract even more metadata from an Outlook folder
   * @param folder Folder number
   * @returns Additional folder info `FolderMetadata`  or `WindowsError`
   */
  public folderMetadata(folder: number): FolderMetadata | WindowsError {
    try {
      //@ts-ignore: Custom Artemis function
      const data: FolderMetadata = js_folder_meta(
        this.path,
        this.use_ntfs,
        folder,
      );

      return data;
    } catch (err) {
      return new WindowsError(
        "OUTLOOK",
        `failed to read folder metadata for ${this.path}: ${err}`,
      );
    }
  }

  /**
   * Function to export the Outlook Message Store. Does NOT contain messages
   * @returns Array of `PropertyContext` or `WindowsError`
   */
  public messageStore(): PropertyContext[] | WindowsError {
    try {
      //@ts-ignore: Custom Artemis function
      const data: PropertyContext[] = js_message_store(
        this.path,
        this.use_ntfs,
      );

      return data;
    } catch (err) {
      return new WindowsError(
        "OUTLOOK",
        `failed to export message store for ${this.path}: ${err}`,
      );
    }
  }

  /**
   * Function to extract Name Maps from Outlook. Can be used to translate some GUID values to a name
   * @returns HashMap of `NameEntry` or `WindowsError`
   */
  public nameMaps(): Record<number, NameEntry> | WindowsError {
    try {
      //@ts-ignore: Custom Artemis function
      const data: Record<number, NameEntry> = js_name_map(
        this.path,
        this.use_ntfs,
      );

      return data;
    } catch (err) {
      return new WindowsError(
        "OUTLOOK",
        `failed to get name maps for ${this.path}: ${err}`,
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
      const data: MessageDetails[] = js_read_messages(
        this.path,
        this.use_ntfs,
        table,
        offset,
      );

      return data;
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
      const data: Attachment = js_read_attachment(
        this.path,
        this.use_ntfs,
        block_id,
        descriptor_id,
      );

      return data;
    } catch (err) {
      return new WindowsError(
        "OUTLOOK",
        `failed to read email attachment for ${this.path}: ${err}`,
      );
    }
  }
}
