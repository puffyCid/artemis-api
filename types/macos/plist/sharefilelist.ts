export interface RecentFiles {
    evidence: string;
    shared_file_type: SharedFileType;
    message: string;
    datetime: string;
    timestamp_desc: string;
    artifact: "Recent Files";
    data_type: "macos:plist:recentfile:entry";
    plist_data_type: PlistDataType;
    [ key: string ]: unknown;
}

export interface SharedFilelistRaw {
    "$version": number;
    "$archiver": string;
    "$objects": (string | number | boolean | Record<string, unknown> | number[])[];
}

export enum SharedFileType {
    FinderFavorite = "Finder Favorite",
    VolumeFavorite = "Volume Favorite",
    UnknownFavorite = "Unknown Favorite",
    ApplicationRecentFiles = "Application Recent File",
    ProjectFavorite = "Tag Favorite",
    RecentApplication = "Recent Application",
    RecentDocuments = "Recent Documents",
}

export enum PlistDataType {
    Bookmark = "Bookmark",
    CodeSign = "Code Signing"
}