import { LinuxError } from "../../../src/linux/errors";
import { getGnomeExtensions } from "../../../src/linux/gnome/extensions";

function main() {
  const results = getGnomeExtensions();
  if (results instanceof LinuxError) {
    throw results;
  }
}

main();
