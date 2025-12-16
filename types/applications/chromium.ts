import { Url } from "../http/unfold";
import { LevelDbEntry } from "./level";

/**
 * Chromium history is stored in a SQLITE file.
 * `artemis` uses the `sqlite` crate to read the SQLITE file. It can even read the file if Chromium is running.
 *
 * References:
 *  - https://en.wikiversity.org/wiki/Chromium_browsing_history_database
 *  - https://gist.github.com/dropmeaword/9372cbeb29e8390521c2
 */

/**
 * An interface representing the Chromium SQLITE tables: `urls` and `visits`
 */
export interface ChromiumHistory {
  /**Row ID value */
  id: number;
  /**Page URL */
  url: string;
  /**Page title */
  title: string;
  /**Page visit count */
  visit_count: number;
  /**Typed count value */
  typed_count: number;
  /**Last visit time*/
  last_visit_time: string;
  /**Hidden value */
  hidden: number;
  /**Visits ID value */
  visits_id: number;
  /**From visit value */
  from_visit: number;
  /**Transition value */
  transition: number;
  /**Segment ID value */
  segment_id: number;
  /**Visit duration value */
  visit_duration: number;
  /**Opener visit value */
  opener_visit: number;
  unfold: Url | undefined;
  /**Path to the HISTORY sqlite file */
  db_path: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "URL Visited";
  artifact: "URL History";
  data_type: string;
  browser: BrowserType;
}

/**
 * An interface representing the Chromium SQLITE tables: `downloads` and  `downloads_url_chains`
 */
export interface ChromiumDownloads {
  /**Row ID */
  id: number;
  /**GUID for download */
  guid: string;
  /**Path to download */
  current_path: string;
  /**Target path to download */
  target_path: string;
  /**Download start time */
  start_time: string;
  /**Bytes downloaded */
  received_bytes: number;
  /**Total bytes downloaded */
  total_bytes: number;
  /**State value */
  state: number;
  /**Danger type value */
  danger_type: number;
  /**Interrupt reason value */
  interrupt_reason: number;
  /**Raw byte hash value */
  hash: number[];
  /**Download end time */
  end_time: string;
  /**Opened value */
  opened: number;
  /**Last access time */
  last_access_time: string;
  /**Transient value */
  transient: number;
  /**Referer URL */
  referrer: string;
  /**Download source URL */
  site_url: string;
  /**Tab URL */
  tab_url: string;
  /**Tab referrer URL */
  tab_referrer_url: string;
  /**HTTP method used */
  http_method: string;
  /**By ext ID value */
  by_ext_id: string;
  /**By ext name value */
  by_ext_name: string;
  /**Etag value */
  etag: string;
  /**Last modified time */
  last_modified: string;
  /**MIME type value */
  mime_type: string;
  /**Original mime type value */
  original_mime_type: string;
  /**Downloads URL chain ID value */
  downloads_url_chain_id: number;
  /**Chain index value */
  chain_index: number;
  /**URL for download */
  url: string;
  /**Path to the HISTORY sqlite file */
  db_path: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "File Download Start";
  artifact: "File Download";
  data_type: string;
  browser: BrowserType;
}

export interface ChromiumCookies {
  creation: string;
  host_key: string;
  top_frame_site_key: string;
  name: string;
  value: string;
  /**This value is currently Base64 encoded */
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
  is_same_party: number;
  last_update: string;
  db_path: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "Cookie Expires";
  artifact: "Website Cookie";
  data_type: string;
  browser: BrowserType;
}

export interface ChromiumFavicons {
  last_update: string;
  url: string;
  page_url: string;
  db_path: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "Favicon Updated";
  artifact: "Website Favicon";
  data_type: string;
  browser: BrowserType;
}

export interface ChromiumShortcuts {
  last_update: string;
  url: string;
  text: string;
  contents: string;
  fill_into_edit: string;
  shortcut_id: string;
  keyword: string;
  shortcut_type: ShortcutType;
  db_path: string;
  description: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "Shortcut Last Access";
  artifact: "Website Shortcut";
  data_type: string;
  browser: BrowserType;
}

