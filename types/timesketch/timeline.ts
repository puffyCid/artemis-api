/**
 * Timeline interface for uploading data to TimeSketch
 */
export interface TimesketchTimeline {
    /** **Required by Timeskech** ISO8601 timestamp format: YYYY-MM-DD HH:mm:ss. All times are in UTC */
    datetime: string;
    /** **Required by Timeskech** Description of the timestamp. Ex: FileCreated */
    timestamp_desc: string;
    /** **Required by Timeskech** Timeline message data */
    message: string;
    /**A hash associated with the entry if available. Will be either MD5, SHA1, or SHA256 */
    hash: string;
    /**User associated with the entry if available */
    user: string;
    /**The type of artifact that was timelined */
    artifact: string;
    /**
     * Artifact data type. Based on plaso defintion  
     * (its kind of freeform, https://github.com/log2timeline/plaso/blob/main/docs/sources/user/Scribbles-about-events.md).  
     * Looks like: `source:artifact:artifact:data`. With first artifact most generic and second one more specific  
     * :artifact: can be nested. Ex: `windows:registry:explorer:programcache`
     * */
    data_type: string;
    /**The raw data associated with the entry */
    _raw: unknown;
}

export enum TimesketchArtifact {
    PROCESSESS = "processes",
    LOGINITEMS = "loginitems",
    UNIFIEDLOGS = "unifiedlogs",
    HOMEBREW = "homebrew",
    FSEVENTS = "fsevents",
    USERS_MACOS = "users-macos",
    GROUPS_MACOS = "groups-macos",
    EXECPOLICY = "execpolicy",
    FILES = "files",
    SUDOLOGS_MACOS = "sudologs-macos",
    EMOND = "emond",
    SPOTLIGHT = "spotlight",
    LAUNCHD = "launchd",
    SAFARI_DOWNLOADS = "safari-downloads",
    SAFARI_HISTORY = "safari-history"
}