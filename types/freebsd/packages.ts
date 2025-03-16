/**
 * Info on installed FreeBSD packages
 */
export interface Pkg {
    id: number;
    origin: string;
    name: string;
    version: string;
    comment: string;
    desc: string;
    mtree_id: number | null;
    message: string | null;
    arch: string;
    maintainer: string;
    www: string | null;
    prefix: string;
    flatsize: number;
    automatic: boolean;
    locked: boolean;
    licenselogic: boolean;
    installed: string | null;
    pkg_format_version: number | null;
    dep_formula: string | null;
    vital: boolean;
    manifest_digest: string | null;
}