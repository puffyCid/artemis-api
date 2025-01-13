import type { Url } from "../../../types/http/unfold.ts";
import { EncodingError } from "../../encoding/errors.ts";
import { extractUtf8String } from "../../encoding/mod.ts";
import { formatGuid } from "../../encoding/uuid.ts";
import { NomError } from "../../nom/error.ts";
import { Endian, nomUnsignedFourBytes } from "../../nom/helpers.ts";
import { take } from "../../nom/parsers.ts";
import { decodeBase64Url } from "./encoding.ts";

/**
 * Class to parse Outlook URLs
 */
export class Outlook {
    private url: Url;

    constructor(url: Url) {
        this.url = url;
    }

    /**
     *  Extract data Outlook Inbox
     */
    public parseOutlook() {
        if (this.url.url.includes("inbox")) {
            const data = decodeBase64Url(this.url.last_segment);
            if (data instanceof EncodingError) {
                return;
            }
            // Header.value breakdown?: First byte major version, second byte minor version, third byte revision?
            const header = nomUnsignedFourBytes(data, Endian.Le);
            if (header instanceof NomError) {
                return;
            }

            // Next 8 bytes are part of the account ID
            // Can also be found in OST properties
            let size = 8;
            let account_id = take(header.remaining, size);
            if (account_id instanceof NomError) {
                return;
            }
            // The URL contains a condensed? version of account ID.
            // Ex: 003bff. OST would show 0003bff
            // URL also seems to split the ID?
            const id = extractUtf8String(
                account_id.nommed.slice(3) as Uint8Array,
            );

            size = 14;
            account_id = take(account_id.remaining, size);
            if (account_id instanceof NomError) {
                return;
            }
            const id2 = extractUtf8String(account_id.nommed as Uint8Array);
            size = 8;

            // 3rd part of account ID (-00)
            // we can skip and add manually

            const remaining = take(account_id.remaining, size);
            if (remaining instanceof NomError) {
                return;
            }

            const id_size = 16;
            const message_id = take(remaining.remaining, id_size);
            if (message_id instanceof NomError) {
                return;
            }

            this.url["guid"] = formatGuid(
                Endian.Le,
                message_id.nommed as Uint8Array,
            );
            this.url["account_id"] = `${id}-${id2}-00`;
        }
    }
}
