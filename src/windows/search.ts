/**
 * Windows `Search` is an indexing service for tracking a huge amount of files and content on Windows.
 * `Search` can parse a large amount of metadata (properties) for each entry it indexes. It has almost 600 different types of properties it can parse.
 * It can even index some of the contents of a file.
 *
 * `Search` can index large parts of the file system, so parsing the `Search` database can provide a partial file listing of the system.
 * `Search` is disabled on Windows Servers and starting on newer versions of Windows 11 it is stored in a SQLITE database (previously was an ESE database)
 *
 * References:
 *  - https://github.com/libyal/esedb-kb/blob/main/documentation/Windows%20Search.asciidoc
 *  - https://en.wikipedia.org/wiki/Windows_Search
 */
export interface SearchEntry {
  /**Index ID for row */
  document_id: number;
  /**Search entry name */
  entry: string;
  /**Search entry last modified in UNIXEPOCH seconds */
  last_modified: number;
  /**
     * JSON object representing the properties associated with the entry
     *
     * Example:
     * ```
     * "properties": {
            "3-System_ItemFolderNameDisplay": "Programs",
            "4429-System_IsAttachment": "0",
            "4624-System_Search_AccessCount": "0",
            "4702-System_VolumeId": "08542f90-0000-0000-0000-501f00000000",
            "17F-System_DateAccessed": "k8DVxD162QE=",
            "4392-System_FileExtension": ".lnk",
            "4631F-System_Search_GatherTime": "7B6taj962QE=",
            "5-System_ItemTypeText": "Shortcut",
            "4184-System_ComputerName": "DESKTOP-EIS938N",
            "15F-System_DateModified": "EVHzDyR22QE=",
            "4434-System_IsFolder": "0",
            "4365-System_DateImported": "ABKRqWyI1QE=",
            "4637-System_Search_Store": "file",
            "4373-System_Document_DateSaved": "EVHzDyR22QE=",
            "4448-System_ItemPathDisplayNarrow": "Firefox (C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs)",
            "4559-System_NotUserContent": "0",
            "33-System_ItemUrl": "file:C:/ProgramData/Microsoft/Windows/Start Menu/Programs/Firefox.lnk",
            "4447-System_ItemPathDisplay": "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Firefox.lnk",
            "13F-System_Size": "7QMAAAAAAAA=",
            "4441-System_ItemFolderPathDisplayNarrow": "Programs (C:\\ProgramData\\Microsoft\\Windows\\Start Menu)",
            "0-InvertedOnlyPids": "cBFzESgSZRI=",
            "4443-System_ItemNameDisplay": "Firefox.lnk",
            "4442-System_ItemName": "Firefox.lnk",
            "14F-System_FileAttributes": "32",
            "4403-System_FolderNameDisplay": "Cygwin",
            "4565-System_ParsingName": "Firefox.lnk",
            "4456-System_Kind": "bGluawBwcm9ncmFt",
            "27F-System_Search_Rank": "707406378",
            "16F-System_DateCreated": "UUZNqWyI1QE=",
            "4440-System_ItemFolderPathDisplay": "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs",
            "4397-System_FilePlaceholderStatus": "6",
            "4465-System_Link_TargetParsingPath": "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
            "4431-System_IsEncrypted": "0",
            "4457-System_KindText": "Link; Program",
            "4444-System_ItemNameDisplayWithoutExtension": "Firefox",
            "11-System_FileName": "Firefox.lnk",
            "4623-System_SFGAOFlags": "1078002039",
            "0F-InvertedOnlyMD5": "z1gPcor92OaNVyAAzRdOsw==",
            "4371-System_Document_DateCreated": "ABKRqWyI1QE=",
            "4633-System_Search_LastIndexedTotalTime": "0.03125",
            "4396-System_FileOwner": "Administrators",
            "4438-System_ItemDate": "ABKRqWyI1QE=",
            "4466-System_Link_TargetSFGAOFlags": "1077936503",
            "4450-System_ItemType": ".lnk",
            "4678-System_ThumbnailCacheId": "DzpSS6gn5yg="
        }
     * ```
     */
  properties: Record<string, string>;
}

/**
 * Function to parse Windows Search data. Supports both ESE and SQLITE databases
 * The Search database can get extremely large, consider using a filter script that accepts `SearchEntry[]` as an argument.
 * @param path Path to a Windows Search file. Supports `Windows.edb` or `Windows.db`
 * @returns Array of `SearchEntry` entries
 */
export function get_search(path: string): SearchEntry[] {
  const data = Deno.core.ops.get_search(path);
  const search: SearchEntry[] = JSON.parse(data);

  return search;
}
