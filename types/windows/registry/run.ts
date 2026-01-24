export interface RegistryRunKey {
    key_modified: string;
    key_path: string;
    registry_path: string;
    registry_file: string;
    path: string;
    /**When file was created */
    created: string;
    has_signature: boolean;
    md5: string;
    sha1: string;
    sha256: string;
    value: string;
    name: string;
    message: string;
    datetime: string;
    timestamp_desc: "Registry Last Modified";
    artifact: "Windows Registry Run Key";
    data_type: "windows:registry:run:entry";
}