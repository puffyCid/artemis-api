import { HashlookupResponse, HashType } from "../../types/http/circlu";
import { encodeBytes } from "../encoding/bytes";
import { extractUtf8String } from "../encoding/strings";
import { ClientRequest, Protocol, request } from "./client";
import { HttpError } from "./errors";

/**
 * Function to lookup hashes against Circlu Hashlookup service
 * @param hashes Hashes to submit to Hashlookup. Can be single hash or array of hashes
 * @param hash_type Hash type to submit to Hashlookup. You cannot bulk lookup array of SHA256
 * @returns `HashlookupResponse` object or `HttpError`
 */
export async function circluHashlookup(
  hashes: string | string[],
  hash_type: HashType,
): Promise<HashlookupResponse | HashlookupResponse[] | HttpError> {
  if (hash_type === HashType.SHA256 && Array.isArray(hashes)) {
    return new HttpError(
      `REQUEST_ERROR`,
      `you cannot submit an array of SHA256 hashes. This is not supported by hashlookup`,
    );
  }

  let lookup_type = "lookup";
  let protocol = Protocol.GET;
  if (Array.isArray(hashes)) {
    lookup_type = "bulk";
    protocol = Protocol.POST;
  }

  const url = `https://hashlookup.circl.lu/${lookup_type}/${hash_type}`;
  const client: ClientRequest = {
    url,
    protocol,
  };

  let response;
  if (protocol === Protocol.GET) {
    client.url = `${client.url}/${hashes}`;
    response = await request(client);
  } else {
    const body = {
      "hashes": hashes,
    };
    const bytes = encodeBytes(JSON.stringify(body));
    response = await request(client, bytes);
  }

  if (response instanceof HttpError) {
    return response;
  } else if (response.status != 200) {
    return new HttpError(
      `REQUEST_ERROR`,
      `received non-200 response: ${
        extractUtf8String(new Uint8Array(response.body))
      }`,
    );
  }

  const result: HashlookupResponse | HashlookupResponse[] = JSON.parse(
    extractUtf8String(new Uint8Array(response.body)),
  );

  return result;
}