/// From: https://chromium.googlesource.com/chromium/src/+/refs/heads/main/components/omnibox/browser/autocomplete_match_type.h#30
export enum ShortcutType {
  Typed = "URL Typed",
  History = "URL History",
  HistoryTitle = "History Title",
  HistoryBody = "History Body",
  HistoryKeyword = "History Keyword",
  Suggest = "Suggested URL",
  SearchUrl = "URL Searched",
  SearchHistory = "Search History",
  SearchSuggest = "Search Suggestion",
  SearchTail = "Search Suggestion Tail",
  SearchPersonalized = "Search Personalization",
  SearchProfile = "Search Google+", // lol
  SearchEngine = "Search with other Engine",
  ExtensionApp = "Extension Application",
  UserContact = "User Contact",
  Bookmark = "Browser bookmark",
  SuggestPersonalized = "Personlized Suggestion",
  Calculator = "Calculator",
  Clipboard = "Clipboard URL",
  Voice = "Voice Suggestion",
  Physical = "Physical Web",
  PhysicalOverflow = "Multiple physical web",
  Tab = "Tab Search",
  Document = "Document Suggestion",
  Pedal = "Pedal Match",
  ClipboardText = "Clipboard text",
  ClipboardImage = "Clipboard image",
  TitleSuggest = "Suggested query title",
  TitleNavSuggest = "Suggested navigation title",
  OpenTab = "Opened Tab",
  HistoryCluster = "History cluster suggestion",
  Null = "Null suggestion",
  Starter = "URL suggestion for starter keyword",
  MostVisited = "Most visited site",
  Repeatable = "Organic Repeatable Query",
  HistoryEmbed = "Past page embedded in query",
  Enterprise = "Search Enterprise policy",
  TabGroup = "Tab group",
  HistoryEmbedAnswers = "History embedded answers",
  SearchSuggestEntity = "Search suggestion for entity",
  Unkonwn = "Unknown",
}

export interface ChromiumAutofill {
  name?: string;
  value?: string;
  value_lower?: string;
  date_created: string;
  date_last_used: string;
  /**Default is 1 */
  count: number;
  db_path: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "Autofill Created";
  artifact: "Website Autofill";
  data_type: string;
  browser: BrowserType;
}

export interface ChromiumBookmarks {
  date_added: string;
  date_last_used: string;
  guid: string;
  id: number;
  name: string;
  type: string;
  url: string;
  bookmark_type: BookmarkType;
  path: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "Bookmark Added";
  artifact: "Browser Bookmark";
  data_type: string;
  browser: BrowserType;
}

export enum BookmarkType {
  Bar = "Bookmark Bar",
  Sync = "Synced",
  Other = "Other",
  Unknown = "Unknown",
}

export interface ChromiumLogins {
  origin_url: string;
  action_url?: string;
  username_element?: string;
  username_value?: string;
  password_element?: string;
  password_value?: string;
  submit_element?: string;
  signon_realm: string;
  date_created: string;
  blacklisted_by_user: number;
  scheme: number;
  password_type?: number;
  times_used?: number;
  form_data?: string;
  display_name?: string;
  icon_url?: string;
  federation_url?: string;
  skip_zero_click?: number;
  generation_upload_status?: number;
  possible_username_pairs?: string;
  id: number;
  date_last_used: string;
  moving_blocked_for?: string;
  date_password_modified: string;
  sender_email?: string;
  sender_name?: string;
  date_received?: string;
  sharing_notification_display: number;
  keychain_identifier?: string;
  sender_profile_image_url?: string;
  db_path: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "Last Login";
  artifact: "Website Login";
  data_type: string;
  browser: BrowserType;
}

/**
 * Detect Incidental Party State (DIPS) collects metrics on websites
 */
export interface ChromiumDips {
  site: string;
  first_site_storage?: string | null;
  last_site_storage?: string | null;
  first_user_interaction?: string | null;
  last_user_interaction?: string | null;
  first_stateful_bounce?: string | null;
  last_stateful_bounce?: string | null;
  first_bounce?: string | null;
  last_bounce?: string | null;
  first_web_authn_assertion: string | null;
  last_web_authn_assertion: string | null;
  /**Path to DIPS database */
  path: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "First Interaction";
  artifact: "Browser DIPS";
  data_type: string;
  browser: BrowserType;
}

export interface ChromiumProfiles {
  full_path: string;
  version: string;
  browser: BrowserType;
}

export enum BrowserType {
  CHROME = "Google Chrome",
  EDGE = "Microsoft Edge",
  CHROMIUM = "Google Chromium",
  COMET = "Perplexity Comet",
  BRAVE = "Brave",
}

export enum ChromiumCookieType {
  Unknown = "Unknown",
  Http = "HTTP",
  Script = "Script",
  Other = "Other",
}

/**
 * Object representing a Local Storage LevelDb entry.  
 * This object is Timesketch compatible.  It does **not** need to be timelined
 */
export interface ChromiumLocalStorage extends LevelDbEntry {
  version: string;
  message: string;
  datetime: string;
  browser: BrowserType;
  timestamp_desc: "Local Storage Entry Write" | "Local Storage Write Ahead Log";
  artifact: "Level Database";
  data_type: "applications:leveldb:entry";
}

export interface ChromiumSession {
  version: string;
  message: string;
  datetime: string;
  browser: BrowserType;
  timestamp_desc: "Last Active";
  artifact: "Browser Session";
  data_type: string;
  session_id: string;
  last_active: string;
  url: string;
  title: string;
  session_type: SessionType;
  path: string;
}

