import { ChromiumCookieType } from "../../applications/chromium";
import { Url } from "../../http/unfold";

export interface FalkonProfile {
    full_path: string;
    version: string;
}

export interface FalkonHistory {
    id: number;
    url: string;
    unfold: Url | undefined;
    /**Path to the browsedata.db sqlite file */
    db_path: string;
    /**Browser version */
    version: string;
    title: string | null;
    visited: string;
    count: number;
    message: string;
    datetime: string;
    timestamp_desc: "Falkon URL Visited",
    artifact: "KDE Falkon History",
    data_type: "linux:browser:kde:history:entry";
}

export interface FalkonCookie {
    created: string;
    host_key: string;
    top_frame_site_key: string;
    name: string;
    value: string;
    encrypted_value: string;
    path: string;
    expires: string;
    is_secure: boolean;
    is_httponly: boolean;
    last_access: string;
    has_expires: boolean;
    is_persistent: boolean;
    priority: number;
    samesite: number;
    source_scheme: number;
    source_port: number;
    last_update: string;
    source_type: ChromiumCookieType;
    has_cross_site_ancestor: boolean;
    message: string;
    /**Path to the Cookies sqlite file */
    db_path: string;
    /**Browser version */
    version: string;
    datetime: string;
    timestamp_desc: "Falkon Cookie Created",
    artifact: "KDE Falkon Cookie",
    data_type: "linux:browser:kde:cookie:entry";
}

export interface FalkonBookmark {
    bookmark_type: string;
    description: string;
    name: string;
    location: BookmarkLocation;
    url: string;
    visit_count: number;
    /**Path to the bookmarks.json file */
    path: string;
    /**Browser version */
    version: string;
    message: string;
    datetime: string;
    timestamp_desc: "Falkon Bookmark File Created",
    artifact: "KDE Falkon Bookmark",
    data_type: "linux:browser:kde:bookmark:entry";
}

export enum BookmarkLocation {
    Bar = "BookmarkBar",
    Menu = "BookmarkMenu",
    Other = "BookmarkOther"
}