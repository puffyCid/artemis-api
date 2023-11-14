import { VTResponse } from "../../types/http/vt.ts";
import { extractUtf8String } from "../encoding/strings.ts";
import { Protocol, request } from "./client.ts";
import { ErrorName, HttpError } from "./errors.ts";

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
  public async lookupHash(hash: string): Promise<VTResponse | HttpError> {
    const url = `https://www.virustotal.com/api/v3/files/${hash}`;
    return await this.send(url, "LOOKUP_HASH");
  }

  /**
   * Function to lookup an IP address
   * @param ip IP address
   * @returns A `VTResponse`
   */
  public async lookupIP(ip: string): Promise<VTResponse | HttpError> {
    const url = `https://www.virustotal.com/api/v3/ip_addresses/${ip}`;
    return await this.send(url, "LOOKUP_IP");
  }

  /**
   * Function to lookup a domain
   * @param domain Domain to lookup
   * @returns A `VTResponse`
   */
  public async lookupDomain(domain: string): Promise<VTResponse | HttpError> {
    const url = `https://www.virustotal.com/api/v3/domains/${domain}`;
    return await this.send(url, "LOOKUP_DOMAIN");
  }

  /**
   * Function to send all network requests to VirusTotal
   * @param url URL to make request to
   * @returns A `VTResponse`
   */
  private async send(
    url: string,
    err: ErrorName,
  ): Promise<VTResponse | HttpError> {
    const headers = {
      "x-apikey": this.key,
    };

    const response = await request(
      url,
      Protocol.GET,
      new Uint8Array(0),
      headers,
    );
    if (response instanceof HttpError) {
      response.name = err;
      return response;
    }

    const res: VTResponse = {
      status: response.status,
      url: response.url,
      body: JSON.parse(extractUtf8String(new Uint8Array(response.body))),
    };

    return res;
  }
}
