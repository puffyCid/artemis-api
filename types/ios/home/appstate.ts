export interface AppState {
    app_id: number;
    app_name: string;
    plist_data: Record<string, unknown> | Record<string, unknown>[];
    plist_type_id: number;
    plist_type: string;
    debug_plist: Record<string, unknown> | Record<string, unknown>[];
    debug_plist_type: string;
}