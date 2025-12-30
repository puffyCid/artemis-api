import {
  OneDriveSyncEngineFolder,
  OneDriveSyncEngineRecord,
} from "../../../types/applications/onedrive";
import { decode } from "../../encoding/base64";
import { EncodingError } from "../../encoding/errors";
import { bytesToHexString } from "../../encoding/strings";
import { unixEpochToISO } from "../../time/conversion";
import { ApplicationError } from "../errors";
import { querySqlite } from "../sqlite";

/**
 * Function to extract SyncEngineDatabase details
 * @param path Path to the SyncEngineDatabase.db database
 * @returns Array of `OneDriveSyncEngineRecord` entries or `ApplicationError`
 */
export function extractSyncEngine(
  path: string,
): OneDriveSyncEngineRecord[] | ApplicationError {
  const records = getRecords(path);
  if (records instanceof ApplicationError) {
    return records;
  }

  const folders = getFolders(path);
  if (folders instanceof ApplicationError) {
    console.warn(`no folders returned ${folders.message}`);
    return records;
  }

  for (const record of records) {
    for (const folder of folders) {
      if (record.parent_resource_id === folder.resource_id) {
        record.path = `${folder.parents.join("/")}/${record.filename}`;
        record.directory = folder.parents.join("/");
        record.message = record.path;
        if (record.message === "") {
          record.message = record.filename;
        }
      }
    }
  }

  const meta = getMeta(path);
  if (meta instanceof ApplicationError) {
    console.warn(`no metadata returned ${meta.message}`);
    return records;
  }

  for (const record of records) {
    for (const value of meta) {
      if (record.resource_id === value.id) {
        record.created_by = value.created_by;
        record.modified_by = value.modified_by;
        record.last_write_count = value.count;
        record.graph_metadata = value.graph;
      }
    }
  }

  return records;
}

/**
 * Function to extract file records from database
 * @param path Path to the SyncEngineDatabase.db database
 * @returns Array of `OneDriveSyncEngineRecord` entries or `ApplicationError`
 */
function getRecords(
  path: string,
): OneDriveSyncEngineRecord[] | ApplicationError {
  const query =
    "SELECT parentResourceID, resourceID, eTag, fileName, fileStatus, spoPermissions, volumeID, itemIndex, lastChange, size, localHashDigest, sharedItem, mediaDateTaken, mediaWidth, mediaHeight, mediaDuration FROM od_ClientFile_Records";
  const results = querySqlite(path, query);
  if (results instanceof ApplicationError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to query ${path}: ${results.message}`,
    );
  }

  const records: OneDriveSyncEngineRecord[] = [];
  for (const value of results) {
    const record: OneDriveSyncEngineRecord = {
      parent_resource_id: value["parentResourceID"] as string,
      resource_id: value["resourceID"] as string,
      etag: value["eTag"] as string,
      filename: value["fileName"] as string,
      path: "",
      directory: "",
      file_status: value["fileStatus"] as number | null,
      permissions: value["spoPermissions"] as number | null,
      volume_id: value["volumeID"] as number | null,
      item_index: value["itemIndex"] as number | null,
      last_change: "1970-01-01T00:00:00.000Z",
      size: value["size"] as number | null,
      hash_digest: "",
      shared_item: value["sharedItem"] as string | null,
      media_date_taken: "",
      media_width: value["mediaWidth"] as number | null,
      media_height: value["mediaHeight"] as number | null,
      media_duration: value["mediaDuration"] as number | null,
      graph_metadata: "",
      created_by: "",
      modified_by: "",
      last_write_count: 0,
      db_path: path,
      message: value["fileName"] as string,
      datetime: "1970-01-01T00:00:00.000Z",
      timestamp_desc: "OneDrive Sync Last Change",
      artifact: "OneDrive Sync Record",
      data_type: "applications:onedrive:sync:entry"
    };

    if (typeof value["lastChange"] === 'number') {
      record.last_change = unixEpochToISO(value["lastChange"] as number);
      record.datetime = record.last_change;
    }
    if (typeof value["mediaDateTaken"] === 'number') {
      record.media_date_taken = unixEpochToISO(
        value["mediaDateTaken"] as number,
      );
    }
    if (typeof value["localHashDigest"] === 'string') {
      const data = decode(value["localHashDigest"] as string);
      if (!(data instanceof EncodingError)) {
        record.hash_digest = bytesToHexString(data);
      }
    }
    records.push(record);
  }

  return records;
}

/**
 * Function to extract folder records from database
 * @param path Path to the SyncEngineDatabase.db database
 * @returns Array of `OneDriveSyncEngineFolder` entries or `ApplicationError`
 */
function getFolders(
  path: string,
): OneDriveSyncEngineFolder[] | ApplicationError {
  const query =
    "SELECT parentScopeID, parentResourceID, resourceID, eTag, folderName, folderStatus, spoPermissions, volumeID, itemIndex FROM od_ClientFolder_Records";

  const results = querySqlite(path, query);
  if (results instanceof ApplicationError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to query ${path}: ${results.message}`,
    );
  }

  const folders: OneDriveSyncEngineFolder[] = [];
  for (const value of results) {
    const folder: OneDriveSyncEngineFolder = {
      parent_resource_id: value["parentResourceID"] as string,
      resource_id: value["resourceID"] as string,
      etag: value["eTag"] as string,
      parent_scope_id: value["parentScopeID"] as string,
      folder: value["folderName"] as string,
      folder_status: value["folderStatus"] as number | null,
      permissions: value["spoPermissions"] as number | null,
      volume_id: value["volumeID"] as number | null,
      item_index: value["itemIndex"] as number | null,
      parents: [],
    };
    folders.push(folder);
  }

  for (const folder of folders) {
    folder.parents = getParents(folder.resource_id, folders);
  }

  return folders;
}

