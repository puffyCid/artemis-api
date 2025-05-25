/**
 * Object representing a Windows Firewall rule
 * References: https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-fasp/55e50895-2e1f-4479-b130-122f9dc0265f and 
 */
export interface FirewallRules {
    action: string;
    active: boolean;
    direction: Direction;
    protocol: Protocol;
    protocol_number: number;
    local_port: number;
    remote_port:number;
    name: string;
    registry_key_name: string;
    description: string;
    application: string;
    registry_file: string;
    key_path: string;
    last_modified: string;
    rule_version: string;
    profile: string;
    service: string;
    remote_address: string[];
    local_address: string[];
    [ key: string ]: unknown;
}

export enum Direction {
    Inbound = "Inbound",
    Outbound = "Outbound",
    Unknown = "Unknown",
}

export enum Protocol {
    TCP = "TCP",
    UDP = "UDP",
    ICMP = "ICMP",
    ICMP_v6 = "ICMP_v6",
    Unkonwn = "Unknown",
    IPV6 = "IPv6",
    GRE = "GRE",
    IGMP = "IGMP",
}