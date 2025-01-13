import { LinuxError } from "../../../src/linux/errors.ts";
import { geditRecentFiles } from "../../../src/linux/gnome/gedit.ts";

function main() {
  const results = geditRecentFiles();
  if (results instanceof LinuxError) {
    throw results;
  }
}

main();
