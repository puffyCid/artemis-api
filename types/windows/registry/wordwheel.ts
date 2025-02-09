/**
 * Extracted WordWheel entry
 */
export interface WordWheelEntry {
    /**Searched term entered in Windows Explorer */
    search_term: string;
    /**Last modified timestamp for Registry key */
    last_modified: string;
    /**Registry file path */
    source_path: string;
    /**Registry key path */
    reg_path: string;
}