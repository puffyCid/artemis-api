import { GlobInfo } from "../../types/filesystem/globs";
import {
  BashHistory,
  ZshHistory,
} from "../../types/unix/shellhistory";
import { FileError } from "../filesystem/errors";
import { glob, readTextFile } from "../filesystem/files";
import { PlatformType } from "../system/systeminfo";
import { unixEpochToISO } from "../time/conversion";

export function getBashHistory(platform: PlatformType.Linux | PlatformType.Darwin, alt_file?: string): BashHistory[] {
  let paths: string[] = [ "/home/*/.bash_history" ];
  if (platform === PlatformType.Darwin) {
    paths.push("/home/*/.bash_sessions/*.history");
    paths.push("/var/root/.bash_history");
    paths.push("/var/root/.bash_sessions/*.history");
  }

  if (alt_file !== undefined) {
    paths = [ alt_file ];
  }

  let history: BashHistory[] = [];

  let glob_paths: GlobInfo[] = [];
  for (const path of paths) {
    const info = glob(path);
    if (info instanceof FileError) {
      continue;
    }

    glob_paths = glob_paths.concat(info);
  }

  for (const path of glob_paths) {
    if (!path.is_file) {
      continue;
    }
    if (path.full_path.includes("bash_sessions") && !path.full_path.endsWith(".history")) {
      continue;
    }

    const data = readTextFile(path.full_path);
    if (data instanceof FileError) {
      console.warn(`Could not read ${path.full_path}: ${data}`);
      continue;
    }

    const values = parseBash(data, path.full_path);
    history = history.concat(values);
  }

  return history;
}

export function getZshHistory(platform: PlatformType.Linux | PlatformType.Darwin, alt_file?: string): ZshHistory[] {
  let paths: string[] = [ "/home/*/.zsh_history" ];
  if (platform === PlatformType.Darwin) {
    paths.push("/home/*/.zsh_sessions/*");
    paths.push("/var/root/.zsh_history");
    paths.push("/var/root/.zsh_sessions/*.history");
  }

  if (alt_file !== undefined) {
    paths = [ alt_file ];
  }

  let history: ZshHistory[] = [];
  let glob_paths: GlobInfo[] = [];
  for (const path of paths) {
    const info = glob(path);
    if (info instanceof FileError) {
      continue;
    }

    glob_paths = glob_paths.concat(info);
  }

  for (const path of glob_paths) {
    if (!path.is_file) {
      continue;
    }
    if (path.full_path.includes("zsh_sessions") && !path.full_path.endsWith(".history")) {
      continue;
    }

    const data = readTextFile(path.full_path);
    if (data instanceof FileError) {
      console.warn(`Could not read ${path.full_path}: ${data}`);
      continue;
    }

    const values = parseZsh(data, path.full_path);
    history = history.concat(values);
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
      path,
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
      path,
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
