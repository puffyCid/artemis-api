import { AccessorProtocol, EntryKind, FileHandle } from "../../types/filesystem/accessor";
import { Cron } from "../../types/unix/cron";
import { Accessor } from "../filesystem/accessor";
import { FileError } from "../filesystem/errors";
import { readTextFile } from "../filesystem/files";
import { detectPlatform, PlatformType } from "../system/systeminfo";


/**
 * Parse `Cron` files on an endpoint
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative cron file
 * @returns Array of `Cron` entries or `UnixError`
 */
export function getCron(protocol = AccessorProtocol.Host, alt_path?: string): Cron[] {
  let paths = [ "/var/spool/cron/crontabs/*", "/var/spool/cron/*", "/etc/cron.d/*" ];
  if (detectPlatform() === PlatformType.Darwin) {
    paths = [ "/private/var/at/jobs/*", "/private/var/at/tabs/*", "/var/cron/tabs/*", "/private/var/cron/tabs/*", "/usr/lib/cron/tabs/*", "/etc/crontab", "/private/etc/crontab", "/var/at/tabs/*" ];
  }

  if (alt_path !== undefined) {
    paths = [ alt_path ];
  }
  const entries: Cron[] = [];
  const accessor = new Accessor();

  for (const entry of paths) {
    const matches = accessor.globfs(entry, protocol);
    if (matches instanceof FileError) {
      console.warn(`Could not glob ${entry}: ${matches}`);
      continue;
    }

    for (const cron of matches) {
      if (cron.meta.kind !== EntryKind.File) {
        continue;
      }

      const data = readTextFile(cron.handle as FileHandle);
      if (data instanceof FileError) {
        console.warn(
          `Could not read ${cron.meta.display_path}: ${data}`,
        );
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
          path: cron.meta.display_path,
        };
        entries.push(value);
      }
    }
  }

  return entries;
}