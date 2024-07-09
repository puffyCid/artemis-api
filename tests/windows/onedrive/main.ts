import { ApplicationError } from "../../../src/applications/errors.ts";
import { onedriveDetails } from "../../../src/applications/onedrive/parser.ts";
import { PlatformType } from "../../../src/system/systeminfo.ts";

function main() {
  const results = onedriveDetails(PlatformType.Windows);
  if (results instanceof ApplicationError) {
    throw results;
  }
}

main();
