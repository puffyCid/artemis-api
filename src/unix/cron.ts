import { Cron } from "../../types/unix/cron";
import { FileError } from "../filesystem/errors";
import { glob, readTextFile } from "../filesystem/files";
import { PlatformType } from "../system/systeminfo";
import { UnixError } from "./errors";


/**
 * Parse `Cron` files on an endpoint
 * @param platform Either `PlatformType.Darwin` or `PlatformType.Linux`
 * @param alt_path Optional alternative cron file
 * @returns Array of `Cron` entries or `UnixError`
 */
export function getCron(platform: PlatformType.Darwin | PlatformType.Linux, alt_path?: string): Cron[] | UnixError {
  let path = "/var/spool/cron/crontabs/*";
  if (platform === PlatformType.Darwin) {
    path = "/private/var/at/jobs/*";
  }

  if (alt_path !== undefined) {
    path = alt_path;
  }

  const glob_paths = glob(path);
  if (glob_paths instanceof FileError) {
    return new UnixError("CRON", `failed to glob cron jobs: ${glob_paths}`);
  }

  const entries: Cron[] = [];
  for (const cron_file of glob_paths) {
    if (!cron_file.is_file) {
      continue;
    }

    const data = readTextFile(cron_file.full_path);
    if (data instanceof FileError) {
      console.warn(`Failed to read ${cron_file.full_path}: ${data}`);
      continue;
    }


    const lines = data.split("\n");
    for (const line of lines) {
      if (line.startsWith("#") || line.length === 0) {
        continue;
      }

      const fields = line.split(' ', 6);
      const value: Cron = {
        hour: fields.at(1) ?? "",
        min: fields.at(0) ?? "",
        day: fields.at(2) ?? "",
        month: fields.at(3) ?? "",
        weekday: fields.at(4) ?? "",
        command: fields.at(5) ?? "",
        path: cron_file.full_path,
      };
      entries.push(value);
    }
  }

  return entries;
}