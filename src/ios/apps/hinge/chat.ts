import { Messages, Notification } from "../../../../types/ios/apps/hinge";
import { ApplicationError } from "../../../applications/errors";
import { querySqlite } from "../../../applications/sqlite";
import { decode } from "../../../encoding/base64";
import { EncodingError } from "../../../encoding/errors";
import { extractUtf8String } from "../../../encoding/mod";
import { FileError } from "../../../filesystem/errors";
import { readTextFile } from "../../../filesystem/files";
import {
  cocoatimeToUnixEpoch,
  unixEpochToISO,
} from "../../../time/conversion";
import { IosError } from "../../error";

/**
 * Function to read Hinge like info
 * @param path Path to Hinge like file
 * @returns JSON object or `IosError`
 */
export function extractComment(
  path: string,
): Record<string, unknown> | IosError {
  const data = readTextFile(path);
  if (data instanceof FileError) {
    return new IosError(`HINGE`, `failed to read like file: ${data}`);
  }
  return JSON.parse(data);
}

/**
 * Function to query Hinge messages
 * @param path Path Hinge chat database
 * @returns Array of `Messages` or `IosError`
 */
export function extractChat(path: string): Messages[] | IosError {
  const query = `SELECT 
                    ZUSERID AS user_id, 
                    ZTIMESTAMP AS timestamp, 
                    ZIDENTIFIER AS id, 
                    ZTEXT AS message, 
                    ZCHAT AS chat_id 
                FROM 
                    ZCHATMESSAGESTATUSDBO 
                    INNER JOIN ZCHATMESSAGEDBO ON ZCHATMESSAGEDBO.Z_PK = ZCHATMESSAGESTATUSDBO.ZMESSAGE`;

  const results = querySqlite(path, query);
  if (results instanceof ApplicationError) {
    return new IosError(`HINGE`, `failed to extract chat messages: ${results}`);
  }

  return results as unknown as Messages[];
}

/**
 * Function to get Like notifications
 * @param path Path to HingeRecord.sqlite file
 * @returns Array of `Notification` or `IosError`
 */
export function extractNotifications(path: string): Notification[] | IosError {
  const query = `SELECT ZDATA, ZTIMESTAMP, ZTITLE FROM ZRECORDDBO`;
  const results = querySqlite(path, query);
  if (results instanceof ApplicationError) {
    return new IosError(`HINGE`, `failed to extract notifications: ${results}`);
  }

  const notifications: Notification[] = [];
  for (const entry of results as Record<string, string | number>[]) {
    const timestamp = cocoatimeToUnixEpoch(entry[ "ZTIMESTAMP" ] as number);
    const payload = entry[ "ZDATA" ] as string;
    const bytes = decode(payload);
    if (bytes instanceof EncodingError) {
      continue;
    }
    const json_data = extractUtf8String(bytes);
    const value: Notification = {
      timestamp: unixEpochToISO(timestamp),
      message_id: JSON.parse(json_data)[ "messageId" ],
      origin: JSON.parse(json_data)[ "origin" ],
      title: entry[ "ZTITLE" ] as string,
    };
    notifications.push(value);
  }

  return notifications;
}
