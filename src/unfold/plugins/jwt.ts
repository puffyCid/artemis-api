import { Url } from "../../../types/http/unfold";
import { EncodingError } from "../../encoding/errors";
import { extractUtf8String } from "../../encoding/strings";
import { NomError } from "../../nom/error";
import { takeUntil } from "../../nom/parsers";
import { decodeBase64Url } from "./encoding";

/**
 * Function to attempt to parse JSON Web Tokens
 * @param payload Base64 encoded string containing 2 periods (".")
 * @param url `Url` object
 * @returns Updated `Url` object containing JSON Web Token info
 */
export function detectJsonWebToken(payload: string, url: Url) {
    const payload_components = payload.match(/\./g);
    if (payload_components?.length !== 2) {
        return;
    }
    const values = payload.split(".");

    const header = values.at(0) ?? "";

    if (header.length % 4 !== 0 && !header.includes("=") && (header.length + 1) % 4 !== 0) {
        return;
    }

    const header_info = decodeBase64Url(header);
    if (header_info instanceof EncodingError) {
        return;
    }

    const header_payload = extractUtf8String(header_info);
    if (!header_payload.includes("{")) {
        return;
    }
    url[ "jwt_header" ] = header_payload;
    const payload_data = values.at(1) ?? "";



    const payload_bytes = decodeBase64Url(payload_data);
    if (payload_bytes instanceof EncodingError) {
        return;
    }
    if (payload_bytes.at(0) === 123) {
        const payload_value = extractUtf8String(payload_bytes);
        if (!payload_value.includes("{")) {
            return;
        }
        url[ "jwt_payload" ] = payload_value;
    } else {
        const payload_start = takeUntil(payload_bytes, new Uint8Array([ 123 ]));
        if (payload_start instanceof NomError) {
            return;
        }

        const payload_end = takeUntil(payload_start.remaining, new Uint8Array([ 125, 63, 0, 0 ]));
        if (payload_end instanceof NomError) {
            return;
        }
        const payload_value = extractUtf8String(payload_end.nommed as Uint8Array);
        if (!payload_value.includes("{")) {
            return;
        }
        url[ "jwt_payload" ] = payload_value;
    }

    url[ "jwt_signature" ] = values.at(2) ?? "";
}