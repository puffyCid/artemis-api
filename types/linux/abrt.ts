export interface Abrt {
    executable: string;
    pid: number;
    cmdline: string;
    reason: string;
    hostname: string;
    last_occurrence: string;
    user: string;
    data_directory: string;
    backtrace: string | Record<string, unknown>;
    environment: string;
    home: string;
}