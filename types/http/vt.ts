/**
 * Very simple interface to handle responses from VT
 */
export interface VTResponse {
    /**URL associated with response */
    url: string;
    /**Status code for response */
    status: number;
    /**Body of the response. If 200 status code, will contain `VTFile`. Otherwise will contain non-200 response */
    body: unknown | VTFile;
}

export interface VTFile {
    data: File;
}

interface File {
    attributes: {
        capabilities_tags: string[];
        creation_date: number;
        crowdsourced_ids_results: {
            alert_context: {
                dest_ip: string;
                dest_port: number;
                hostname: string;
                protocol: string;
                src_ip: string;
                src_port: string;
                url: string;
            }[];
            alert_severity: string;
            rule_category: string;
            rule_id: string;
            rule_msg: string;
            rule_source: string;
        }[];
        crowdsourced_ids_stats: {
            info: number;
            high: number;
            low: number;
            medium: number;
        };
        crowdsourced_yara_results: {
            description: string;
            match_in_subfile: boolean;
            rule_name: string;
            ruleset_name: string;
            source: string;
        }[];
        downloadable: boolean;
        first_submission_date: number;
        last_analysis_date: number;
        last_analysis_results: Record<string, Analysis>;
        last_analysis_stats: {
            "confirmed-timeout": number;
            failure: number;
            harmless: number;
            malicious: number;
            suspicious: number;
            timeout: number;
            "type-unsupported": number;
            undetected: number;
        };
        last_modification_date: number;
        last_submission_date: number;
        md5: string;
        meaningful_name: string;
        names: string[];
        reputation: number;
        sandbox_verdicts: Record<string, Sandbox>;
        sha1: string;
        sha256: string;
        sigma_analysis_results: {
            rule_title: string;
            rule_source: string;
            match_context: {
                values: Record<string, string>;
            }[];
            rule_level: string;
            rule_description: string;
            rule_author: string;
            rule_id: string;
        }[];
        sigma_analysis_stats: {
            critical: number;
            high: number;
            low: number;
            medium: number;
        };
        sigma_analysis_summary: Record<string, SigmaRule>;
        size: number;
        tags: string[];
        times_submitted: number;
        total_votes: {
            harmless: number;
            malicious: number;
        };
        type_description: string;
        type_extension: string;
        type_tag: string;
        unique_sources: number;
        vhash: string;
    };
    id: string;
    links: Record<string, string>;
    type: string;
}

interface Analysis {
    category: string;
    engine_name: string;
    engine_update: string;
    engine_version: string;
    method: string;
    result: string;
}

interface Sandbox {
    category: string;
    confidence: number;
    malware_classification: string[];
    malware_names: string[];
    sandbox_name: string;
}

interface SigmaRule {
    critical: number;
    high: number;
    low: number;
    medium: number;
}