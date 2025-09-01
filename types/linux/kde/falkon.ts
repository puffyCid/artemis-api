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
    timestamp_desc: string;
    artifact: string;
    data_type: string;
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
    timestamp_desc: string;
    artifact: string;
    data_type: string;
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
    timestamp_desc: string;
    artifact: string;
    data_type: string;
}

export enum BookmarkLocation {
    Bar = "BookmarkBar",
    Menu = "BookmarkMenu",
    Other = "BookmarkOther"
}