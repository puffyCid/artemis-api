import { Url } from "../../http/unfold";

export interface EpiphanyHistory {
    target_url: string | null;
    url_id: number;
    host_id: number;
    title: string | null;
    sync_id: string | null;
    visit_count: number;
    typed_count: number;
    last_visit_time: string;
    thumbnail_update_time: string;
    hidden_from_overview: boolean;
    visit_type: VisitType;
    referring_visit: string | null;
    db_path: string;
    unfold?: Url;
    message: string;
    datetime: string;
    timestamp_desc: "URL Visited";
    artifact: "URL History";
    data_type: "linux:gnome:epiphany:history:entry",
}

/**
 * Similar format as `FirefoxCookies`
 */
export interface EpiphanyCookies {
    id: number;
    name: string | null;
    value: string | null;
    host: string | null;
    path: string | null;
    expiry: string | null;
    last_accessed: string | null;
    is_secure: boolean | null;
    is_http_only: boolean | null;
    same_site: boolean | null;
    db_path: string;
    message: string;
    datetime: string;
    timestamp_desc: "Cookie Expires";
    artifact: "Website Cookie";
    data_type: "linux:browser:epiphany:cookie:entry",
}

export interface EpiphanyPermissions {
    url: string;
    permissions: Record<string, string>;
    file_path: string;
    message: string;
    datetime: "1970-01-01T00:00:00.000Z",
    timestamp_desc: "N/A";
    artifact: "GNOME Epiphany Site Permission";
    data_type: "linux:browser:epiphany:permissions:entry",
}

export enum VisitType {
    None = "None",
    Link = "Link",
    Typed = "Typed",
    Bookmark = "Bookmark",
    HomePage = "HomePage",
    Unknown = "Unknown",
}

export interface EpiphanyProfiles {
    full_path: string;
    version: number;
}

export interface EpiphanyPrint {
    scale: number;
    copies: number;
    number: number;
    reverse: boolean;
    output: string;
    page_set: string;
    printer: string;
    pages: string | number;
    collate: boolean;
    file_path: string;
    message: string;
    datetime: "1970-01-01T00:00:00.000Z",
    timestamp_desc: "N/A";
    artifact: "GNOME Epiphany Last Print";
    data_type: "linux:browser:epiphany:cookie:entry",
}

export interface EpiphanySessions {
    url: string;
    title: string;
    /**Base64 blob */
    history: string;
    session_path: string;
    message: string;
    datetime: "1970-01-01T00:00:00.000Z",
    timestamp_desc: "N/A";
    artifact: "GNOME Epiphany Session";
    data_type: "linux:browser:epiphany:session:entry",
}