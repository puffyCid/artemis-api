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
      parent_resource_id: value[ "parentResourceID" ] as string,
      resource_id: value[ "resourceID" ] as string,
      etag: value[ "eTag" ] as string,
      filename: value[ "fileName" ] as string,
      path: "",
      directory: "",
      file_status: value[ "fileStatus" ] as number | null,
      permissions: value[ "spoPermissions" ] as number | null,
      volume_id: value[ "volumeID" ] as number | null,
      item_index: value[ "itemIndex" ] as number | null,
      last_change: "1970-01-01T00:00:00.000Z",
      size: value[ "size" ] as number | null,
      hash_digest: "",
      shared_item: value[ "sharedItem" ] as string | null,
      media_date_taken: "",
      media_width: value[ "mediaWidth" ] as number | null,
      media_height: value[ "mediaHeight" ] as number | null,
      media_duration: value[ "mediaDuration" ] as number | null,
      graph_metadata: "",
      created_by: "1970-01-01T00:00:00.000Z",
      modified_by: "1970-01-01T00:00:00.000Z",
      last_write_count: 0,
      db_path: path,
    };

    if (value[ "lastChange" ] !== null && value[ "lastChange" ] !== undefined) {
      record.last_change = unixEpochToISO(value[ "lastChange" ] as number);
    }
    if (value[ "mediaDateTaken" ] !== null && value[ "mediaDateTaken" ] !== undefined) {
      record.media_date_taken = unixEpochToISO(
        value[ "mediaDateTaken" ] as number,
      );
    }
    if (value[ "localHashDigest" ] !== null && value[ "localHashDigest" ] !== undefined) {
      const data = decode(value[ "localHashDigest" ] as string);
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
      parent_resource_id: value[ "parentResourceID" ] as string,
      resource_id: value[ "resourceID" ] as string,
      etag: value[ "eTag" ] as string,
      parent_scope_id: value[ "parentScopeID" ] as string,
      folder: value[ "folderName" ] as string,
      folder_status: value[ "folderStatus" ] as number | null,
      permissions: value[ "spoPermissions" ] as number | null,
      volume_id: value[ "volumeID" ] as number | null,
      item_index: value[ "itemIndex" ] as number | null,
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
      created_by: value[ "createdBy" ] as string,
      modified_by: value[ "modifiedBy" ] as string,
      graph: value[ "graphMetadataJSON" ] as string,
      count: value[ "lastWriteCount" ] as number,
      id: value[ "resourceID" ] as string,
    };
    values.push(meta);
  }

  return values;
}
