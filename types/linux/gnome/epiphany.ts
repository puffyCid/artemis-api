import { Url } from "../../http/unfold";

export interface EpiphanyHistory {
    url: string | null;
    url_id: number;
    host: number;
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
}

export interface EpiphanyPermissions {
    url: string;
    permissions: Record<string, string>;
    file_path: string;
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
}