/**
 * Function to combine parent folder
 * @param id Resource ID of the folder
 * @param folders Array of `OneDriveSyncEngineFolder`
 * @returns Array of parent folders
 */
function getParents(id: string, folders: OneDriveSyncEngineFolder[]): string[] {
  let parents: string[] = [];
  for (const folder of folders) {
    if (folder.resource_id !== id) {
      continue;
    }
    parents.push(folder.folder);
    parents = parents.concat(
      getParents(folder.parent_resource_id, folders),
    );
  }
  return parents.reverse();
}

interface SyncMeta {
  created_by: string;
  modified_by: string;
  graph: string;
  count: number;
  id: string;
}

/**
 * Function to extract metadata for files from database
 * @param path Path to the SyncEngineDatabase.db database
 * @returns Array of `SyncMeta` entries or `ApplicationError`
 */
function getMeta(path: string): SyncMeta[] | ApplicationError {
  const query =
    "SELECT fileName, od_GraphMetadata_Records.* FROM od_GraphMetadata_Records INNER JOIN od_ClientFile_Records ON od_ClientFile_Records.resourceID = od_GraphMetadata_Records.resourceID";

  const results = querySqlite(path, query);
  if (results instanceof ApplicationError) {
    return new ApplicationError(
      `ONEDRIVE`,
      `failed to query ${path}: ${results.message}`,
    );
  }

  const values: SyncMeta[] = [];
  for (const value of results) {
    const meta: SyncMeta = {
      created_by: value["createdBy"] as string,
      modified_by: value["modifiedBy"] as string,
      graph: value["graphMetadataJSON"] as string,
      count: value["lastWriteCount"] as number,
      id: value["resourceID"] as string,
    };
    values.push(meta);
  }

  return values;
}

/**
 * Function to test the OneDrive Sync Database parsing
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the OneDrive Sync Database parsing
 */
export function testExtractSyncEngine(): void {
  const test = "../../tests/test_data/DFIRArtifactMuseum/onedrive/24.175.0830.0001/settings/Personal/SyncEngineDatabase.db";
  let results = extractSyncEngine(test);
  if (results instanceof ApplicationError) {
    throw results;
  }

  if (results.length !== 43) {
    throw `Got "${results.length}" expected 43.......extractSyncEngine ❌`
  }

  if (results[38]?.filename !== "4FDAA807B3CAB8D648CC3C82F11BB4B84D8ECF6E") {
    throw `Got '${results[38]?.filename}' expected "4FDAA807B3CAB8D648CC3C82F11BB4B84D8ECF6E".......extractSyncEngine ❌`
  }

  console.info(`  Function extractSyncEngine ✅`);

  results = getRecords(test);
  if (results instanceof ApplicationError) {
    throw results;
  }

  if (results.length !== 43) {
    throw `Got "${results.length}" expected 43.......getRecords ❌`
  }

  if (results[3]?.filename !== "Capture.PNG") {
    throw `Got '${results[3]?.filename}' expected "Capture.PNG".......extractSyncEngine ❌`
  }

  console.info(`  Function getRecords ✅`);

  const folders = getFolders(test);
  if (folders instanceof ApplicationError) {
    throw folders;
  }

  if (folders.length !== 11) {
    throw `Got "${folders.length}" expected 11.......getFolders ❌`
  }

  if (folders[3]?.folder !== "intro") {
    throw `Got '${folders[3]?.folder}' expected "intro".......extractSyncEngine ❌`
  }

  console.info(`  Function getFolders ✅`);

  const parent: OneDriveSyncEngineFolder[] = [
    {
      "parent_resource_id": "81b443a51d57432abea4457ec2023cfc",
      "resource_id": "23814ecb0b784241bcec575edac5b493",
      "etag": "\"{23814ECB-0B78-4241-BCEC-575EDAC5B493},37\"",
      "parent_scope_id": "81b443a51d57432abea4457ec2023cfc",
      "folder": "Personal Vault",
      "folder_status": 7,
      "permissions": 27,
      "volume_id": null,
      "item_index": null,
      "parents": []
    }
  ];
  const path = getParents("23814ecb0b784241bcec575edac5b493", parent);
  if (path[0] !== "Personal Vault") {
    throw `Got '${path[0]}' expected "Personal Vault".......getParents ❌`
  }
  console.info(`  Function getParents ✅`);

  const meta = getMeta(test);
  if (meta instanceof ApplicationError) {
    throw meta;
  }

  if (meta.length !== 43) {
    throw `Got "${meta.length}" expected 43.......getMeta ❌`
  }

  if (meta[27]?.id !== "fd01a69c261520b9805bcd0100000000") {
    throw `Got "${meta[27]?.id}" expected "fd01a69c261520b9805bcd0100000000".......getMeta ❌`
  }
  console.info(`  Function getMeta ✅`);
}