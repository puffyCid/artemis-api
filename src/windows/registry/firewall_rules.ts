import { Direction, FirewallRules, Protocol } from "../../../types/windows/registry/firewall_rules";
import { getEnvValue } from "../../environment/mod";
import { WindowsError } from "../errors";
import { getRegistry } from "../registry";

/**
 * Function to extract Windows Firewall rules in the Registry
 * @param alt_file Alternative path to `SYSTEM` Registry file
 * @returns Array of `FirewallRules` or `WindowsError`
 */
export function firewallRules(alt_file?: string): FirewallRules[] | WindowsError {
    let path = "";
    if (alt_file != undefined) {
        path = alt_file;
    } else {
        path = `${getEnvValue("SystemDrive")}\\Windows\\System32\\config\\SYSTEM`;
    }

    const reg_data = getRegistry(path);
    if (reg_data instanceof WindowsError) {
        return new WindowsError(`FIREWALL_RULES`, `failed to parse ${path}: ${reg_data}`);
    }

    const rules: FirewallRules[] = []
    for (const entry of reg_data) {
        if (!entry.path.endsWith("\\Services\\SharedAccess\\Parameters\\FirewallPolicy\\FirewallRules")) {
            continue;
        }

        for (const value of entry.values) {
            if (value.data_type != "REG_SZ") {
                continue;
            }
            const entries = value.data.split("|");
            let rule: FirewallRules = {
                action: "",
                active: false,
                direction: Direction.Unknown,
                protocol: Protocol.Unkonwn,
                protocol_number: 0,
                local_port: 0,
                remote_port: 0,
                name: "",
                description: "",
                application: "",
                registry_file: entry.registry_path,
                key_path: entry.path,
                last_modified: entry.last_modified,
                rule_version: "",
                profile: "",
                service: "",
                remote_address: [],
                registry_key_name: value.value,
                local_address: [],
            };

            for (const rule_values of entries) {
                if (rule_values.startsWith("v") && !rule_values.includes("=")) {
                    rule.rule_version = rule_values;
                    continue;
                }

                const key_value = rule_values.split("=");
                const key = key_value.at(0);
                if (key === "") {
                    continue;
                }

                switch (key) {
                    case "Action":
                        rule.action = key_value.at(1) ?? "";
                        break;
                    case "Active":
                        rule.active = JSON.parse(key_value.at(1)?.toLowerCase() ?? "false");
                        break;
                    case "Dir":
                        rule.direction = getDirection(key_value.at(1) ?? "");
                        break;
                    case "Protocol":
                        rule.protocol = getProtocol(key_value.at(1) ?? "");
                        rule.protocol_number = Number(key_value.at(1));
                        break;
                    case "Profile":
                        rule.profile = key_value.at(1) ?? "";
                        break;
                    case "RPort":
                        rule.remote_port = Number(key_value.at(1));
                        break;
                    case "LPort":
                        rule.local_port = Number(key_value.at(1));
                        break;
                    case "App":
                        rule.application = key_value.at(1) ?? "";
                        break;
                    case "Svc":
                        rule.service = key_value.at(1) ?? "";
                        break;
                    case "Name":
                        rule.name = key_value.at(1) ?? "";
                        break;
                    case "Desc":
                        rule.description = key_value.at(1) ?? "";
                        break;
                    case "RA4":
                        rule.remote_address.push(key_value.at(1) ?? "");
                        break;
                    case "RA6":
                        rule.remote_address.push(key_value.at(1) ?? "");
                        break;
                    case "LA4":
                        rule.local_address.push(key_value.at(1) ?? "");
                        break;
                    case "LA6":
                        rule.local_address.push(key_value.at(1) ?? "");
                        break;
                    case undefined:
                        break;
                    default:
                        rule[key] = key_value.at(1) ?? "";
                        break;
                }
            }

            rules.push(rule);
        }
    }

    return rules;
}

/**
 * Determines Firewall direction
 * @param dir Direction of the rule as string
 * @returns `Direction` enum value
 */
function getDirection(dir: string): Direction {
    if (dir.toLowerCase() === "in") {
        return Direction.Inbound;
    } else if (dir.toLowerCase() === "out") {
        return Direction.Outbound;
    }

    return Direction.Unknown;
}

/**
 * Determines Firewall protocol
 * @param proto Protocol number as string
 * @returns `Protocol` enum value
 */
function getProtocol(proto: string): Protocol {
    // From https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml
    switch (proto) {
        case "6": return Protocol.TCP;
        case "1": return Protocol.ICMP;
        case "17": return Protocol.UDP;
        case "58": return Protocol.ICMP_v6;
        case "41": return Protocol.IPV6;
        case "47": return Protocol.GRE;
        case "2": return Protocol.IGMP;
        default: return Protocol.Unkonwn;
    }
}