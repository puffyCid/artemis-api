import { getHomebrewInfo } from "../../../mod.ts";
import { checkEolStatus } from "../../../src/http/eol.ts";
import { HttpError } from "../../../src/http/errors.ts";

async function main() {
  const apps = getHomebrewInfo();

  const limit = 10;
  for (let i = 0; i < apps.packages.length; i++) {
    const status = await checkEolStatus(
      apps.packages[i].name,
      apps.packages[i].version,
    );
    if (status instanceof HttpError) {
      if (
        status.message.includes("non-200") ||
        status.message.includes("no match")
      ) {
        if (i === limit) {
          break;
        }
        continue;
      }
      throw status;
    }

    if (i === limit) {
      break;
    }
  }
}

main();
