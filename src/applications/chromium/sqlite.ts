import { ChromiumProfiles, ChromiumHistory, ChromiumDownloads, ChromiumCookies, ChromiumAutofill, ChromiumLogins, ChromiumDips, ChromiumCookieType } from "../../../types/applications/chromium";
import { FileError } from "../../filesystem/errors";
import { glob } from "../../filesystem/files";
import { PlatformType } from "../../system/systeminfo";
import { unixEpochToISO, webkitToUnixEpoch } from "../../time/conversion";
import { Unfold } from "../../unfold/client";
import { UnfoldError } from "../../unfold/error";
import { ApplicationError } from "../errors";
import { querySqlite } from "../sqlite";

/**
 * Get Chromium history for users
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @param unfold Enable unfold parsing
 * @param query SQL query to run
 * @returns Array of `ChromiumHistory`
 */
export function chromiumHistory(paths: ChromiumProfiles[], platform: PlatformType, unfold: boolean, query: string): ChromiumHistory[] {
    const hits: ChromiumHistory[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/*/History`;


        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\*\\History`;
        }
        const glob_paths = glob(full_path);
        if (glob_paths instanceof FileError) {
            console.warn(`Failed to glob ${full_path}: ${glob_paths}`);
            continue;
        }

        for (const entry_path of glob_paths) {
            const results = querySqlite(entry_path.full_path, query);
            if (results instanceof ApplicationError) {
                console.warn(`Failed to query ${entry_path.full_path}: ${results}`);
                continue;
            }
            let client: Unfold | undefined = undefined;
            if (unfold) {
                client = new Unfold();
            }

            // Loop through history rows
            for (const entry of results) {
                const adjust = 1000000;
                const webkit = webkitToUnixEpoch(
                    (entry[ "last_visit_time" ] as number ?? 0) / adjust,
                );
                const history_row: ChromiumHistory = {
                    id: entry[ "id" ] as number ?? 0,
                    url: entry[ "url" ] as string ?? "",
                    title: entry[ "title" ] as string ?? "",
                    visit_count: entry[ "visit_count" ] as number ?? 0,
                    typed_count: entry[ "typed_count" ] as number ?? 0,
                    last_visit_time: unixEpochToISO(webkit),
                    hidden: entry[ "hidden" ] as number ?? 0,
                    visits_id: entry[ "visits_id" ] as number ?? 0,
                    from_visit: entry[ "from_visit" ] as number ?? 0,
                    transition: entry[ "transition" ] as number ?? 0,
                    segment_id: entry[ "segment_id" ] as number ?? 0,
                    visit_duration: entry[ "visit_duration" ] as number ?? 0,
                    opener_visit: entry[ "opener_visit" ] as number ?? 0,
                    unfold: undefined,
                    db_path: entry_path.full_path,
                    version: path.version,
                    message: entry[ "url" ] as string ?? "",
                    datetime: unixEpochToISO(webkit),
                    timestamp_desc: "URL Visited",
                    artifact: "URL History",
                    data_type: `applications:${path.browser.toLowerCase()}:history:entry`,
                    browser: path.browser,
                };

                if (unfold && typeof client !== 'undefined') {
                    const result = client.parseUrl(history_row.url);
                    if (!(result instanceof UnfoldError)) {
                        history_row.unfold = result;
                    }
                }

                hits.push(history_row);
            }
        }


    }

    return hits;
}

/**
 * Get Chromium downloads for users
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @param query SQL query to run
 * @param browser Chromium based browser type
 * @returns Array of `ChromiumDownloads`
 */
export function chromiumDownloads(paths: ChromiumProfiles[], platform: PlatformType, query: string): ChromiumDownloads[] {
    const hits: ChromiumDownloads[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/*/History`;


        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\*\\History`;
        }
        const glob_paths = glob(full_path);
        if (glob_paths instanceof FileError) {
            console.warn(`Failed to glob ${full_path}: ${glob_paths}`);
            continue;
        }
        for (const entry_path of glob_paths) {
            const results = querySqlite(entry_path.full_path, query);
            if (results instanceof ApplicationError) {
                console.warn(`Failed to query ${entry_path.full_path}: ${results}`);
                continue;
            }
            // Loop through downloads rows
            for (const entry of results) {
                const adjust = 1000000;
                const start = webkitToUnixEpoch(
                    (entry[ "start_time" ] as number ?? 0) / adjust,
                );
                const end = webkitToUnixEpoch(
                    (entry[ "end_time" ] as number ?? 0) / adjust,
                );
                const access = webkitToUnixEpoch(
                    (entry[ "last_access_time" ] as number ?? 0) / adjust,
                );
                const download_row: ChromiumDownloads = {
                    id: entry[ "id" ] as number ?? 0,
                    guid: entry[ "guid" ] as string ?? "",
                    current_path: entry[ "current_path" ] as string ?? "",
                    target_path: entry[ "target_path" ] as string ?? "",
                    start_time: unixEpochToISO(start),
                    received_bytes: entry[ "received_bytes" ] as number ?? 0,
                    total_bytes: entry[ "total_bytes" ] as number ?? 0,
                    state: entry[ "state" ] as number ?? 0,
                    danger_type: entry[ "danger_type" ] as number ?? 0,
                    interrupt_reason: entry[ "interrupt_reason" ] as number ?? 0,
                    hash: entry[ "hash" ] as number[] ?? [],
                    end_time: unixEpochToISO(end),
                    opened: entry[ "opened" ] as number ?? 0,
                    last_access_time: unixEpochToISO(access),
                    transient: entry[ "transient" ] as number ?? 0,
                    referrer: entry[ "referrer" ] as string ?? "",
                    site_url: entry[ "site_url" ] as string ?? "",
                    tab_url: entry[ "tab_url" ] as string ?? "",
                    tab_referrer_url: entry[ "tab_referrer_url" ] as string ?? "",
                    http_method: entry[ "http_method" ] as string ?? "",
                    by_ext_id: entry[ "by_ext_id" ] as string ?? "",
                    by_ext_name: entry[ "by_ext_name" ] as string ?? "",
                    etag: entry[ "etag" ] as string ?? "",
                    last_modified: entry[ "last_modified" ] as string ?? "",
                    mime_type: entry[ "mime_type" ] as string ?? "",
                    original_mime_type: entry[ "original_mime_type" ] as string ?? "",
                    downloads_url_chain_id: entry[ "downloads_url_chain_id" ] as number ?? 0,
                    chain_index: entry[ "chain_index" ] as number ?? 0,
                    url: entry[ "url" ] as string ?? "",
                    db_path: entry_path.full_path,
                    version: path.version,
                    message: `${entry[ "url" ] as string ?? ""} | ${entry[ "target_path" ] as string ?? ""}`,
                    datetime: unixEpochToISO(start),
                    timestamp_desc: "File Download Start",
                    artifact: "File Download",
                    data_type: `applications:${path.browser.toLowerCase()}:downloads:entry`,
                    browser: path.browser,
                };
                hits.push(download_row);
            }
        }
    }

    return hits;
}

/**
 * Get Chromium downloads for users
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @param query SQL query to run
 * @returns Array of `ChromiumCookies`
 */
export function chromiumCookies(paths: ChromiumProfiles[], platform: PlatformType, query: string): ChromiumCookies[] {
    const hits: ChromiumCookies[] = [];
    for (const path of paths) {
        let full_paths = [ `${path.full_path}/*/Cookies`, `${path.full_path}/*/Network/Cookies` ];

        if (platform === PlatformType.Windows) {
            full_paths = [ `${path.full_path}\\*\\Network\\Cookies`, `${path.full_path}\\*\\Cookies` ];
        }


        for (const full_path of full_paths) {
            const glob_paths = glob(full_path);
            if (glob_paths instanceof FileError) {
                console.warn(`Failed to glob ${full_path}: ${glob_paths}`);
                continue;
            }
            for (const entry_path of glob_paths) {
                const results = querySqlite(entry_path.full_path, query);
                if (results instanceof ApplicationError) {
                    console.warn(`Failed to query ${entry_path.full_path}: ${results}`);
                    continue;
                }
                // Loop through cookies rows
                const adjust_time = 1000000n;
                for (const entry of results) {
                    const cookie_entry: ChromiumCookies = {
                        creation: unixEpochToISO(webkitToUnixEpoch(
                            Number(BigInt(entry[ "creation_utc" ] as bigint) / adjust_time)
                        )),
                        host_key: entry[ "host_key" ] as string,
                        top_frame_site_key: entry[ "top_frame_site_key" ] as string | undefined ?? "",
                        name: entry[ "name" ] as string | undefined ?? "",
                        value: entry[ "value" ] as string | undefined ?? "",
                        encrypted_value: entry[ "encrypted_value" ] as string,
                        path: entry[ "path" ] as string | undefined ?? "",
                        expires: unixEpochToISO(webkitToUnixEpoch(
                            Number(BigInt(entry[ "expires_utc" ] as bigint) / adjust_time)
                        )),
                        is_secure: !!(entry[ "is_secure" ] as number),
                        is_httponly: !!(entry[ "is_httponly" ] as number),
                        last_access: unixEpochToISO(webkitToUnixEpoch(
                            Number(BigInt(entry[ "last_access_utc" ] as bigint) / adjust_time)
                        )),
                        has_expires: !!(entry[ "has_expires" ] as number),
                        is_persistent: !!(entry[ "is_persistent" ] as number),
                        priority: entry[ "priority" ] as number,
                        samesite: entry[ "samesite" ] as number,
                        source_scheme: entry[ "source_scheme" ] as number,
                        source_port: entry[ "source_port" ] as number,
                        is_same_party: entry[ "is_same_party" ] as number | undefined ?? 0,
                        last_update: unixEpochToISO(webkitToUnixEpoch(
                            Number(BigInt(entry[ "last_update_utc" ] as bigint) / adjust_time)
                        )),
                        db_path: entry_path.full_path,
                        version: path.version,
                        message: `Cookie name: ${entry[ "name" ] as string} | value: ${entry[ "value" ] as string | undefined ?? ""}`,
                        datetime: unixEpochToISO(webkitToUnixEpoch(
                            Number(BigInt(entry[ "expires_utc" ] as bigint) / adjust_time)
                        )),
                        timestamp_desc: "Cookie Expires",
                        artifact: "Website Cookie",
                        data_type: `applications:${path.browser.toLowerCase()}:cookies:entry`,
                        browser: path.browser,
                    };
                    hits.push(cookie_entry);
                }
            }

        }
    }
    return hits;
}

/**
 * Determine Cookie Type. From `https://chromium.googlesource.com/chromium/src/net/+/refs/heads/main/cookies/cookie_constants.h#378`
 * @param source Cookie source_type column
 * @returns `ChromiumCookieType` enum value
 */
export function getChromiumCookieType(source: number): ChromiumCookieType {
    switch (source) {
        case 0: return ChromiumCookieType.Unknown;
        case 1: return ChromiumCookieType.Http;
        case 2: return ChromiumCookieType.Script;
        case 3: return ChromiumCookieType.Other;
        default: return ChromiumCookieType.Unknown;
    }
}


/**
 * Function to extract Autofill information from database
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @param query SQL query to run
 * @returns Array of `ChromiumAutofill`
 */
export function chromiumAutofill(paths: ChromiumProfiles[], platform: PlatformType, query: string): ChromiumAutofill[] {
    const hits: ChromiumAutofill[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/*/Web Data`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\*\\Web Data`;
        }

        const glob_paths = glob(full_path);
        if (glob_paths instanceof FileError) {
            console.warn(`Failed to glob ${full_path}: ${glob_paths}`);
            continue;
        }

        for (const entry_path of glob_paths) {
            const results = querySqlite(entry_path.full_path, query);
            if (results instanceof ApplicationError) {
                console.warn(`Failed to query ${entry_path.full_path}: ${results}`);
                continue;
            }

            for (const entry of results) {
                const fill_entry: ChromiumAutofill = {
                    db_path: entry_path.full_path,
                    date_created: unixEpochToISO(entry[ "date_created" ] as number),
                    date_last_used: unixEpochToISO(entry[ "date_last_used" ] as number),
                    count: entry[ "count" ] as number,
                    name: entry[ "name" ] as string ?? "",
                    value: entry[ "value" ] as string ?? "",
                    value_lower: entry[ "value_lower" ] as string ?? "",
                    version: path.version,
                    message: `Autofill name: ${entry[ "name" ] as string ?? ""} | value: ${entry[ "value" ] as string ?? ""}`,
                    datetime: unixEpochToISO(entry[ "date_created" ] as number),
                    timestamp_desc: "Autofill Created",
                    artifact: "Website Autofill",
                    data_type: `applications:${path.browser.toLowerCase()}:autofill:entry`,
                    browser: path.browser,
                };
                hits.push(fill_entry);
            }
        }
    }
    return hits;
}

/**
 * Function to extract Autofill information from database
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @param query SQL query to run
 * @returns Array of `ChromiumLogins`
 */
export function chromiumLogins(paths: ChromiumProfiles[], platform: PlatformType, query: string): ChromiumLogins[] {
    const hits: ChromiumLogins[] = [];
    const adjust_time = 1000000n;

    for (const path of paths) {
        let full_path = `${path.full_path}/*/Login Data`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\*\\Login Data`;
        }
        const glob_paths = glob(full_path);
        if (glob_paths instanceof FileError) {
            console.warn(`Failed to glob ${full_path}: ${glob_paths}`);
            continue;
        }

        for (const entry_path of glob_paths) {
            const data = querySqlite(entry_path.full_path, query);
            if (data instanceof ApplicationError) {
                console.warn(`Failed to query ${entry_path.full_path}: ${data}`);
                continue;
            }
            // Loop through logins rows
            for (const entry of data) {
                const login_entry: ChromiumLogins = {
                    origin_url: entry[ "origin_url" ] as string,
                    signon_realm: entry[ "signon_realm" ] as string,
                    date_created: unixEpochToISO(webkitToUnixEpoch(
                        Number(BigInt(entry[ "date_created" ] as bigint) / adjust_time)
                    )),
                    blacklisted_by_user: entry[ "blacklisted_by_user" ] as number,
                    scheme: entry[ "scheme" ] as number,
                    id: entry[ "id" ] as number,
                    date_last_used: unixEpochToISO(webkitToUnixEpoch(
                        Number(BigInt(entry[ "date_last_used" ] as bigint) / adjust_time)
                    )),
                    date_password_modified: unixEpochToISO(webkitToUnixEpoch(
                        Number(BigInt(entry[ "date_password_modified" ] as bigint) / adjust_time)
                    )),
                    sharing_notification_display: entry[ "sharing_notification_display" ] as number,
                    db_path: entry_path.full_path,
                    action_url: entry[ "action_url" ] as string | undefined,
                    username_element: entry[ "username_element" ] as string | undefined,
                    username_value: entry[ "username_value" ] as string | undefined,
                    times_used: entry[ "times_used" ] as number | undefined,
                    icon_url: entry[ "icon_url" ] as string | undefined,
                    possible_username_pairs: entry[ "possible_username_pairs" ] as string |
                        undefined,
                    federation_url: entry[ "federation_url" ] as string | undefined,
                    generation_upload_status: entry[ "generation_upload_status" ] as number |
                        undefined,
                    sender_profile_image_url: entry[ "sender_profile_image_url" ] as string |
                        undefined,
                    password_element: entry[ "password_element" ] as string | undefined,
                    password_type: entry[ "password_type" ] as number | undefined,
                    password_value: entry[ "password_value" ] as string | undefined,
                    date_received: unixEpochToISO(webkitToUnixEpoch(
                        typeof entry[ "date_received" ] === "undefined"
                            ? 0
                            : Number(BigInt(entry[ "date_received" ] as bigint) / adjust_time)
                    )),
                    sender_email: entry[ "sender_email" ] as string | undefined,
                    sender_name: entry[ "sender_name" ] as string | undefined,
                    skip_zero_click: entry[ "skip_zero_click" ] as number | undefined,
                    submit_element: entry[ "submit_element" ] as string | undefined,
                    display_name: entry[ "display_name" ] as string | undefined,
                    form_data: entry[ "form_data" ] as string | undefined,
                    moving_blocked_for: entry[ "moving_blocked_for" ] as string | undefined,
                    keychain_identifier: entry[ "keychain_identifier" ] as string | undefined,
                    version: path.version,
                    message: entry[ "origin_url" ] as string,
                    datetime: unixEpochToISO(webkitToUnixEpoch(
                        Number(BigInt(entry[ "date_last_used" ] as bigint) / adjust_time)
                    )),
                    timestamp_desc: "Last Login",
                    artifact: "Website Login",
                    data_type: `applications:${path.browser.toLowerCase()}:login:entry`,
                    browser: path.browser,
                };
                hits.push(login_entry);
            }
        }
    }
    return hits;
}

/**
 * Function to extract Detect Incidental Party State (DIPS) information from database
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @param query SQL query to run
 * @returns Array of `ChromiumDips`
 */
export function chromiumDips(paths: ChromiumProfiles[], platform: PlatformType, query: string): ChromiumDips[] {
    const hits: ChromiumDips[] = [];
    const adjust_time = 1000000n;

    for (const path of paths) {
        let full_path = `${path.full_path}/*/DIPS`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\*\\DIPS`;
        }

        const glob_paths = glob(full_path);
        if (glob_paths instanceof FileError) {
            console.warn(`Failed to glob ${full_path}: ${glob_paths}`);
            continue;
        }

        for (const entry_path of glob_paths) {
            const data = querySqlite(entry_path.full_path, query);
            if (data instanceof ApplicationError) {
                console.warn(`Failed to query ${entry_path.full_path}: ${data}`);
                continue;
            }
            // Loop through logins rows
            for (const entry of data) {
                const dips_entry: ChromiumDips = {
                    site: entry[ "site" ] as string,
                    path: entry_path.full_path,
                    first_bounce: unixEpochToISO(webkitToUnixEpoch(
                        typeof entry[ "first_bounce_time" ] === "undefined" ||
                            entry[ "first_bounce_time" ] === null
                            ? 0
                            : Number(BigInt(entry[ "first_bounce_time" ] as bigint) / adjust_time)
                    )),
                    last_bounce: unixEpochToISO(webkitToUnixEpoch(
                        typeof entry[ "last_bounce_time" ] === "undefined" ||
                            entry[ "last_bounce_time" ] === null
                            ? 0
                            : Number(BigInt(entry[ "last_bounce_time" ] as bigint) / adjust_time)
                    )),
                    first_site_storage: unixEpochToISO(webkitToUnixEpoch(
                        typeof entry[ "first_site_storage_time" ] === "undefined" ||
                            entry[ "first_site_storage_time" ] === null
                            ? 0
                            : Number(
                                BigInt(entry[ "first_site_storage_time" ] as bigint) / adjust_time
                            )
                    )),
                    first_stateful_bounce: unixEpochToISO(webkitToUnixEpoch(
                        typeof entry[ "first_stateful_bounce_time" ] === "undefined" ||
                            entry[ "first_stateful_bounce_time" ] === null
                            ? 0
                            : Number(
                                BigInt(entry[ "first_stateful_bounce_time" ] as bigint) / adjust_time
                            )
                    )),
                    first_user_interaction: unixEpochToISO(webkitToUnixEpoch(
                        typeof entry[ "first_user_interaction_time" ] === "undefined" ||
                            entry[ "first_user_interaction_time" ] === null
                            ? 0
                            : Number(
                                BigInt(entry[ "first_user_interaction_time" ] as bigint) /
                                adjust_time
                            )
                    )),
                    first_web_authn_assertion: unixEpochToISO(webkitToUnixEpoch(
                        entry[ "first_web_authn_assertion_time" ] === null ? 0 : Number(
                            BigInt(entry[ "first_web_authn_assertion_time" ] as bigint) /
                            adjust_time
                        )
                    )),
                    last_site_storage: unixEpochToISO(webkitToUnixEpoch(
                        typeof entry[ "last_site_storage_time" ] === "undefined" ||
                            entry[ "last_site_storage_time" ] === null
                            ? 0
                            : Number(
                                BigInt(entry[ "last_site_storage_time" ] as bigint) / adjust_time
                            )
                    )),
                    last_stateful_bounce: unixEpochToISO(webkitToUnixEpoch(
                        typeof entry[ "last_stateful_bounce_time" ] === "undefined" ||
                            entry[ "last_stateful_bounce_time" ] === null
                            ? 0
                            : Number(
                                BigInt(entry[ "last_stateful_bounce_time" ] as bigint) / adjust_time
                            )
                    )),
                    last_user_interaction: unixEpochToISO(webkitToUnixEpoch(
                        typeof entry[ "last_user_interaction_time" ] === "undefined" ||
                            entry[ "last_user_interaction_time" ] === null
                            ? 0
                            : Number(
                                BigInt(entry[ "last_user_interaction_time" ] as bigint) / adjust_time
                            )
                    )),
                    last_web_authn_assertion: unixEpochToISO(webkitToUnixEpoch(
                        entry[ "last_web_authn_assertion_time" ] === null ? 0 : Number(
                            BigInt(entry[ "last_web_authn_assertion_time" ] as bigint) /
                            adjust_time
                        )
                    )),
                    version: path.version,
                    message: entry[ "site" ] as string,
                    datetime: unixEpochToISO(webkitToUnixEpoch(
                        typeof entry[ "first_site_storage_time" ] === "undefined" ||
                            entry[ "first_site_storage_time" ] === null
                            ? 0
                            : Number(
                                BigInt(entry[ "first_site_storage_time" ] as bigint) /
                                adjust_time
                            )
                    )),
                    timestamp_desc: "First Interaction",
                    artifact: "Browser DIPS",
                    data_type: `applications:${path.browser.toLowerCase()}:dips:entry`,
                    browser: path.browser,
                };
                hits.push(dips_entry);
            }
        }
    }
    return hits;
}