import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { RecentFiles } from "../../../types/linux/kde/kate";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { readTextFile } from "../../filesystem/files";

/**
 * Function to extract recent files opened by Kate text editor
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Alternative path or glob to Kate session files (.katesession)
 * @returns Array of `RecentFiles`
 */
export function kateRecentFiles(protocol = AccessorProtocol.Host, alt_path?: string): RecentFiles[] {
    let paths = [ "/home/*/.local/share/kate/sessions/*", "/home/*/.local/share/kate/anonymous.katesession" ];

    if (alt_path !== undefined) {
        paths = [ alt_path ];
    }

    const accessor = new Accessor();
    const files: RecentFiles[] = [];
    for (const path in paths) {
        const matches = accessor.globfs(path, protocol);
        if (matches instanceof FileError) {
            continue;
        }

        for (const entry of matches) {
            if (entry.meta.kind !== EntryKind.File) {
                continue;
            }

            const data = readTextFile(entry.handle as FileHandle);
            if (data instanceof FileError) {
                console.warn(`Could not read file '${entry.meta.display_path}': ${data}`);
                continue;
            }

            let session_file_created = "1970-01-01T00:00:00.000Z";
            let session_file_modified = session_file_created;
            let session_file_accessed = session_file_created;
            let session_file_changed = session_file_created;

            const stat = accessor.statHandle(entry.handle as FileHandle);
            if (!(stat instanceof FileError)) {
                session_file_created = stat.times.created;
                session_file_accessed = stat.times.accessed;
                session_file_changed = stat.times.changed;
                session_file_modified = stat.times.modified;
            }

            const lines = data.split("\n");

            for (const line of lines) {
                if (line.startsWith("File") && line.includes("=")) {
                    const file_value = line.split("=");
                    const file: RecentFiles = {
                        evidence: entry.meta.display_path,
                        // Linux file names can contain '=' symbol
                        file: file_value.slice(1).join("="),
                        session_file_created,
                        session_file_modified,
                        session_file_accessed,
                        session_file_changed
                    };

                    files.push(file);
                }
            }
        }
    }

    return files;
}