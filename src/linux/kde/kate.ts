import { RecentFiles } from "../../../types/linux/kde/kate";
import { FileError } from "../../filesystem/errors";
import { glob, readTextFile, stat } from "../../filesystem/files";

/**
 * Function to extract recent files opened by Kate text editor
 * @param alt_path Alternative path or glob to Kate session files (.katesession)
 * @returns Array of `RecentFiles`
 */
export function kateRecentFiles(alt_path?: string): RecentFiles[] {
    let paths = ["/home/*/.local/share/kate/sessions/*", "/home/*/.local/share/kate/anonymous.katesession"];

    if (alt_path !== undefined) {
        paths = [alt_path];
    }

    const files: RecentFiles[] = [];
    for (const entry of paths) {
        const glob_paths = glob(entry);
        if (glob_paths instanceof FileError) {
            console.warn(`Could not glob path ${entry}: ${glob_paths}`);
            continue;
        }

        for (const value of glob_paths) {
            const data = readTextFile(value.full_path);
            if (data instanceof FileError) {
                console.warn(`Could not read file ${value.full_path}: ${data}`);
                continue;
            }

            let session_file_created = "1970-01-01T00:00:00Z";
            let session_file_modified = session_file_created;
            let session_file_accessed = session_file_created;
            let session_file_changed = session_file_created;
            const meta = stat(value.full_path);
            if (!(meta instanceof FileError)) {
                session_file_created = meta.created;
                session_file_accessed = meta.accessed;
                session_file_changed = meta.changed;
                session_file_modified = meta.modified;
            }

            const lines = data.split("\n");

            for (const line of lines) {
                if (line.startsWith("File") && line.includes("=")) {
                    const file_value = line.split("=");
                    const file: RecentFiles = {
                        session_file: value.full_path,
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