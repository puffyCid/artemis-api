import { Cron } from "../../types/unix/cron";
import { FileError } from "../filesystem/errors";
import { glob, readTextFile } from "../filesystem/files";
import { PlatformType } from "../system/systeminfo";


/**
 * Parse `Cron` files on an endpoint
 * @param platform Either `PlatformType.Darwin` or `PlatformType.Linux`
 * @param alt_path Optional alternative cron file or glob to cron files
 * @returns Array of `Cron` entries or `UnixError`
 */
export function getCron(platform: PlatformType.Darwin | PlatformType.Linux, alt_path?: string): Cron[] {
  let paths = [ "/var/spool/cron/crontabs/*", "/var/spool/cron/*", "/etc/cron.d/*" ];
  if (platform === PlatformType.Darwin) {
    paths = [ "/private/var/at/jobs/*", "/private/var/at/tabs/*", "/var/cron/tabs/*", "/private/var/cron/tabs/*", "/usr/lib/cron/tabs/*", "/etc/crontab", "/private/etc/crontab", "/var/at/tabs/*" ];
  }

  if (alt_path !== undefined) {
    paths = [ alt_path ];
  }
  const entries: Cron[] = [];

  for (const path of paths) {
    const glob_paths = glob(path);
    if (glob_paths instanceof FileError) {
      console.warn(`Failed to failed to glob cron jobs: ${glob_paths}`);
      continue;
    }

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
  }



  return entries;
}