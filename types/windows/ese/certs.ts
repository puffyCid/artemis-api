export interface Certificates {
    common_name: string;
    request_id: number;
    /** Base64 encoded */
    raw_cert: string;
    hash: string;
    serial_number: string;
    distinguished_name: string;
    domain: string;
}

export interface Requests {
    request_id: number;
    request_type: RequestType;
    status_code_number: number;
    status_code: StatusCode;
    disposition_message: string;
    requester_name: string;
    caller_name: string;
    request_attributes: string;
    submitted: string;
    resolved: string;
}

export interface RequestAttributes {
    request_id: number;
    name: string;
    value: string;
}

export enum RequestType {
    PKCS10_Full = "PKCS10, Full Response",
    PKCS10 = "PKCS10",
    Unknown = "Unknown",
}

/**
 * Various status codes for certificate requests
 * There are [alot](https://github.com/fox-it/dissect.database/pull/7/files#diff-60ccdb935072fd3aa71d6810f7c3aa7ca8ef42aadc6ce9e39ed5f54c5cc36d31R28)
 * Only some listed so far
 */
export enum StatusCode {
    Completed = "Operation Completed Successfully",
    BadRequestSubject = "Bad Request Subject",
    NoRequest = "No Request",
    Empty = "Property Empty",
    InvalidCA = "Invalid CA Certificte",
    Suspended = "Server Suspended",
    EncodingLength = "Encoding Length",
    Conflict = "Role Conflict",
    Restrict = "Restricted Officer",
    NotConfigured = "Key Archival Not Configured",
    Kra = "No Valid KRA",
    BadRequest = "Bad Request Key Archival",
    NoAdmin = "No CA Admin Defined",
    BadRenewal = "Bad Renewal Cert Attribute",
    NoSessions = "No DB Sessions",
    Fault = "Alignment Fault",
    Denied = "Enroll Denied",
    TemplateDenied = "Template Denied",
    Downlevel = "Downlevel DC SSL or Upgrade",
    NoPolicy = "No Policy Server",
    Unknown = "Unknown",
}