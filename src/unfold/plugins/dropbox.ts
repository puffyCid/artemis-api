import { Url } from "../../../types/http/unfold";

/**
 * Class to parse DropBox data
 */
export class Dropbox {
    private url: Url;

    constructor (url: Url) {
        this.url = url;
    }

    /**
     * Extract various DropBox URls
     * https://github.com/obsidianforensics/unfurl/blob/main/unfurl/parsers/parse_dropbox.py
     */
    public parseDropbox() {
        if (this.url.url.includes("dropbox.com/scl/")) {
            this.sharing();
        }
        if (this.url.url.includes("dropbox.com/home/")) {
            this.browsing();
        }
    }

    /**
     * Parse DropBox sharing URLs
     */
    private sharing() {
        this.url[ "folder_id" ] = this.url.segments.at(2);
        if (this.url.last_segment.startsWith("_-")) {
            this.url[ "document" ] = this.url.last_segment.replace("_-", "");
        } else {
            this.url[ "document" ] = this.url.last_segment;

        }

        for (const entry of this.url.query_pairs) {
            const [ key, ...param ] = entry.split("=");
            const value = param.join("=");
            switch (key.toLowerCase()) {
                case "rlkey": {
                    this.url[ "share_key" ] = value;
                    break;
                }
                case "st": {
                    // Unsure what this is
                    this.url[ key ] = value;
                    break;
                }
                case "dl": {
                    // Unsure what this is. Download count?
                    this.url[ key ] = value;
                    break;
                }
            }
        }
    }

    /**
     * Parse DropBox folder browsing
     */
    private browsing() {
        const folders: string[] = [];
        for (const entry of this.url.segments) {
            folders.push(decodeURI(entry));
        }
        this.url[ "folders" ] = folders;
        this.url[ "folder_path" ] = folders.join("/");

        for (const entry of this.url.query_pairs) {
            const [ key, ...param ] = entry.split("=");
            const value = param.join("=");
            switch (key.toLowerCase()) {
                case "preview": {
                    this.url[ "document_accessed" ] = value;
                }
            }
        }
    }
}