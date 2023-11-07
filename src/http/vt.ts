import { VTResponse } from "../../types/http/vt.ts";
import { encodeBytes } from "../encoding/bytes.ts";
import { extractUtf8String } from "../encoding/strings.ts";
import { Protocol, request } from "./client.ts";

/**
 * @class Simple API class to help interact with VT
 *
 * **DO NOT** use this to lookup hashes for your entire filesystem.
 * Your key or IP will be **blocked** if you do!
 */
export class VirusTotal {
  key: string;

  /**
   * Provide the VT API key for you account
   * @param key VirusTotal API key
   */
  constructor(key: string) {
    this.key = key;
  }

  /**
   * Function to lookup a hash on VirusTotal
   * @param hash MD5, SHA1, or sha256
   * @returns A `VTResponse`
   */
  public async lookupHash(hash: string): Promise<VTResponse | Error> {
    const url = `https://www.virustotal.com/api/v3/files/${hash}`;
    const headers = {
      "x-apikey": this.key,
    };

    const response = await request(url, Protocol.GET, encodeBytes(""), headers);
    if (response instanceof Error) {
      return response;
    }

    if (response.status != 200) {
      console.warn(`Got non-OK response`);
    }

    const vtFile: VTResponse = {
      status: response.status,
      url: response.url,
      body: JSON.parse(extractUtf8String(new Uint8Array(response.body))),
    };

    return vtFile;
  }
}
