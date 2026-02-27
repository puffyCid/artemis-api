export interface SharedFilelist {
    evidence: string;
    shared_file_type: SharedFileType;
    message: string;
    datetime: string;
    timestamp_desc: string;
    artifact: "Shared File List";
    data_type: "macos:plist:sharedfilelist:entry";
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
    UnknownFavorite = "Unkonwn Favorite",
    ApplicationRecentFiles = "Application Recent File"
}

export enum PlistDataType {
    Bookmark = "Bookmark",
    CodeSign = "Code Signing"
}