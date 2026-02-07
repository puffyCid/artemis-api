/**
 * Contains details on active network connections on a system
 */
export interface Connection {
    /**Process ID with connection */
    pid: number;
    /**Process name with connection */
    process_name: string;
    /**Local IP. Can be either IPv4 or IPv6 */
    local_address: string;
    /**Local port used for connection */
    local_port: number;
    /**Remote IP. Can be either IPv4 or IPv6 */
    remote_address: string;
    /**Remote port used for connection */
    remote_port: number;
    /**State of the process connection */
    state: NetworkState;
    /**Connection protocol */
    protocol: Protocol;
}

export enum Protocol {
    Tcp = "Tcp",
    Udp = "Udp",
    Icmp = "Icmp",
    Unknown = "Unknown",
}

export enum NetworkState {
    Listen = "Listen",
    Established = "Established",
    SynRecv = "SynRecv",
    SynSent = "SynSent",
    FinWait = "FinWait",
    FinWait2 = "FinWait2",
    TimeWait = "TimeWait",
    Close = "Close",
    CloseWait = "CloseWait",
    LastAck = "LastAck",
    Closing = "Closing",
    DeleteTcb = "DeleteTcb",
    Unknown = "Unknown",
    None = "None",
}