import { TableInfo } from "../../../types/windows/ese"
import { Certificates, RequestAttributes, Requests, RequestType, StatusCode } from "../../../types/windows/ese/certs";
import { getEnvValue } from "../../environment/mod";
import { FileError } from "../../filesystem/errors";
import { glob } from "../../filesystem/files";
import { WindowsError } from "../errors";
import { EseDatabase } from "../ese"

/**
 * Class to parse Windows AD Certificate Services
 * References:
 *  - [CrowdStrike White Paper](https://www.crowdstrike.com/wp-content/uploads/2023/12/investigating-active-directory-certificate-abuse.pdf)
 */
export class ADCertificates extends EseDatabase {
    /**
     * Construct a `ADCertificates` object. By default it will parse the EDB file on the SystemDrive.
     * @param alt_path Optional alternative path the CertLog EDB file
     */
    constructor(alt_path?: string) {
        let path = "\\Windows\\System32\\CertLog\\*.edb";
        if (alt_path !== undefined) {
            path = alt_path;
        } else {
            let drive = getEnvValue("SystemDrive");
            if (drive === "") {
                drive = "C:";
            }
            path = `${drive}${path}`;
            const paths = glob(path);
            if (paths instanceof FileError) {
                console.error(`Could not glob for EDB at ${path}`);
                return;
            }
            if (paths.length < 1 || paths[0] === undefined) {
                console.error(`No EDB files found`);
                return;
            }
            path = paths[0].full_path;
        }

        super(path);
    }

    /**
     * Function to extract rows from the `Certificates` ESE table
     * @param pages Array of ESE pages to parse
     * @param info  `TableInfo` object
     * @returns Array of `Certificates` or `WindowsError`
     */
    public getCertificates(pages: number[], info: TableInfo): Certificates[] | WindowsError {
        const rows = this.getRows(pages, info);
        if (rows instanceof WindowsError) {
            return rows;
        }

        const certs: Certificates[] = [];
        const cert_data = rows["Certificates"];
        if (cert_data === undefined) {
            return new WindowsError(`ADCERTIFICATES`, `Could not find "Certificates" table`)
        }

        for (const row of cert_data) {
            const value: Certificates = {
                common_name: "",
                request_id: 0,
                raw_cert: "",
                hash: "",
                serial_number: "",
                distinguished_name: "",
                domain: ""
            };
            for (const column of row) {
                switch (column.column_name) {
                    case "RequestID":
                        value.request_id = Number(column.column_data);
                        break;
                    case "$SerialNumber":
                        value.serial_number = column.column_data;
                        break;
                    case "RawCertificate":
                        value.raw_cert = column.column_data;
                        break;
                    case "$DistinguishedName":
                        value.distinguished_name = column.column_data;
                        break;
                    case "$CommonName":
                        value.common_name = column.column_data;
                        break;
                    case "$DomainComponent":
                        value.domain = column.column_data;
                        break;
                    case "$CertificateHash2":
                        value.hash = column.column_data.replace(" ", "");
                        break;
                    default:
                        break;
                }
            }
            certs.push(value);
        }

        return certs;
    }

    /**
     * Function to extract rows from the `Requests` ESE table
     * @param pages Array of ESE pages to parse
     * @param info  `TableInfo` object
     * @returns Array of `Requests` or `WindowsError`
     */
    public getRequests(pages: number[], info: TableInfo): Requests[] | WindowsError {
        const rows = this.getRows(pages, info);
        if (rows instanceof WindowsError) {
            return rows;
        }

        const reqs: Requests[] = [];
        const req_data = rows["Requests"];
        if (req_data === undefined) {
            return new WindowsError(`ADCERTIFICATES`, `Could not find "Requests" table`)
        }

        for (const row of req_data) {
            const value: Requests = {
                request_id: 0,
                request_type: RequestType.Unknown,
                status_code_number: 0,
                status_code: StatusCode.Unknown,
                disposition_message: "",
                requester_name: "",
                caller_name: "",
                request_attributes: "",
                submitted: "1970-01-01T00:00:00Z",
                resolved: "1970-01-01T00:00:00Z",
            };
            for (const column of row) {
                switch (column.column_name) {
                    case "RequestID":
                        value.request_id = Number(column.column_data);
                        break;
                    case "$RequesterName":
                        value.requester_name = column.column_data;
                        break;
                    case "$CallerName":
                        value.caller_name = column.column_data;
                        break;
                    case "$RequestAttributes":
                        value.request_attributes = column.column_data;
                        break;
                    case "$DispositionMessage":
                        value.disposition_message = column.column_data;
                        break;
                    case "StatusCode":
                        value.status_code_number = Number(column.column_data);
                        break;
                    case "ResolvedWhen":
                        value.resolved = column.column_data;
                        break;
                    case "SubmittedWhen":
                        value.submitted = column.column_data;
                        break;
                    default:
                        break;
                }
            }
            reqs.push(value);
        }
        return reqs;
    }

    /**
     * Function to extract rows from the `RequestsAttributes` ESE table
     * @param pages Array of ESE pages to parse
     * @param info  `TableInfo` object
     * @returns Array of `RequestsAttributes` or `WindowsError`
     */
    public requestAttributes(pages: number[], info: TableInfo): RequestAttributes[] | WindowsError {
        const rows = this.getRows(pages, info);
        if (rows instanceof WindowsError) {
            return rows;
        }

        const reqs: RequestAttributes[] = [];
        const req_data = rows["RequestAttributes"];
        if (req_data === undefined) {
            return new WindowsError(`ADCERTIFICATES`, `Could not find "RequestAttributes" table`)
        }

        for (const row of req_data) {
            const value: RequestAttributes = {
                request_id: 0,
                name: "",
                value: ""
            };
            for (const column of row) {
                switch (column.column_name) {
                    case "RequestID":
                        value.request_id = Number(column.column_data);
                        break;
                    case "$AttributeName":
                        value.name = column.column_data;
                        break;
                    case "$AttributeValue":
                        value.value = column.column_data;
                        break;
                    default:
                        break;
                }
            }
            reqs.push(value);
        }
        return reqs;
    }
}