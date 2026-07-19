export interface VibInfo {
    message: string;
    datetime: string;
    timestamp_desc: "VIB Package Installed" | "VIB Package Released";
    artifact: "ESXi VIB Package";
    data_type: "esxi:vib:entry";
    vib_version: number;
    install_date: string;
    name: string;
    version: string;
    vendor: string;
    summary: string;
    description: string;
    /**Can be spoofed easily. No guarantee to be UTC*/
    release_date: string;
    level: string;
    vib_type: string;
    payloads: VibPayload[];
    urls: string[];
    evidence: string;
    installed: boolean;
    timezone: string;
}

export interface VibPayload {
    payload_type: string;
    size: number;
    uncompressed_size: number | undefined;
    sha1_compressed: string;
    sha256_compressed: string;
    sha256: string;
}

export interface RawVibXml {
    vib: {
        "@version": string;
        type: string;
        name: string;
        version: string;
        vendor: string;
        summary: string;
        installdate: string | undefined;
        description: string;
        "release-date": string;
        urls: {
            url: {
                "@key": string;
                text: string;
            };
        }[] | string;
        "acceptance-level": string;
        payloads: RawVibPayload | RawVibPayload[];
    };
}

interface RawVibPayload {
    payload: {
        "@name": string;
        "@type": string;
        "@size": string;
        "checksum": {
            "@checksum-type": string;
            "@verify-process": string | undefined;
            text: string;
        }[];
    };
}