import { Browser, CrxResponse } from "../../types/http/crxcavator.ts";
import { extractUtf8String } from "../encoding/strings.ts";
import { ClientRequest, Protocol, request } from "./client.ts";
import { HttpError } from "./errors.ts";

/**
 * Function to lookup browser extension reports on https://crxcavator.io
 * @param id Extension id
 * @param version Extension version
 * @param browser Browser software associated with extension_id
 * @returns `CrxResponse` object or `HttpError`
 */
export async function lookupExtension(
  id: string,
  version: string,
  browser: Browser,
): Promise<CrxResponse | HttpError> {
  const url =
    `https://api.crxcavator.io/v1/report/${id}/${version}?platform=${browser}`;

  const client: ClientRequest = {
    url,
    protocol: Protocol.GET,
  };

  const response = await request(client);
  if (response instanceof HttpError) {
    return response;
  }

  if (response.status != 200) {
    const message = extractUtf8String(new Uint8Array(response.body));
    return new HttpError(`REQUEST_ERROR`, `non-200 response: ${message}`);
  }

  const result: CrxResponse | null = JSON.parse(
    extractUtf8String(new Uint8Array(response.body)),
  );

  if (result === null) {
    return new HttpError(`REQUEST_ERROR`, `got null response for ${id}`);
  }

  return result;
}
