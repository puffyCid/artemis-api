import { HashlookupResponse, HashType, MissingHash } from "../../types/http/circlu";
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
): Promise<HashlookupResponse | HashlookupResponse[] | MissingHash | HttpError> {
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
  } else if (response.status !== 200 && response.status !== 404) {
    return new HttpError(
      `REQUEST_ERROR`,
      `received non-200 response: ${extractUtf8String(new Uint8Array(response.body))
      }`,
    );
  } else if (response.status === 404) {
    const missing: MissingHash = JSON.parse(extractUtf8String(new Uint8Array(response.body)));
    return missing;
  }

  const result: HashlookupResponse | HashlookupResponse[] = JSON.parse(
    extractUtf8String(new Uint8Array(response.body)),
  );

  return result;
}

/**
 * Function to test circlu API  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the circlu API
 */
export async function testCircluHashlookup(): Promise<void> {
  const single_hash = "8ED4B4ED952526D89899E723F3488DE4";
  const single_response = await circluHashlookup(single_hash, HashType.MD5);
  if (single_response instanceof HttpError) {
    throw single_response;
  }

  if (Array.isArray(single_response)) {
    throw console.log("Got array response");
  }

  if (isMissing(single_response)) {
    throw console.log(`Got ${single_response.message} wanted successful response.......circluHashlookup ❌`);
  }

  if (single_response.ProductCode?.ProductName != "Cumulative Update for Windows Server 2016 for x64 (KB4338817)") {
    throw console.log(`Got ${single_response.ProductName} wanted "Cumulative Update for Windows Server 2016 for x64 (KB4338817)".......circluHashlookup ❌`);
  }


  if (single_response.FileSize != "2520") {
    throw console.log(`Got ${single_response.FileSize} wanted "2520".......circluHashlookup ❌`);
  }

  if (single_response.source != "NSRL") {
    throw console.log(`Got ${single_response.source} wanted "NSRL".......circluHashlookup ❌`);
  }

  if (single_response.FileName != "wow64_microsoft-windows-i..timezones.resources_31bf3856ad364e35_10.0.16299.579_de-de_f24979c73226184d.manifest") {
    throw console.log(`Got ${single_response.FileName} wanted "wow64_microsoft-windows-i..timezones.resources_31bf3856ad364e35_10.0.16299.579_de-de_f24979c73226184d.manifest".......circluHashlookup ❌`);
  }
  console.info(`  Function circluHashlookup ✅`);

}

function isMissing(value: MissingHash | HashlookupResponse): value is MissingHash {
  return 'query' in value;
}