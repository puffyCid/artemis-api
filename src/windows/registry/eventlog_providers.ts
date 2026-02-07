import { Registry } from "../../../types/windows/registry";
import { ChannelType, RegistryEventlogProviders } from "../../../types/windows/registry/eventlog_providers";
import { WindowsError } from "../errors";
import { getRegistry } from "../registry";

/**
 * Function to list registered Windows EventLog providers
 * @param alt_path Optional alternative path to the Windows Registry file
 * @returns Array of `RegistryEventlogProviders`
 */
export function getEventlogProviders(alt_path?: string): RegistryEventlogProviders[] {
    let default_paths = ["C:\\Windows\\System32\\config\\SYSTEM", "C:\\Windows\\System32\\config\\SOFTWARE"];
    if (alt_path !== undefined) {
        default_paths = [alt_path];
    }

    const providers: RegistryEventlogProviders[] = [];
    const pub: Record<string, Publisher> = {};
    for (const entry of default_paths) {
        if (entry.endsWith("SYSTEM")) {
            const system_filter = ".*ControlSet.*\\\\Services\\\\EventLog\\\\.*";
            const results = getRegistry(entry, system_filter);
            if (results instanceof WindowsError) {
                continue;
            }
            for (const value of results) {
                if (value.values.length === 0) {
                    continue;
                }
                const info = extractProviderInfo(value);
                if (info.message_file === "" && info.parameter_file === "" && info.guid === "") {
                    continue;
                }
                providers.push(info);
            }
        } else if (entry.endsWith("SOFTWARE")) {
            const system_filter = ".*CurrentVersion.*\\\\WINEVT\\\\Channels|Publishers\\\\.*";
            const results = getRegistry(entry, system_filter);
            if (results instanceof WindowsError) {
                continue;
            }
            for (const value of results) {
                if (value.values.length === 0) {
                    continue;
                }
                const info = extractPublisherInfo(value);
                if (info.guid === "") {
                    continue;
                }
                const pub_value = pub[info.guid];
                if (pub_value !== undefined) {
                    pub_value.names = pub_value.names.concat(info.names);
                    pub_value.channel_types = pub_value.channel_types.concat(info.channel_types);
                    if (pub_value.message_file === "") {
                        pub_value.message_file = info.message_file;
                    } else if (pub_value.parameter_file === "") {
                        pub_value.parameter_file = info.parameter_file;
                    }
                    if(info.enabled) {
                        pub_value.enabled = info.enabled;
                    }
                    continue;
                }

                pub[info.guid] = info;
            }
        }
    }

    for (let i = 0; i < providers.length; i++) {
        const entry = providers[i];
        if (entry === undefined) {
            continue;
        }
        if (entry.guid === "") {
            const value = pub[entry.name.toLowerCase()];
            if (value === undefined) {
                continue;
            }
            entry.guid = value.guid;
            entry.enabled = value.enabled;
            entry.channel_types = value.channel_types;
            entry.channel_names = value.names;
        } else {
            const value = pub[entry.guid.toLowerCase()];
            if (value === undefined) {
                continue;
            }
            entry.guid = value.guid;
            entry.enabled = value.enabled;
            entry.channel_types = value.channel_types;
            entry.channel_names = value.names;
        }
    }

    Object.keys(pub).forEach(key => {
        const value = pub[key];
        if (value !== undefined && (value.message_file !== "" || value.parameter_file !== "")) {
            const prov_value: RegistryEventlogProviders = {
                registry_file: value.registry_file,
                key_path: value.key_path.split("/").at(0) ?? "",
                name: value.names.at(0) ?? "Unknown",
                channel_names: value.names,
                message_file: value.message_file,
                last_modified: value.last_modified,
                parameter_file: value.parameter_file,
                guid: value.guid,
                enabled: value.enabled,
                channel_types: value.channel_types,
                message: `EventLog Provider: ${value.names.at(0) ?? "Unknown"}`,
                datetime: value.last_modified,
                timestamp_desc: "Registry Last Modified",
                artifact: "Windows EventLog Provider",
                data_type: "windows:registry:eventlogprovider:entry"
            };
            providers.push(prov_value);
        }
    })

    return providers;
}

function extractProviderInfo(value: Registry): RegistryEventlogProviders {
    const values: RegistryEventlogProviders = {
        registry_file: value.registry_path,
        key_path: value.path,
        name: value.name,
        channel_names: [],
        message_file: "",
        last_modified: value.last_modified,
        parameter_file: "",
        guid: "",
        enabled: false,
        channel_types: [],
        message: "",
        datetime: "",
        timestamp_desc: "Registry Last Modified",
        artifact: "Windows EventLog Provider",
        data_type: "windows:registry:eventlogprovider:entry"
    };
    for (const entry of value.values) {
        if (entry.value.toLowerCase() === "providerguid") {
            values.guid = entry.data;
        } else if (entry.value.toLowerCase() === "eventmessagefile") {
            values.message_file = entry.data;
        } else if (entry.value.toLowerCase() === "parametermessagefile") {
            values.parameter_file = entry.data;
        }
    }
    return values;
}

interface Publisher {
    guid: string;
    names: string[];
    enabled: boolean;
    channel_number: number;
    channel_types: ChannelType[];
    message_file: string;
    parameter_file: string;
    registry_file: string;
    key_path: string;
    last_modified: string;
}

function extractPublisherInfo(values: Registry): Publisher {
    const value: Publisher = {
        guid: "",
        names: [],
        enabled: false,
        channel_number: 0,
        channel_types: [],
        message_file: "",
        parameter_file: "",
        registry_file: values.registry_path,
        key_path: values.path,
        last_modified: values.last_modified,
    };
    for (const entry of values.values) {
        if (values.path.includes("Publishers") && values.name.startsWith("{")) {
            if (entry.value === "(default)") {
                value.guid = values.name;
                value.names.push(entry.data);
            } else if (entry.value === "MessageFileName") {
                value.message_file = entry.data;
            } else if (entry.value === "ParameterFileName") {
                value.parameter_file = entry.data;
            }
        } else if (values.path.includes("Publishers") && values.path.includes("ChannelReferences")) {
            if (entry.value === "(default)") {
                value.guid = `{${(values.path.split("{").at(1) ?? "").split("}").at(0)}}`
                if (entry.data === "Application" || entry.data === "System") {
                    continue;
                }
                value.names.push(entry.data);
            }
        } else if (values.path.includes("Channels\\")) {
            if (entry.value.toLowerCase() === "enabled") {
                value.enabled = Boolean(Number(entry.data));
            } else if (entry.value.toLowerCase() === "owningpublisher") {
                value.guid = entry.data;
            } else if (entry.value.toLowerCase() === "type") {
                value.channel_number = Number(entry.data);
                switch (value.channel_number) {
                    case 0: {
                        value.channel_types.push(ChannelType.Admin);
                        break;
                    }
                    case 1: {
                        value.channel_types.push(ChannelType.Operational);
                        break;
                    }
                    case 2: {
                        value.channel_types.push(ChannelType.Analytic);
                        break;
                    }
                    case 3: {
                        value.channel_types.push(ChannelType.Debug);
                        break;
                    }
                    default: break;
                }
            }
        }
    }

    return value;
}