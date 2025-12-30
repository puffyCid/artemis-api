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
  const url = `https://endoflife.date/api/${name.toLowerCase()}.json`;
  const client: ClientRequest = {
    url,
    protocol: Protocol.GET,
  };

  const response = await request(client);
  if (response instanceof HttpError) {
    return response;
  }

  if (response.status !== 200) {
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
        latest_version: entry[ "latest" ],
        eol: entry[ "eol" ],
        lts: entry[ "lts" ],
        url: `https://endoflife.date/${name}`,
        release_date: entry[ "releaseDate" ],
        latest_release_date: entry[ "latestReleaseDate" ],
        support: entry[ "support" ],
      };
      return status;
    }
  }

  return new HttpError(
    `REQUEST_ERROR`,
    `no match for the software ${name} and version ${version}`,
  );
}

/**
 * Function to test End of Life API  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the End of Life API
 */
export async function testCheckEolStatus(): Promise<void> {
  const application = "firefox";
  const version = "130";
  const result = await checkEolStatus(application, version);
  if (result instanceof HttpError) {
    throw console.log(result);
  }

  if (result.url !== "https://endoflife.date/firefox") {
    throw console.log(`Got ${result.url} expected "https://endoflife.date/firefox".......checkEolStatus ❌`);
  }

  if (result.lts !== false) {
    throw console.log(`Got ${result.lts} expected "false".......checkEolStatus ❌`);
  }

  if (result.release_date !== "2024-09-03") {
    throw console.log(`Got ${result.release_date} expected "2024-09-03".......checkEolStatus ❌`);
  }
  console.info(`  Function checkEolStatus ✅`);

}