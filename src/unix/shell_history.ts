import { AccessorProtocol, EntryKind, FileHandle } from "../../types/filesystem/accessor";
import {
  AshHistory,
  BashHistory,
  ZshHistory,
} from "../../types/unix/shellhistory";
import { Accessor } from "../filesystem/accessor";
import { FileError } from "../filesystem/errors";
import { readLines, readTextFile } from "../filesystem/files";
import { detectPlatform, PlatformType } from "../system/systeminfo";
import { unixEpochToISO } from "../time/conversion";

/**
 * Get bash history for users
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative history files
 * @returns Array of `BashHistory`
 */
export function getBashHistory(protocol = AccessorProtocol.Host, alt_path?: string): BashHistory[] {
  let paths: string[] = [ "/home/*/.bash_history" ];
  if (detectPlatform() === PlatformType.Darwin) {
    paths.push("/home/*/.bash_sessions/*.history");
    paths.push("/var/root/.bash_history");
    paths.push("/var/root/.bash_sessions/*.history");
  }

  if (alt_path !== undefined) {
    paths = [ alt_path ];
  }

  let history: BashHistory[] = [];
  const accessor = new Accessor();
  for (const entry of paths) {
    const matches = accessor.globfs(entry, protocol);
    if (matches instanceof FileError) {
      console.warn(`Could not glob ${entry}: ${matches}`);
      continue;
    }

    for (const file of matches) {
      if (file.meta.kind !== EntryKind.File) {
        continue;
      }

      if (file.meta.directory.includes("bash_sessions") && file.meta.extension !== "history") {
        continue;
      }

      const data = readTextFile(file.handle as FileHandle);
      if (data instanceof FileError) {
        console.warn(`Could not read bash file ${file.meta.display_path}: ${data}`);
        continue;
      }

      const values = parseBash(data, file.meta.display_path);
      history = history.concat(values);
    }
  }

  return history;
}

/**
 * Get zsh history for users
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative history files
 * @returns Array of `ZshHistory`
 */
export function getZshHistory(protocol = AccessorProtocol.Host, alt_path?: string): ZshHistory[] {
  let paths: string[] = [ "/home/*/.zsh_history" ];
  if (detectPlatform() === PlatformType.Darwin) {
    paths.push("/home/*/.zsh_sessions/*");
    paths.push("/var/root/.zsh_history");
    paths.push("/var/root/.zsh_sessions/*.history");
  }

  if (alt_path !== undefined) {
    paths = [ alt_path ];
  }

  let history: ZshHistory[] = [];
  const accessor = new Accessor();
  for (const entry of paths) {
    const matches = accessor.globfs(entry, protocol);
    if (matches instanceof FileError) {
      console.warn(`Could not glob ${entry}: ${matches}`);
      continue;
    }

    for (const file of matches) {
      if (file.meta.kind !== EntryKind.File) {
        continue;
      }

      if (file.meta.directory.includes("zsh_sessions") && file.meta.extension !== "history") {
        continue;
      }

      const data = readTextFile(file.handle as FileHandle);
      if (data instanceof FileError) {
        console.warn(`Could not read zsh file ${file.meta.display_path}: ${data}`);
        continue;
      }

      const values = parseZsh(data, file.meta.display_path);
      history = history.concat(values);
    }
  }

  return history;
}

/**
 * Get ash history for users
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative history files
 * @returns Array of `AshHistory`
 */
export function getAshHistory(protocol = AccessorProtocol.Host, alt_path?: string): AshHistory[] {
  let paths: string[] = [ "/home/*/.ash_history" ];
  if (detectPlatform() === PlatformType.Darwin) {
    paths.push("/home/*/.ash_sessions/*");
    paths.push("/var/root/.ash_history");
    paths.push("/var/root/.ash_sessions/*.history");
  }

  if (alt_path !== undefined) {
    paths = [ alt_path ];
  }

  const history: AshHistory[] = [];
  const accessor = new Accessor();
  for (const entry of paths) {
    const matches = accessor.globfs(entry, protocol);
    if (matches instanceof FileError) {
      console.warn(`Could not glob ${entry}: ${matches}`);
      continue;
    }

    for (const file of matches) {
      if (file.meta.kind !== EntryKind.File) {
        continue;
      }

      if (file.meta.directory.includes("ash_sessions") && file.meta.extension !== "history") {
        continue;
      }

      let offset = 0;
      const limit = 200;
      while (true) {
        const data = readLines(file.handle as FileHandle, offset, limit);
        if (data instanceof FileError) {
          console.warn(`Could not read ${file.meta.display_path}: ${data}`);
          break;
        }
        offset += limit;

        for (let i = 0; i < data.length; i++) {
          const value: AshHistory = {
            history: data[ i ] ?? "",
            line: i,
            evidence: file.meta.display_path,
          };

          history.push(value);

        }
        if (data.length < limit) {
          break;
        }
      }
    }
  }

  return history;
}

function parseBash(text: string, path: string): BashHistory[] {
  const lines = text.split("\n");
  const timestamp_regex = /^#([0-9]+)$/;
  const values: BashHistory[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[ i ] === "" || lines[ i ] === undefined) {
      continue;
    }
    const history: BashHistory = {
      history: "",
      timestamp: "1970-01-01T00:00:00.000Z",
      line: 0,
      evidence: path,
    };
    const time_hit = timestamp_regex.exec(lines[ i ] ?? "");
    if (time_hit === null || time_hit.length === 0) {
      history.history = lines[ i ] ?? "";
      history.line = i;
      values.push(history);
    } else {
      const unixepoch_time = time_hit[ 0 ].substring(1);
      i++;
      history.history = lines[ i ] ?? "";
      history.line = i;
      history.timestamp = unixEpochToISO(Number(unixepoch_time));
      values.push(history);
    }
  }

  return values;
}

function parseZsh(text: string, path: string): ZshHistory[] {
  const lines = text.split("\n");
  const timestamp_regex = /^: {0,10}([0-9]{1,11}):[0-9]+;(.*)$/;
  const values: ZshHistory[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[ i ] === "" || lines[ i ] === undefined) {
      continue;
    }
    const history: ZshHistory = {
      history: "",
      timestamp: "1970-01-01T00:00:00.000Z",
      line: 0,
      evidence: path,
    };
    const time_hit = timestamp_regex.exec(lines[ i ] ?? "");
    if (time_hit === null || time_hit.length < 3) {
      history.history = lines[ i ] ?? "";
      history.line = i;
      values.push(history);
    } else {
      const unixepoch_time = time_hit[ 1 ];
      history.history = time_hit[ 2 ] ?? "";
      history.line = i;
      history.timestamp = unixEpochToISO(Number(unixepoch_time));
      values.push(history);
    }
  }

  return values;
}
