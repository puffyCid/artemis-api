import { Chromium, PlatformType } from "../../../mod";
import { BrowserType } from "../../../types/applications/chromium";

function main() {
  console.log('Running Linux Chromium tests....');
  console.log(' Starting live test....');
  const chromium_client = new Chromium(PlatformType.Linux, true, BrowserType.CHROMIUM);

  const history_hits = chromium_client.history();
  if (history_hits.length === 0) {
    throw "No history???";
  }


  const cookie_hits = chromium_client.cookies();
  if (cookie_hits.length === 0) {
    throw "No history???";
  }
  console.log(' Live test passed! 🥳\n');
  console.log('All Linux Chromium tests passed! 🥳💃🕺');

}

main();
