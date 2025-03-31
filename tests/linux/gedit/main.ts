import { LinuxError } from "../../../src/linux/errors";
import { geditRecentFiles } from "../../../src/linux/gnome/gedit";

function main() {
  const results = geditRecentFiles();
  if (results instanceof LinuxError) {
    throw results;
  }
}

main();
