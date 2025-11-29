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
  /**The type of artifact that was timelined */
  artifact: string;
  /**
   * Artifact data type. Based on plaso definition
   * (its kind of freeform, https://github.com/log2timeline/plaso/blob/main/docs/sources/user/Scribbles-about-events.md).
   * Looks like: `source:artifact:artifact:data`. With first artifact most generic and second one more specific
   * :artifact: can be nested. Ex: `windows:registry:explorer:programcache`
   */
  data_type: string;
  /**Include any other valid JSON data */
  [ key: string ]: unknown;
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
  SAFARI_HISTORY = "safari-history",
  GATEKEEPER = "gatekeeper",

  AMCACHE = "amcache",
  SHIMCACHE = "shimcache",
  PREFETCH = "prefetch",
  BITS = "bits",
  EVENTLOGS = "eventlogs",
  JUMPLISTS = "jumplists",
  SHORTCUTS = "shortcuts",
  RECYCLEBIN = "recyclebin",
  REGISTRY = "registry",
  SHELLBAGS = "shellbags",
  SERVICES = "services",
  RAWFILES = "rawfiles",
  SHIMDB = "shimdb",
  SRUM = "srum",
  SEARCH = "search",
  TASKS = "tasks",
  USERASSIST = "userassist",
  USERS_WINDOWS = "users-windows",
  USNJRNL = "usnjrnl",
  WMIPERSIST = "wmipersist",
  LOGONS_WINDOWS = "logons-windows",
  JOURNALS = "journals",
  SUDOLOGS_LINUX = "sudologs-linux",
  CHROMIUM_HISTORY = "chromium-history",
  CHROME_HISTORY = "chrome-history",
  EDGE_HISTORY = "edge-history",
  RPM = "rpm",
  VSCODE_FILEHISTORY = "vscode-filehistory",
  LIBREOFFICE_RECENTFILES = "libreoffice-recentfils",
  ABRT = "abrt",
  GNOME_EXTENSIONS = "gnome-extensions",
  GNOME_VIRTUAL_FILESYSTEM = "gnome-virtual-filesystem",
  GNOME_APPLICATION_USAGE = "gnome-application-usage",
}
