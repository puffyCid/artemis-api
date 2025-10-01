export interface Wifi {
    name: string;
    description: string;
    managed: boolean;
    category: WifiCategory;
    created_local_time: string;
    name_type: NameType;
    id: string;
    last_connected_local_time: string;
    registry_path: string;
    registry_file: string;
    message: string;
    datetime: string;
    timestamp_desc: "Registry Key Modified";
    artifact: "WiFi Network";
    data_type: "windows:registry:wifi:entry";
}

export enum WifiCategory {
    Public = "Public",
    Private = "Private",
    Domain = "Domain",
    Unknown = "Unknown",
}

/**
 * From: https://community.spiceworks.com/t/what-are-the-nametype-values-for-the-networklist-registry-keys/526112/6
 */
export enum NameType {
    Wired = "Wired",
    Vpn = "VPN",
    Wireless = "Wireless",
    Mobile = "Mobile",
    Unknown = "Unknown",

}