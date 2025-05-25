import { Url } from "../../../types/http/unfold";
import { unixEpochToISO } from "../../time/conversion";

export class Discord {
    private url: Url;

    constructor (url: Url) {
        this.url = url;
    }

    /**
     * Function to extract Discord messages
     * https://github.com/obsidianforensics/unfurl/blob/main/unfurl/parsers/parse_discord.py
     */
    public parseDiscord() {
        if (this.url.url.includes("/channels/")) {
            console.log(JSON.stringify(this.url.segments));
            for (let i = 0; i < this.url.segments.length; i++) {
                const value = this.url.segments[ i ];
                if (value === "channels") {
                    continue;
                }

                // This is a "Snowflake" timestamp
                // Made by Twitter
                // https://discord.com/developers/docs/reference#snowflakes
                const timestamp = (BigInt(value) >> BigInt(22)) + BigInt(1420070400000);
                const worker_id = (BigInt(value) & BigInt(0x3E0000)) >> BigInt(17);
                const proc_id = (BigInt(value) & BigInt(0x1F000)) >> BigInt(17);
                const increment = BigInt(value) & BigInt(0xfff);

                console.log(timestamp);
                if (i === 1) {
                    this.url[ "channel_created" ] = unixEpochToISO(timestamp);
                    this.url[ "channel_worker_id" ] = Number(worker_id);
                    this.url[ "channel_proc_id" ] = Number(proc_id);
                    this.url[ "channel_increment" ] = Number(increment);
                } else if (i === 2) {
                    this.url[ "room_created" ] = unixEpochToISO(timestamp);
                    this.url[ "room_worker_id" ] = Number(worker_id);
                    this.url[ "room_proc_id" ] = Number(proc_id);
                    this.url[ "room_increment" ] = Number(increment);
                } else if (i === 3) {
                    this.url[ "message_sent" ] = unixEpochToISO(timestamp);
                    this.url[ "messageworker_id" ] = Number(worker_id);
                    this.url[ "message_proc_id" ] = Number(proc_id);
                    this.url[ "message_increment" ] = Number(increment);
                }
            }
        }
    }
}