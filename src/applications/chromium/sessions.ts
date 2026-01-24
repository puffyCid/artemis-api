import { BrowserType, ChromiumProfiles, ChromiumSession, SessionCommand, SessionTabCommand, SessionType } from "../../../types/applications/chromium";
import { extractUtf16String, extractUtf8String } from "../../encoding/strings";
import { FileError } from "../../filesystem/errors";
import { glob, readFile } from "../../filesystem/files";
import { NomError } from "../../nom/error";
import { Endian, nomUnsignedEightBytes, nomUnsignedFourBytes, nomUnsignedOneBytes, nomUnsignedTwoBytes } from "../../nom/helpers";
import { take } from "../../nom/parsers";
import { PlatformType } from "../../system/systeminfo";
import { unixEpochToISO, webkitToUnixEpoch } from "../../time/conversion";
import { ApplicationError } from "../errors";

/**
 * Get Chromium sessions for all users
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @returns Array of `ChromiumSession`
 */
export function chromiumSessions(paths: ChromiumProfiles[], platform: PlatformType): ChromiumSession[] {
    let values: ChromiumSession[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/*/Sessions/*`;
        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\*\\Sessions\\*`;
        }

        const sessions = glob(full_path);
        if (sessions instanceof FileError) {
            continue;
        }
        for (const entry of sessions) {
            if (!entry.is_file) {
                continue;
            }

            let session_type = SessionType.Session;
            if (entry.full_path.includes("Tabs_")) {
                session_type = SessionType.Tab;
            }
            const status = parseSession(entry.full_path, session_type, path);
            if (status instanceof ApplicationError) {
                console.warn(`Failed to parse session for ${entry.full_path}: ${status}`);
                continue;
            }
            values = values.concat(status);
        }
    }
    return values;
}

/**
 * Function to parse a session file
 * @param path Path to a session file
 * @param session_type `SessionType` Can be `Session` or `Tab`
 * @param profile `ChromiumProfiles` object
 * @returns Array of `ChromiumSession` or `ApplicationError`
 */
function parseSession(path: string, session_type: SessionType, profile: ChromiumProfiles): ChromiumSession[] | ApplicationError {
    const bytes = readFile(path);
    if (bytes instanceof FileError) {
        return new ApplicationError(`CHROMIUM`, `Failed to read session file ${path}: ${bytes}`);
    }

    const header = getHeader(bytes);
    if (header instanceof ApplicationError) {
        return header;
    }

    const min_size = 10;
    const values: ChromiumSession[] = [];
    const session_command_values: Record<string, CommandValues> = {};
    const tab_command_values: Record<string, CommandValues> = {};
    while (header.remaining.byteLength > min_size) {
        const size = nomUnsignedTwoBytes(header.remaining, Endian.Le);
        if (size instanceof NomError) {
            break;
        }
        const payload = take(size.remaining, size.value);
        if (payload instanceof NomError) {
            break;
        }

        header.remaining = payload.remaining as Uint8Array;

        const id = nomUnsignedOneBytes(payload.nommed as Uint8Array);
        if (id instanceof NomError) {
            break;
        }

        if (session_type === SessionType.Session) {
            const command = getSessionCommand(id.value);
            parseSessionCommand(command, id.remaining, session_command_values);
        } else {
            const command = getTabCommand(id.value);
            parseTabCommand(command, id.remaining, tab_command_values);
        }
    }

    for (const session_id in session_command_values) {
        const ses: ChromiumSession = {
            version: profile.version,
            message: "",
            datetime: session_command_values[session_id]?.last_active ?? "1970-01-01T00:00:00.000Z",
            browser: profile.browser,
            timestamp_desc: "Last Active",
            artifact: "Browser Session",
            data_type: `applications:${profile.browser.toLowerCase()}:session:entry`,
            session_id,
            last_active: session_command_values[session_id]?.last_active ?? "1970-01-01T00:00:00.000Z",
            url: "",
            title: "",
            session_type: SessionType.Session,
            path,
        };
        for (const entry of session_command_values[session_id]?.commands ?? []) {
            if (entry[SessionCommand.UpdateTabNavigation] === undefined) {
                continue;
            }
            ses.url = (entry[SessionCommand.UpdateTabNavigation] as Record<string, string>)["url"] ?? ":";
            ses.title = (entry[SessionCommand.UpdateTabNavigation] as Record<string, string>)["title"] ?? "";
            ses.message = `Session: ${ses.url} | Page Title: ${ses.title}`;
            values.push(Object.assign({}, ses));
        }
    }

    for (const session_id in tab_command_values) {
        const ses: ChromiumSession = {
            version: profile.version,
            message: "",
            datetime: tab_command_values[session_id]?.last_active ?? "1970-01-01T00:00:00.000Z",
            browser: profile.browser,
            timestamp_desc: "Last Active",
            artifact: "Browser Session",
            data_type: `applications:${profile.browser.toLowerCase()}:tab:entry`,
            session_id,
            last_active: tab_command_values[session_id]?.last_active ?? "1970-01-01T00:00:00.000Z",
            url: "",
            title: "",
            session_type: SessionType.Tab,
            path,
        };
        for (const entry of tab_command_values[session_id]?.commands ?? []) {
            if (entry[SessionTabCommand.UpdateTabNavigation] === undefined) {
                continue;
            }
            ses.url = (entry[SessionTabCommand.UpdateTabNavigation] as Record<string, string>)["url"] ?? ":";
            ses.title = (entry[SessionTabCommand.UpdateTabNavigation] as Record<string, string>)["title"] ?? "";
            ses.message = `Tab: ${ses.url} | Page Title: ${ses.title}`;
            values.push(Object.assign({}, ses));
        }
    }

    return values;
}

interface Header {
    signature: number;
    version: number;
    remaining: Uint8Array;
}

/**
 * Get initial structure of the Session file. Header is used to determine the version number
 * @param bytes Session file bytes
 * @returns `Header` information about the session file
 */
function getHeader(bytes: Uint8Array): Header | ApplicationError {
    const sig = nomUnsignedFourBytes(bytes, Endian.Le);
    if (sig instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get session sig: ${sig}`);
    }
    const version = nomUnsignedFourBytes(sig.remaining, Endian.Le);
    if (version instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get session version: ${version}`);
    }

    const head: Header = {
        signature: sig.value,
        version: version.value,
        remaining: version.remaining,
    };
    return head;
}

/**
 * Determine the command associated with Session. Each command stores different kinds of data. Some store URLs, timestamps, User agents, etc
 * @param id Session ID number
 * @returns Session Command value
 */
function getSessionCommand(id: number): SessionCommand {
    switch (id) {
        case 0: return SessionCommand.TabWindow;
        case 1: return SessionCommand.WindowBounds;
        case 2: return SessionCommand.TabIndexInWindow;
        case 5: return SessionCommand.TabNavigationPathPrunedFromBack;
        case 6: return SessionCommand.UpdateTabNavigation;
        case 7: return SessionCommand.SelectedNavigationIndex;
        case 8: return SessionCommand.SelectedTabInIndex;
        case 9: return SessionCommand.WindowType;
        case 10: return SessionCommand.WindowBounds2;
        case 11: return SessionCommand.TabNavigationPathPrunedFromFront;
        case 12: return SessionCommand.PinnedState;
        case 13: return SessionCommand.ExtensionAppID;
        case 14: return SessionCommand.WindowBounds3;
        case 15: return SessionCommand.WindowAppName;
        case 16: return SessionCommand.TabClosed;
        case 17: return SessionCommand.WindowClosed;
        case 18: return SessionCommand.TabUserAgentOverride;
        case 19: return SessionCommand.SessionStorageAssociated;
        case 20: return SessionCommand.ActiveWindow;
        case 21: return SessionCommand.LastActiveTime;
        case 22: return SessionCommand.WindowWorkspace;
        case 23: return SessionCommand.WindowWorkspace2;
        case 24: return SessionCommand.TabNavigationPathPruned;
        case 25: return SessionCommand.TabGroup;
        case 26: return SessionCommand.TabGroupMetadata;
        case 27: return SessionCommand.TabGroupMetadata2;
        case 28: return SessionCommand.TabGuid;
        case 29: return SessionCommand.TabUserAgentOverride2;
        case 30: return SessionCommand.TabData;
        case 31: return SessionCommand.WindowUserTitle;
        case 32: return SessionCommand.WindowVisibleOnAllWorkspaces;
        case 33: return SessionCommand.AddTabExtraData;
        case 34: return SessionCommand.AddWindowExtraData;
        case 35: return SessionCommand.PlatformSessionId;
        case 36: return SessionCommand.SplitTab;
        case 37: return SessionCommand.SplitTabData;
        // Chromium browsers can make there own custom commands
        // https://github.com/cclgroupltd/ccl_chromium_reader/blob/552516720761397c4d482908b6b8b08130b313a1/ccl_chromium_reader/ccl_chromium_snss2.py#L95
        case 131: return SessionCommand.EdgeCommand;
        case 132: return SessionCommand.EdgeCommand2;
        case 44: return SessionCommand.EdgeCommand3;
        case 50: return SessionCommand.EdgeCommand4;
        case 255: return SessionCommand.CommandStorageBackend;
        default: {
            console.info(`Unknown session command ${id}`);
            return SessionCommand.Unknown;
        }
    }
}

/**
 * Determine the command associated with Tab. Each command stores different kinds of data. Some store URLs, timestamps, User agents, etc
 * @param id Tab ID number
 * @returns Tab Command value
 */
function getTabCommand(id: number): SessionTabCommand {
    switch (id) {
        case 1: return SessionTabCommand.UpdateTabNavigation;
        case 2: return SessionTabCommand.RestoredEntry;
        case 3: return SessionTabCommand.WindowDeprecated;
        case 4: return SessionTabCommand.SelectedNavigtionInTab;
        case 5: return SessionTabCommand.PinnedState;
        case 6: return SessionTabCommand.ExtensionAppID;
        case 7: return SessionTabCommand.WindowAppName;
        case 8: return SessionTabCommand.TabUserAgentOverride;
        case 9: return SessionTabCommand.Window;
        case 10: return SessionTabCommand.TabGroupData;
        case 11: return SessionTabCommand.TabUserAgentOverride2;
        case 12: return SessionTabCommand.WindowUserTitle;
        case 13: return SessionTabCommand.CreateGroup;
        case 14: return SessionTabCommand.AddTabExtraData;
        case 255: return SessionTabCommand.CommandStorageBackend;
        default: {
            console.info(`Unknown tab command ${id}`);
            return SessionTabCommand.Unknown;
        }
    }
}

interface CommandValues {
    commands: Record<string, unknown>[];
    last_active: string;
}

/**
 * Function to parse the data associated with each SessionCommand. Many commands have similar strucutres
 * @param command `SessionCommand` identifier
 * @param bytes Bytes associated with the command
 * @param command_values Values associated with the SessionCommand
 */
function parseSessionCommand(command: SessionCommand, bytes: Uint8Array, command_values: Record<string, CommandValues>) {
    switch (command) {
        case SessionCommand.WindowType: {
            const window = parseWindowType(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.WindowAppName: {
            const window = parseWindowAppName(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.WindowUserTitle: {
            const window = parseWindowAppName(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.WindowWorkspace2: {
            const window = parseWindowAppName(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.WindowVisibleOnAllWorkspaces: {
            const window = parseWindowType(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.PinnedState: {
            const window = parseWindowType(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.TabIndexInWindow: {
            const window = parseWindowType(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.TabGroup: {
            const window = parseTabGroup(bytes);
            if (!(window instanceof ApplicationError) && window.length !== 0 && window[0] !== undefined) {
                if (command_values[window[0].session_id] === undefined) {
                    command_values[window[0].session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };

                } else {
                    command_values[window[0].session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.TabWindow: {
            const window = parseWindowType(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.SessionStorageAssociated: {
            const window = parseSessionStorageAssociated(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.SelectedTabInIndex: {
            const window = parseWindowType(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.LastActiveTime: {
            const window = parseLastActive(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: window.last_active
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                    const last = command_values[window.session_id];
                    if (last !== undefined) {
                        last.last_active = window.last_active;
                    }
                }
            }
            break;
        }
        case SessionCommand.SelectedNavigationIndex: {
            const window = parseWindowType(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.UpdateTabNavigation: {
            const window = parseUpdateTabNavigation(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.ActiveWindow: {
            const window = parseSessionId(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window] === undefined) {
                    command_values[window] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.WindowBounds3: {
            const window = parseWindowsBounds(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.CommandStorageBackend: {
            // Contains nothing
            break;
        } case SessionCommand.AddWindowExtraData: {
            const window = parseWindowType(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.TabUserAgentOverride2: {
            const window = parseWindowAppName(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.TabClosed: {
            const window = parseLastActive(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.EdgeCommand: {
            const window = parseLastActive(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.EdgeCommand2: {
            const window = parseWindowType(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.EdgeCommand3: {
            const window = parseWindowAppName(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.EdgeCommand4: {
            const window = parseWindowAppName(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }

            break;
        }
        case SessionCommand.TabNavigationPathPruned: {
            const window = parseWindowType(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionCommand.ExtensionAppID: {
            const window = parseSessionStorageAssociated(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        default: {
            console.info(`Unsupported session command: ${command}`);
        }
    }
}

/**
 * Function to parse the data associated with each TabCommand. Many commands have similar strucutres
 * @param command `SessionTabCommand` identifier
 * @param bytes Bytes associated with the command
 * @param command_values Values associated with the SessionCommand
 */
function parseTabCommand(command: SessionTabCommand, bytes: Uint8Array, command_values: Record<string, CommandValues>) {
    switch (command) {
        case SessionTabCommand.SelectedNavigtionInTab: {
            const window = parseLastActive(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: window.last_active
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                    const last = command_values[window.session_id];
                    if (last !== undefined) {
                        last.last_active = window.last_active;
                    }
                }
            }
            break;
        }
        case SessionTabCommand.UpdateTabNavigation: {
            const window = parseUpdateTabNavigation(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionTabCommand.CommandStorageBackend: {
            // Contains nothing
            break;
        }
        case SessionTabCommand.Window: {
            const window = parseWindow(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        case SessionTabCommand.TabUserAgentOverride2: {
            // Contains array of user agents
            break;
        }
        case SessionTabCommand.ExtensionAppID: {
            const window = parseSessionStorageAssociated(bytes);
            if (!(window instanceof ApplicationError)) {
                if (command_values[window.session_id] === undefined) {
                    command_values[window.session_id] = {
                        commands: [({
                            [command]: window,
                        })],
                        last_active: ""
                    };
                } else {
                    command_values[window.session_id]?.commands.push({
                        [command]: window,
                    });
                }
            }
            break;
        }
        default: {
            console.info(`Unsupported tab command: ${command}`);
        }
    }
}

interface WindowType {
    session_id: number;
    index: number;
}

/**
 * Parse the WindowType info
 * @param bytes Bytes associated with the WindowType. Should always be 8 bytes
 * @returns `WindowType` object or `ApplicationError`
 */
function parseWindowType(bytes: Uint8Array): WindowType | ApplicationError {
    const session = nomUnsignedFourBytes(bytes, Endian.Le);
    if (session instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to window type session id: ${session}`);
    }

    const index = nomUnsignedFourBytes(session.remaining, Endian.Le);
    if (index instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to window type index: ${index}`);
    }

    const window: WindowType = {
        session_id: session.value,
        index: index.value,
    };

    return window;
}

/**
 * Parse the WindowAppName info
 * @param bytes Bytes associated with the WindowType. Should always be 12 bytes
 * @returns `WindowType` object or `ApplicationError`
 */
function parseWindowAppName(bytes: Uint8Array): WindowType | ApplicationError {
    const size = nomUnsignedFourBytes(bytes, Endian.Le);
    if (size instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to window app name size: ${size}`);
    }
    // Size is 8 bytes?
    // Same values as WindowType?

    return parseWindowType(size.remaining);
}

/**
 * Parse the TabGroup info
 * @param bytes Bytes associated with the TabGroup
 * @returns Array of `WindowType` or `Application Error`
 */
function parseTabGroup(bytes: Uint8Array): WindowType[] | ApplicationError {
    const limit = 4;
    let count = 0;
    const group: WindowType[] = [];
    let remaining = bytes;
    while (count < limit) {
        const session = nomUnsignedFourBytes(remaining, Endian.Le);
        if (session instanceof NomError) {
            return new ApplicationError(`CHROMIUM`, `Failed to window type session id: ${session}`);
        }

        const index = nomUnsignedFourBytes(session.remaining, Endian.Le);
        if (index instanceof NomError) {
            return new ApplicationError(`CHROMIUM`, `Failed to window type index: ${index}`);
        }
        remaining = index.remaining;

        const window: WindowType = {
            session_id: session.value,
            index: index.value,
        };
        group.push(window);
        count += 1;
    }

    return group;
}

interface SessionStorageAssociated {
    session_id: number;
    value: string;
}

/**
 * Parse the session storage associated info. Usually contains a string
 * @param bytes Bytes assocaited with SessionStorageAssociated
 * @returns `SessionStorageAssociated` object or `ApplicationError` object
 */
function parseSessionStorageAssociated(bytes: Uint8Array): SessionStorageAssociated | ApplicationError {
    let size = nomUnsignedFourBytes(bytes, Endian.Le);
    if (size instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get session storage associated size: ${size}`);
    }
    const session_id = nomUnsignedFourBytes(size.remaining, Endian.Le);
    if (session_id instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get session storage associated id: ${session_id}`);
    }

    size = nomUnsignedFourBytes(session_id.remaining, Endian.Le);
    if (size instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get session storage associated string size: ${size}`);
    }

    const string_data = take(size.remaining, size.value);
    if (string_data instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get session storage associated string: ${string_data}`);
    }

    const value = extractUtf8String(string_data.nommed as Uint8Array);
    const info: SessionStorageAssociated = {
        session_id: session_id.value,
        value,
    };
    return info;
}

interface LastActive {
    session_id: number;
    index: number;
    last_active: string;
}

/**
 * Parse the last active timestamp
 * @param bytes Bytes assocaited with LastActive
 * @returns `LastActive` object or `ApplicationError` object
 */
function parseLastActive(bytes: Uint8Array): LastActive | ApplicationError {
    const session = nomUnsignedFourBytes(bytes, Endian.Le);
    if (session instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to last active session id: ${session}`);
    }

    const index = nomUnsignedFourBytes(session.remaining, Endian.Le);
    if (index instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get last active index: ${index}`);
    }

    const timestamp = nomUnsignedEightBytes(index.remaining, Endian.Le);
    if (timestamp instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get last active timestamp: ${timestamp}`);
    }

    const last: LastActive = {
        session_id: session.value,
        index: index.value,
        last_active: unixEpochToISO(webkitToUnixEpoch(Number(timestamp.value / 1000000n))),
    };

    return last;
}

/**
 * Get the session ID value
 * @param bytes Bytes associated with the session ID
 * @returns Session ID or `ApplicationError
 */
function parseSessionId(bytes: Uint8Array): number | ApplicationError {
    const session = nomUnsignedFourBytes(bytes, Endian.Le);
    if (session instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to last active session id: ${session}`);
    }

    return session.value;
}

interface TabNavigation {
    session_id: number;
    unknown: number;
    unknown2: number;
    unknown3: number;
    unknown4: number;
    unknown5: number;
}

/**
 * Parse the windows bound info. 
 * @param bytes Bytes associted with TabNavigation
 * @returns `TabNavigation` object or `ApplicationError`
 */
function parseWindowsBounds(bytes: Uint8Array): TabNavigation | ApplicationError {
    const session = nomUnsignedFourBytes(bytes, Endian.Le);
    if (session instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get windows bound session id: ${session}`);
    }

    const unknown = nomUnsignedFourBytes(session.remaining, Endian.Le);
    if (unknown instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get windows bound unknown: ${unknown}`);
    }

    const unknown2 = nomUnsignedFourBytes(unknown.remaining, Endian.Le);
    if (unknown2 instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get windows bound unknown2: ${unknown2}`);
    }

    const unknown3 = nomUnsignedFourBytes(unknown2.remaining, Endian.Le);
    if (unknown3 instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get windows bound unknown3: ${unknown3}`);
    }

    const unknown4 = nomUnsignedFourBytes(unknown3.remaining, Endian.Le);
    if (unknown4 instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get windows bound unknown4: ${unknown4}`);
    }

    const unknown5 = nomUnsignedFourBytes(unknown4.remaining, Endian.Le);
    if (unknown5 instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get windows bound unknown5: ${unknown5}`);
    }

    const tab: TabNavigation = {
        session_id: session.value,
        unknown: unknown.value,
        unknown2: unknown2.value,
        unknown3: unknown3.value,
        unknown4: unknown4.value,
        unknown5: unknown5.value
    };

    return tab;
}

interface TabInfo {
    session_id: number;
    index: number;
    url: string;
    title: string;
}

/**
 * Parse the Tab Navigation info. Usually contains page info like URL and page title and alot more
 * @param bytes Bytes associated with TabInfo
 * @returns `TabInfo` object or `ApplicationError`
 */
function parseUpdateTabNavigation(bytes: Uint8Array): TabInfo | ApplicationError {
    const size = nomUnsignedFourBytes(bytes, Endian.Le);
    if (size instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get update tab navigation size: ${size}`);
    }

    const session_id = nomUnsignedFourBytes(size.remaining, Endian.Le);
    if (session_id instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get update tab navigation session id: ${session_id}`);
    }
    const index = nomUnsignedFourBytes(session_id.remaining, Endian.Le);
    if (index instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get update tab navigation index: ${index}`);
    }

    // Size does NOT include end of string character
    const url_size = nomUnsignedFourBytes(index.remaining, Endian.Le);
    if (url_size instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get update tab navigation url size: ${url_size}`);
    }

    // Should align to 4 bytes?
    let adjust = url_size.value % 4;
    if (adjust !== 0) {
        adjust = 4 - adjust;
    }

    const url_data = take(url_size.remaining, url_size.value + adjust);
    if (url_data instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get update tab navigation url: ${url_data}`);
    }

    const url = extractUtf8String(url_data.nommed as Uint8Array);

    const title_size = nomUnsignedFourBytes(url_data.remaining as Uint8Array, Endian.Le);
    if (title_size instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get update tab navigation url title size: ${title_size}`);
    }

    const adjust_size = 2;
    // Align 4 bytes
    adjust = (title_size.value * adjust_size) % 4;
    if (adjust !== 0) {
        adjust = 4 - adjust;
    }

    let title = "";
    let remaining = title_size.remaining;
    if (title_size.value !== 0) {
        // Title data is UTF16 o.O and does NOT include end of string character
        const title_data = take(title_size.remaining, (title_size.value + adjust));
        if (title_data instanceof NomError) {
            return new ApplicationError(`CHROMIUM`, `Failed to get update tab navigation url title: ${title_data}`);
        }
        remaining = title_data.remaining as Uint8Array;

        const title_string = extractUtf16String(title_data.nommed as Uint8Array);
        title = title_string;
    }

    // A lot more left to parse!
    // https://digitalinvestigation.wordpress.com/2012/09/03/chrome-session-and-tabs-files-and-the-puzzle-of-the-pickle/

    const state_size = nomUnsignedFourBytes(remaining, Endian.Le);
    if (state_size instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get update tab navigation url state size: ${state_size}`);
    }
    // A very complex format. Currently not parsing. *Might* contain info like URL referrer, User agent, additional timestamps
    // const state_data = take(state_size.remaining, state_size.value);
    // if (state_data instanceof NomError) {
    //    return new ApplicationError(`CHROMIUM`, `Failed to get update tab navigation url state data: ${state_data}`);
    // }

    const info: TabInfo = {
        session_id: session_id.value,
        index: index.value,
        url,
        title,
    };

    return info;
}

interface Window {
    session_id: number;
    index: number;
    unknown: number;
    window_timestamp: string;
}

/**
 * Parse the Window session command
 * @param bytes Bytes associated with the Window command
 * @returns `Window` object or `ApplicationError`
 */
function parseWindow(bytes: Uint8Array): Window | ApplicationError {
    const session = nomUnsignedFourBytes(bytes, Endian.Le);
    if (session instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get window session id: ${session}`);
    }

    const index = nomUnsignedFourBytes(session.remaining, Endian.Le);
    if (index instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get window index: ${index}`);
    }

    const unknown = nomUnsignedFourBytes(index.remaining, Endian.Le);
    if (unknown instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get window unknown: ${unknown}`);
    }

    const timestamp = nomUnsignedEightBytes(unknown.remaining, Endian.Le);
    if (timestamp instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to get window timestamp: ${timestamp}`);
    }

    // A lot more left to parse!
    // https://digitalinvestigation.wordpress.com/2012/09/03/chrome-session-and-tabs-files-and-the-puzzle-of-the-pickle/


    const win: Window = {
        session_id: session.value,
        index: index.value,
        unknown: unknown.value,
        window_timestamp: unixEpochToISO(webkitToUnixEpoch(Number(timestamp.value / 1000000n))),
    };

    return win;
}

/**
 * Function to test the Chromium Sessions parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Chromium Sessions parsing
 */
export function testChromiumSessions(): void {
    const path: ChromiumProfiles = {
        full_path: "../../test_data/edge",
        version: "141",
        browser: BrowserType.EDGE
    };

    const sess = chromiumSessions([path], PlatformType.Darwin);
    if (sess.length !== 115) {
        throw `Got length ${sess.length} expected 115.......chromiumSessions ❌`;
    }

    if (sess[12]?.message !== "Session: https://www.washingtonpost.com/politics/2025/11/02/nuclear-testing-trump-energy-secretary/ | Page Title: Trump energy secretary says no nuclear b") {
        throw `Got message "${sess[12]?.message}" expected "Session: https://www.washingtonpost.com/politics/2025/11/02/nuclear-testing-trump-energy-secretary/ | Page Title: Trump energy secretary says no nuclear b".......chromiumSessions ❌`;
    }


    if (sess[0]?.message != "Session: edge://newtab/ | Page Title: New T") {
        throw `Got message ${sess[0]?.message} expected "Session: edge://newtab/ | Page Title: New T".......chromiumSessions ❌`;
    }

    console.info(`  Function chromiumSessions ✅`);

    const sess_file = "../../test_data/edge/v141/Sessions/Session_13406596486318013";
    const results = parseSession(sess_file, SessionType.Session, path);
    if (results instanceof ApplicationError) {
        throw results.message;
    }

    if (results.length !== 58) {
        throw `Got length ${results.length} expected 58.......parseSession ❌`;
    }

    if (results[7]?.message != "Session: https://www.washingtonpost.com/ | Page Title: The Washington Post - Breaking news and latest headlines") {
        throw `Got message ${results[7]?.message} expected "Session: https://www.washingtonpost.com/ | Page Title: The Washington Post - Breaking news and latest headlines".......parseSession ❌`;
    }

    console.info(`  Function parseSession ✅`);

    const header = getHeader(new Uint8Array([0, 0, 0, 0, 1, 0, 0, 0]));
    if (header instanceof ApplicationError) {
        throw header.message;
    }

    if (header.version !== 1) {
        throw `Got length ${header.version} expected 1.......getHeader ❌`;
    }

    console.info(`  Function getHeader ✅`);

    const test = [0, 1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 131, 132, 44, 50, 255];
    for (const entry of test) {
        const value = getSessionCommand(entry);
        if (value === SessionCommand.Unknown) {
            throw `Got Session command Unknown for ${entry}.......getSessionCommand ❌`
        }
    }

    console.info(`  Function getSessionCommand ✅`);

    for (const entry of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 255]) {
        const value = getTabCommand(entry);
        if (value === SessionTabCommand.Unknown) {
            throw `Got Tab command Unknown for ${entry}.......getTabCommand ❌`
        }
    }

    console.info(`  Function getTabCommand ✅`);

    const comm: Record<string, CommandValues> = {};
    parseSessionCommand(SessionCommand.TabWindow, new Uint8Array([1, 0, 0, 0, 2, 0, 0, 0]), comm);
    if (!JSON.stringify(comm).includes("TabWindow")) {
        throw `Got Session command ${JSON.stringify(comm)} wanted "TabWindow".......parseSessionCommand ❌`
    }

    console.info(`  Function parseSessionCommand ✅`);

    const tab: Record<string, CommandValues> = {};
    parseTabCommand(SessionTabCommand.SelectedNavigtionInTab, new Uint8Array([1, 0, 0, 0, 2, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0]), tab);
    if (!JSON.stringify(tab).includes("SelectedNavigationInTab")) {
        throw `Got Session command ${JSON.stringify(tab)} wanted "SelectedNavigationInTab".......parseTabCommand ❌`
    }

    console.info(`  Function parseTabCommand ✅`);

    let info = parseWindowType(new Uint8Array([1, 0, 0, 0, 2, 0, 0, 0]));
    if (info instanceof ApplicationError) {
        throw info.message;
    }

    if (info.index !== 2) {
        throw `Got index ${info.index} expected 2.......parseWindowType ❌`;
    }

    console.info(`  Function parseWindowType ✅`);

    info = parseWindowAppName(new Uint8Array([8, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0]));
    if (info instanceof ApplicationError) {
        throw info.message;
    }

    if (info.index !== 2) {
        throw `Got index ${info.index} expected 2.......parseWindowAppName ❌`;
    }

    console.info(`  Function parseWindowAppName ✅`);

    const tab_group = parseTabGroup(new Uint8Array([8, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0]));
    if (tab_group instanceof ApplicationError) {
        throw tab_group.message;
    }

    if (tab_group.length !== 4) {
        throw `Got index ${tab_group.length} expected 4.......parseTabGroup ❌`;
    }

    console.info(`  Function parseTabGroup ✅`);

    const url_bytes = parseSessionStorageAssociated(new Uint8Array([44, 0, 0, 0, 208, 120, 213, 109, 36, 0, 0, 0, 97, 102, 100, 99, 50, 50, 54, 100, 95, 99, 55, 57, 51, 95, 52, 97, 51, 52, 95, 97, 49, 51, 50, 95, 50, 100, 102, 100, 99, 99, 50, 53, 56, 97, 57, 50]));
    if (url_bytes instanceof ApplicationError) {
        throw url_bytes.message;
    }

    if (url_bytes.value !== "afdc226d_c793_4a34_a132_2dfdcc258a92") {
        throw `Got value ${url_bytes.value} expected "afdc226d_c793_4a34_a132_2dfdcc258a92".......parseSessionStorageAssociated ❌`;
    }
    console.info(`  Function parseSessionStorageAssociated ✅`);

    const last_active = parseLastActive(new Uint8Array([81, 121, 213, 109, 0, 0, 0, 0, 59, 250, 123, 137, 58, 161, 47, 0]));
    if (last_active instanceof ApplicationError) {
        throw last_active.message;
    }

    if (last_active.last_active !== "2025-11-02T22:38:12.000Z") {
        throw `Got time ${last_active.last_active} expected "2025-11-02T22:38:12.000Z".......parseLastActive ❌`;
    }
    console.info(`  Function parseLastActive ✅`);

    const session_id = parseSessionId(new Uint8Array([1, 0, 0, 0]));
    if (session_id instanceof ApplicationError) {
        throw session_id.message;
    }

    if (session_id !== 1) {
        throw `Got ID ${session_id} expected "1".......parseSessionId ❌`;
    }
    console.info(`  Function parseSessionId ✅`);

    const navigate = parseWindowsBounds(new Uint8Array([11, 121, 213, 109, 22, 0, 0, 0, 22, 0, 0, 0, 0, 15, 0, 0, 56, 4, 0, 0, 1, 0, 0, 0]));
    if (navigate instanceof ApplicationError) {
        throw navigate.message;
    }

    if (navigate.session_id !== 1842706699) {
        throw `Got ID ${navigate.session_id} expected "1842706699".......parseWindowsBounds ❌`;
    }
    console.info(`  Function parseWindowsBounds ✅`);

    const bytes = readFile("../../test_data/edge/v141/raw/tab_url.raw");
    if (bytes instanceof FileError) {
        throw bytes.message;
    }

    const tab_url = parseUpdateTabNavigation(bytes);
    if (tab_url instanceof ApplicationError) {
        throw tab_url.message;
    }

    if (tab_url.url != "edge://newtab/") {
        throw `Got URL ${tab_url.url} expected "edge://newtab/".......parseUpdateTabNavigation ❌`;
    }
    console.info(`  Function parseUpdateTabNavigation ✅`);

    const win = parseWindow(new Uint8Array([11, 121, 213, 109, 22, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    if (win instanceof ApplicationError) {
        throw win.message;
    }

    if (win.session_id !== 1842706699) {
        throw `Got ID ${win.session_id} expected "1842706699".......parseWindow ❌`;
    }
    console.info(`  Function parseWindow ✅`);
}