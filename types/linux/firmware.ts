export interface FirmwareHistory {
    device_id: string;
    update_state: number;
    update_error: string | null;
    filename: string | null;
    display_name: string;
    plugin: string;
    device_created: string;
    device_modified: string;
    checksum: string;
    flags: bigint;
    metadata: string;
    guid_default: string;
    version_old: string;
    version_new: string;
    checksum_device: string | null;
    protocol: string;
    release_id: string | null;
    appstream_id: string;
    version_format: number;
    install_duration: number;
    [ key: string ]: unknown;
    message: string;
    datetime: string;
    timestamp_desc: "Firmware Device Created";
    artifact: "Firmware Updates";
    data_type: "linux:firmware:entry";
}