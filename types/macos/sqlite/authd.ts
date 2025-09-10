import { SingleRequirement } from "../codesigning";

export interface Authorizations {
    id: number;
    name: string;
    type: number;
    class: number;
    group: string;
    kofn: number;
    timeout: number;
    flags: number;
    tries: number;
    version: number;
    created: string;
    modified: string;
    hash: string;
    identifier: string;
    requirement: SingleRequirement | string;
    comment: string;
    message: string;
    datetime: string;
    timestamp_desc: string;
    artifact: string;
    data_type: string;
}