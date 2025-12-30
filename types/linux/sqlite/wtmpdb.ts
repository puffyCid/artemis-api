export interface LastLogons {
    id: number;
    type: number;
    user: string;
    login: string;
    logout: string;
    tty: string;
    remote: string;
    service: string;
    message: string;
    datetime: string;
    timestamp_desc: "User Logon";
    artifact: "wtmpdb Logons";
    data_type: "linux:wtmpdb:entry";
}