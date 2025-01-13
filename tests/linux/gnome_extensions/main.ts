import { LinuxError } from "../../../src/linux/errors.ts";
import { getGnomeExtensions } from "../../../src/linux/gnome/extensions.ts";

function main() {
  const results = getGnomeExtensions();
  if (results instanceof LinuxError) {
    throw results;
  }
}

main();
