import { ApplicationError } from "../../../src/applications/errors";
import { onedriveDetails } from "../../../src/applications/onedrive/parser";
import { PlatformType } from "../../../src/system/systeminfo";

function main() {
  const results = onedriveDetails(PlatformType.Darwin);
  if (results instanceof ApplicationError) {
    throw results;
  }
}

main();
