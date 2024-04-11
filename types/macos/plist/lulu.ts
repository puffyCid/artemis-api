export interface LuluRules {
    path: string;
    rules: Rule[];
}

export interface Rule {
    file: string;
    uuid: string;
    endpoint_addr: string;
    is_regex: boolean;
    scope: string;
    type: string;
    key: string;
    action: LuluAction;
    endpoint_host: string;
    code_signing_info: Record<string, string | string[]>;
    pid: number;
    endpoint_port: number;
}

export enum LuluAction {
    ALLOW = "ALLOW",
    BLOCK = "BLOCK",
}