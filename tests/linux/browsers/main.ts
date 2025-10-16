import { Chromium, PlatformType } from "../../../mod";
import { BrowserType } from "../../../types/applications/chromium";

function main() {
  const chromium_client = new Chromium(PlatformType.Linux, true, BrowserType.CHROMIUM);
  console.log(`Chromium browser info: ${JSON.stringify(chromium_client)}`);

  const history_hits = chromium_client.history();
  if (history_hits.length === 0) {
    throw "No history???";
  }

  console.log(`Chromium history: ${JSON.stringify(history_hits[ 0 ])}`);

  const cookie_hits = chromium_client.cookies();
  if (cookie_hits.length === 0) {
    throw "No history???";
  }

  console.log(`Chromium cookies: ${JSON.stringify(cookie_hits[ 0 ])}`);
}

main();
