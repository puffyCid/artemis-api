/**
 * Minimum data needed to authenticate to Timesketch
 */
export interface TimesketchAuth {
    /**URL to Timesketch istance */
    url: string;
    /**Username for instance */
    username: string;
    /**Password for username if using `TimesketchAuthType.CREDS` */
    password: string;
    /**If using self-signed cert you may want to disable SSL verification */
    verify_url: boolean;
    /**Use creds or OAUTH to auth to Timesketch */
    auth_type: TimesketchAuthType;
    /**ID associated with the Sketch that artemis should upload data to. If **undefined** a new Sketch will be created */
    sketch_id?: number;
    /**Name that should be used for a new Sketch. If **undefined** the current hostname will be used for the name  */
    sketch_name?: string;
}

export enum TimesketchAuthType {
    OAUTH,
    CREDS,
}