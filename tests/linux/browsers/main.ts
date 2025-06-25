import { Chromium, PlatformType } from "../../../mod";
import { BrowserType } from "../../../types/applications/chromium";

function main() {
  const chromium_client = new Chromium(PlatformType.Linux, true, BrowserType.CHROMIUM);

  let history_hits = chromium_client.history();
  if (history_hits.length === 0) {
    throw "No history???";
  }

  console.log(`Chromium history: ${JSON.stringify(history_hits[0])}`);

  let cookie_hits = chromium_client.cookies();
  if (cookie_hits.length === 0) {
    throw "No history???";
  }

  console.log(`Chromium cookies: ${JSON.stringify(cookie_hits[0])}`);
}

main();
