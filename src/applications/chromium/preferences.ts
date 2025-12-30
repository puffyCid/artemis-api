import { glob, PlatformType, readTextFile } from "../../../mod";
import { BrowserType, ChromiumProfiles, ExceptionCategory, Preferences } from "../../../types/applications/chromium";
import { FileError } from "../../filesystem/errors";
import { unixEpochToISO, webkitToUnixEpoch } from "../../time/conversion";

/**
 * Get Chromium Preferences
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @returns Array of Preferences
 */
export function chromiumPreferences(paths: ChromiumProfiles[], platform: PlatformType): Preferences[] {
    let hits: Preferences[] = [];

    for (const path of paths) {
        let full_path = `${path.full_path}/*/Preferences`;

        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\*\\Preferences`;
        }
        const pref_paths = glob(full_path);
        if (pref_paths instanceof FileError) {
            continue;
        }

        for (const entry of pref_paths) {
            const pref = readTextFile(entry.full_path);
            if (pref instanceof FileError) {
                console.warn(`could not read file ${entry.full_path}: ${pref}`);
                continue;
            }

            const data = JSON.parse(pref);
            const user_pref: Preferences = {
                version: path.version,
                message: "",
                datetime: "",
                browser: path.browser,
                timestamp_desc: "Last Modified",
                artifact: "User Preferences",
                data_type: `applications:${path.browser.toLowerCase()}:preferences:entry`,
                path: entry.full_path,
                exception_category: ExceptionCategory.Zoom,
                created_version: "",
                profile_id: "",
                preferences_created: "",
                name: "",
                url: "",
                last_modified: ""
            };

            // Sites with zoomed preferences first
            const zoom_values = zoomPrefs(data, user_pref);
            const profile = data["profile"] as undefined | Profile;
            if (profile === undefined) {
                continue;
            }

            const profile_info = profileInfo(profile, user_pref);
            const sample = profile_info.at(0);
            if (sample !== undefined) {
                for (let i = 0; i < zoom_values.length; i++) {
                    const value = zoom_values[i];
                    if (value === undefined) {
                        continue;
                    }
                    value.created_version = sample.created_version;
                    value.preferences_created = sample.preferences_created;
                    value.profile_id = sample.profile_id;
                    value.name = sample.name;
                }
            }

            hits = hits.concat(zoom_values);
            hits = hits.concat(profile_info);
        }
    }
    return hits;
}

function zoomPrefs(data: Record<string, Record<string, Record<string, Record<string, Record<string, string>>>>>, prefs: Preferences): Preferences[] {
    const values: Preferences[] = [];

    const partitions = data["partition"];
    if (partitions === undefined) {
        return values;
    }
    const levels = partitions["per_host_zoom_levels"];
    if (levels === undefined) {
        return values;
    }

    const urls = levels["x"];
    if (urls === undefined) {
        return values;
    }

    for (const key in urls) {
        prefs.url = key;
        const data = urls[key];
        if (data === undefined) {
            continue;
        }
        prefs.last_modified = unixEpochToISO(webkitToUnixEpoch(Number(BigInt(data["last_modified"] ?? 0n) / 1000000n)));
        prefs.datetime = prefs.last_modified;
        prefs.message = key;
        values.push(Object.assign({}, prefs));
    }

    return values;
}

interface Profile {
    "created_by_version": string;
    "creation_time": string;
    "edge_profile_id": string | undefined;
    "enterprise_profile_guid": string | undefined;
    name: string;
    "content_settings": {
        exceptions: {
            "app_banner": Record<string, {
                "last_modified": string;
            }>,
            "client_hints": Record<string, {
                "last_modified": string;
            }>,
            "cookie_controls_metadata": Record<string, {
                "last_modified": string;
            }>,
            "https_enforced": Record<string, {
                "last_modified": string;
            }>,
            "media_engagement": Record<string, {
                "last_modified": string;
            }>,
            "site_engagement": Record<string, {
                "last_modified": string;
            }>,
            "ssl_cert_decisions": Record<string, {
                "last_modified": string;
            }>,
        };
    } | undefined;
}

function profileInfo(data: Profile, pref: Preferences): Preferences[] {
    pref.created_version = data.created_by_version;
    pref.name = data.name;
    pref.preferences_created = unixEpochToISO(webkitToUnixEpoch(Number(BigInt(data.creation_time) / 1000000n)));
    pref.profile_id = data.edge_profile_id ?? data.enterprise_profile_guid ?? "";

    const values: Preferences[] = [];
    if (data.content_settings === undefined) {
        return [Object.assign({}, pref)];
    }
    const banner = data.content_settings.exceptions.app_banner;
    for (const key in banner) {
        pref.url = key;
        pref.message = key;
        pref.exception_category = ExceptionCategory.AppBanner;
        pref.last_modified = unixEpochToISO(webkitToUnixEpoch(Number(BigInt(banner[key]?.last_modified ?? 0) / 1000000n)));
        pref.datetime = pref.last_modified;
        values.push(Object.assign({}, pref));
    }

    const hints = data.content_settings.exceptions.client_hints;
    for (const key in hints) {
        pref.url = key;
        pref.message = key;
        pref.exception_category = ExceptionCategory.ClientHints;
        pref.last_modified = unixEpochToISO(webkitToUnixEpoch(Number(BigInt(hints[key]?.last_modified ?? 0) / 1000000n)));
        pref.datetime = pref.last_modified;
        values.push(Object.assign({}, pref));
    }

    const cookie = data.content_settings.exceptions.cookie_controls_metadata;
    for (const key in cookie) {
        pref.url = key;
        pref.message = key;
        pref.exception_category = ExceptionCategory.CookieControls;
        pref.last_modified = unixEpochToISO(webkitToUnixEpoch(Number(BigInt(cookie[key]?.last_modified ?? 0) / 1000000n)));
        pref.datetime = pref.last_modified;
        values.push(Object.assign({}, pref));
    }

    const https = data.content_settings.exceptions.https_enforced;
    for (const key in https) {
        pref.url = key;
        pref.message = key;
        pref.exception_category = ExceptionCategory.HttpsEnforced;
        pref.last_modified = unixEpochToISO(webkitToUnixEpoch(Number(BigInt(https[key]?.last_modified ?? 0) / 1000000n)));
        pref.datetime = pref.last_modified;
        values.push(Object.assign({}, pref));
    }

    const media = data.content_settings.exceptions.media_engagement;
    for (const key in media) {
        pref.url = key;
        pref.message = key;
        pref.exception_category = ExceptionCategory.MediaEngagement;
        pref.last_modified = unixEpochToISO(webkitToUnixEpoch(Number(BigInt(media[key]?.last_modified ?? 0) / 1000000n)));
        pref.datetime = pref.last_modified;
        values.push(Object.assign({}, pref));
    }

    const site = data.content_settings.exceptions.site_engagement;
    for (const key in site) {
        pref.url = key;
        pref.message = key;
        pref.exception_category = ExceptionCategory.SiteEngagement;
        pref.last_modified = unixEpochToISO(webkitToUnixEpoch(Number(BigInt(site[key]?.last_modified ?? 0) / 1000000n)));
        pref.datetime = pref.last_modified;
        values.push(Object.assign({}, pref));
    }

    const ssl = data.content_settings.exceptions.ssl_cert_decisions;
    for (const key in ssl) {
        pref.url = key;
        pref.message = key;
        pref.exception_category = ExceptionCategory.SslCert;
        pref.last_modified = unixEpochToISO(webkitToUnixEpoch(Number(BigInt(ssl[key]?.last_modified ?? 0) / 1000000n)));
        pref.datetime = pref.last_modified;
        values.push(Object.assign({}, pref));
    }

    return values;
}

/**
 * Function to test the Chromium Preferences file parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Chromium Preferences parsing
 */
export function testChromiumPreferences(): void {
    const path: ChromiumProfiles = {
        full_path: "../../test_data/edge",
        version: "141",
        browser: BrowserType.EDGE
    };

    const pref = chromiumPreferences([path], PlatformType.Darwin);
    if (pref.length !== 36 || pref[0] === undefined) {
        throw `Got length ${pref.length} expected 36.......chromiumPreferences ❌`;
    }

    if (pref[1]?.message !== "https://github.com:443,*") {
        throw `Got message ${pref[1]?.message} expected "https://github.com:443,*".......chromiumPreferences ❌`;
    }

    console.info(`  Function chromiumPreferences ✅`);

    const zoom = zoomPrefs({}, pref[0]);
    if (zoom.length !== 0) {
        throw `Got length ${zoom.length} expected 0.......zoomPrefs ❌`;
    }

    console.info(`  Function zoomPrefs ✅`);

    const info = profileInfo({
        created_by_version: "",
        creation_time: "",
        edge_profile_id: undefined,
        enterprise_profile_guid: undefined,
        name: "",
        content_settings: undefined
    }, pref[0]);

    if (info.length !== 1) {
        throw `Got length ${info.length} expected 1.......profileInfo ❌`;
    }

    console.info(`  Function profileInfo ✅`);
}