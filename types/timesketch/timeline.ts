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
    /**The raw data associated with the entry */
    _raw: unknown;
}

export enum TimesketchArtifact {
    PROCESSESS = "processes",
    LOGINITEMS = "loginitems",
    UNIFIEDLOGS = "unifiedlogs",
    HOMEBREW = "homebrew",
    FSEVENTS = "fsevents",
}