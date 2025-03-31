import { EolResponse, EolStatus } from "../../types/http/eol";
import { extractUtf8String } from "../encoding/strings";
import { ClientRequest, Protocol, request } from "./client";
import { HttpError } from "./errors";

/**
 * Function to check the version information of software via https://endoflife.date. Only the software name is submitted to https://endoflife.date
 * @param name Software name
 * @param version Software version
 * @returns `EolStatus` object or `HttpError`
 */
export async function checkEolStatus(
  name: string,
  version: string,
): Promise<EolStatus | HttpError> {
  const url = `https://endoflife.date/api/${name.toLocaleLowerCase()}.json`;
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

  const result: EolResponse[] = JSON.parse(
    extractUtf8String(new Uint8Array(response.body)),
  );

  for (const entry of result) {
    if (entry.cycle.includes(version) || version.includes(entry.cycle)) {
      const status: EolStatus = {
        name,
        version,
        latest_version: entry["latest"],
        eol: entry["eol"],
        lts: entry["lts"],
        url: `https://endoflife.date/${name}`,
        release_date: entry["releaseDate"],
        latest_release_date: entry["latestReleaseDate"],
        support: entry["support"],
      };
      return status;
    }
  }

  return new HttpError(
    `REQUEST_ERROR`,
    `no match for the software ${name} and version ${version}`,
  );
}
