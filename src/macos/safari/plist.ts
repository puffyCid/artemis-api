import { getPlist, PlatformType, Unfold } from "../../../mod";
import { SafariDownloads, SafariProfile } from "../../../types/macos/safari";
import { UnfoldError } from "../../unfold/error";
import { parseBookmark } from "../bookmark";
import { MacosError } from "../errors";

export function safariDownloads(paths: SafariProfile[], platform: PlatformType, unfold: boolean): SafariDownloads[] {
    const hits: SafariDownloads[] = [];

    let client: Unfold | undefined = undefined;
    if (unfold) {
        client = new Unfold();
    }


    for (const path of paths) {
        let full_path = `${path.full_path}/Downloads.plist`;
        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\Downloads.plist`;
        }

        const results = getPlist(full_path);
        if (results instanceof MacosError) {
            console.warn(`Failed to parse plist full_path: ${results}`);
            continue;
        }
        if (Array.isArray(results)) {
            console.warn(`Got array plist full_path: ${results}`);
            continue;
        }
        if (!Array.isArray(results[ "DownloadHistory" ])) {
            console.warn(`Did not get DownloadHistory array full_path: ${results}`);
            continue;
        }

        for (const entry of results[ "DownloadHistory" ] as Record<string, unknown>[]) {
            const bookmark = parseBookmark(new Uint8Array(entry[ "DownloadEntryBookmarkBlob" ] as number[]));
            if (bookmark instanceof MacosError) {
                console.warn(`Could not parse bookmark for full_path: ${results}`);
                continue;
            }
            const download: SafariDownloads = {
                source_url: entry[ "DownloadEntryURL" ] as string,
                download_path: entry[ "DownloadEntryPath" ] as string,
                sandbox_id: entry[ "DownloadEntrySandboxIdentifier" ] as string,
                download_bytes: entry[ "DownloadEntryProgressTotalToLoad" ] as number,
                download_id: entry[ "DownloadEntryIdentifier" ] as string,
                download_entry_date: entry[ "DownloadEntryDateAddedKey" ] as string,
                download_entry_finish: entry[ "DownloadEntryDateFinishedKey" ] as string,
                path: bookmark.path,
                cnid_path: bookmark.cnid_path,
                created: bookmark.created,
                volume_path: bookmark.volume_path,
                volume_url: bookmark.volume_url,
                volume_name: bookmark.volume_name,
                volume_uuid: bookmark.volume_uuid,
                volume_size: bookmark.volume_size,
                volume_created: bookmark.volume_created,
                volume_flag: bookmark.volume_flags,
                volume_root: bookmark.volume_root,
                localized_name: bookmark.localized_name,
                security_extension_rw: bookmark.security_extension_rw,
                security_extension_ro: bookmark.security_extension_ro,
                target_flags: bookmark.target_flags,
                username: bookmark.username,
                folder_index: bookmark.folder_index,
                uid: bookmark.uid,
                creation_options: bookmark.creation_options,
                is_executable: bookmark.is_executable,
                file_ref_flag: bookmark.file_ref_flag,
                plist_path: path.full_path,
                unfold: undefined
            };
            if (unfold && typeof client !== 'undefined') {
                const result = client.parseUrl(download.source_url);
                if (!(result instanceof UnfoldError)) {
                    download.unfold = result;
                }
            }
            hits.push(download);
        }
    }

    return hits;
}