export enum SessionType {
  Session = "Session",
  Tab = "Tab",
}

/**
 * Browsers developers can add more
 * Default list is at: https://source.chromium.org/chromium/chromium/src/+/main:components/sessions/core/session_service_commands.cc;l=28;drc=38321ee39cd73ac2d9d4400c56b90613dee5fe29
 */
export enum SessionCommand {
  WindowType = "WindowType",
  UpdateTabNavigation = "UpdateTabNavigation",
  TabWindow = "TabWindow",
  WindowBounds = "WindowBounds",
  TabIndexInWindow = "TabIndexInWindow",
  TabNavigationPathPrunedFromBack = "TabNavigationPathPrunedFromBack",
  SelectedNavigationIndex = "SelectedNavigationIndex",
  SelectedTabInIndex = "SelectedTabInIndex",
  WindowBounds2 = "WindowBounds2",
  TabNavigationPathPrunedFromFront = "TabNavigationPathPrunedFromFront",
  PinnedState = "PinnedState",
  ExtensionAppID = "ExtensionAppID",
  WindowBounds3 = "WindowBounds3",
  WindowAppName = "WindowAppName",
  TabClosed = "TabClosed",
  WindowClosed = "WindowClosed",
  TabUserAgentOverride = "TabUserAgentOverride",
  SessionStorageAssociated = "SessionStorageAssociated",
  ActiveWindow = "ActiveWindow",
  LastActiveTime = "LastActiveTime",
  WindowWorkspace = "WindowWorkspace",
  WindowWorkspace2 = "WindowWorkspace2",
  TabNavigationPathPruned = "TabNavigationPathPruned",
  TabGroup = "TabGroup",
  TabGroupMetadata = "TabGroupMetadata",
  TabGroupMetadata2 = "TabGroupMetadata2",
  TabGuid = "TabGuid",
  TabUserAgentOverride2 = "TabUserAgentOverride2",
  TabData = "TabData",
  WindowUserTitle = "WindowUserTitle",
  WindowVisibleOnAllWorkspaces = "WindowVisibleOnAllWorkspaces",
  AddTabExtraData = "AddTabExtraData",
  AddWindowExtraData = "AddWindowExtraData",
  PlatformSessionId = "PlatformSessionId",
  SplitTab = "SplitTab",
  SplitTabData = "SplitTabData",
  Unknown = "Unknown",
  CommandStorageBackend = "CommandStorageBackend",
  EdgeCommand = "EdgeCommand",
  EdgeCommand2 = "EdgeCommand2",
  EdgeCommand3 = "EdgeCommand3",
  EdgeCommand4 = "EdgeCommand4",
}

/// https://github.com/cclgroupltd/ccl_chromium_reader/blob/552516720761397c4d482908b6b8b08130b313a1/ccl_chromium_reader/ccl_chromium_snss2.py#L39
export enum SessionTabCommand {
  SelectedNavigtionInTab = "SelectedNavigationInTab",
  UpdateTabNavigation = "UpdateTabNavigation",
  RestoredEntry = "RestoredEntry",
  WindowDeprecated = "WindowDeprecated",
  PinnedState = "PinnedState",
  ExtensionAppID = "ExtensionAppID",
  WindowAppName = "WindowAppName",
  TabUserAgentOverride = "TabUserAgentOverride",
  Window = "Window",
  TabGroupData = "TabGroupData",
  TabUserAgentOverride2 = "TabUserAgentOverride2",
  WindowUserTitle = "WindowUserTitle",
  CreateGroup = "CreateGroup",
  AddTabExtraData = "AddTabExtraData",
  Unknown = "Unknown",
  CommandStorageBackend = "CommandStorageBackend",
}

export interface Preferences {
  version: string;
  message: string;
  datetime: string;
  browser: BrowserType;
  timestamp_desc: "Last Modified";
  artifact: "User Preferences";
  data_type: string;
  path: string;
  exception_category: ExceptionCategory;
  created_version: string;
  profile_id: string;
  preferences_created: string;
  name: string;
  url: string;
  last_modified: string;
}

export enum ExceptionCategory {
  AppBanner = "App Banner",
  ClientHints = "Client Hints",
  CookieControls = "Cookie Controls",
  HttpsEnforced = "HTTPS Enforced",
  MediaEngagement = "Media Engagement",
  SiteEngagement = "Site Engagement",
  SslCert = "SSL Cert Desicions",
  Zoom = "Zoom Level",
}

export interface Extension {
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  browser: BrowserType;
  timestamp_desc: "Extension Created";
  artifact: "Browser Extension";
  data_type: string;
  name: string;
  author: string;
  description: string;
  manifest: string;
  extension_version: string;
}