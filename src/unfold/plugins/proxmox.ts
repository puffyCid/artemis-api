import { Url } from "../../../types/http/unfold";

/**
 * Class to parse Proxmox web application
 */
export class ProxmoxUrl {
    private url: Url;

    constructor (url: Url) {
        this.url = url;
    }

    /**
     * Function to extract interactions with Proxmox VMs
     */
    public parseProxmox() {
        for (const entry of this.url.query_pairs) {
            const param = entry.split("=");
            const key = param.at(0);

            switch (key) {
                case "console": {
                    this.url[ "console" ] = param.at(1) ?? "";
                    break;
                }
                case "novnc": {
                    this.url[ "using_vnc" ] = Boolean(param.at(1) ?? 1);
                    break;
                }
                case "vmid": {
                    this.url[ "virtual_machine_id" ] = param.at(1) ?? 0;
                    break;
                }
                case "vmname": {
                    this.url[ "virtual_machine_name" ] = param.at(1) ?? "";
                    break;
                }
                case "node": {
                    this.url[ "proxmox_node" ] = param.at(1) ?? "";
                    break;
                }
                case "resize": {
                    this.url[ "resize" ] = param.at(1) ?? "";
                    break;
                }
                case "cmd": {
                    this.url[ "command" ] = param.at(1) ?? "";
                    break;
                }
                case undefined: {
                    break;
                }
                default: {
                    console.warn(
                        `unknown proxmox key: ${key}. Value: ${param.at(1)}`,
                    );
                    this.url[ key ] = param.at(1);
                    break;
                }
            }
        }
    }
}