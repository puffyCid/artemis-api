export interface PacmanPackages {
    name: string;
    version: string;
    url: string;
    build_date: string;
    installed: string;
    author: string;
    size: number;
    description: string;
    licenses: string | string[];
    reason: Reason;
    message: string;
    datetime: string;
    timestamp_desc: "Pacman Package Installed";
    artifact: "Pacman Package";
    data_type: "linux:pacman:entry";
    evidence: string;
}

export enum Reason {
    Dependency = "Dependency",
    Explict = "Explict",
}