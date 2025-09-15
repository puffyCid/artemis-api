import { LinuxError } from "../../../src/linux/errors";
import { geditRecentFiles, testGeditRecentFiles } from "../../../src/linux/gnome/gedit";

function main() {
  console.log('Running GNOME Gedit tests....');
  console.log(' Starting live test....');
  const results = geditRecentFiles();
  if (results instanceof LinuxError) {
    throw results;
  }
  console.log(' Live test passed! 🥳\n');

  console.log(' Starting gedit recent files test....');
  testGeditRecentFiles();

  console.log(' GNOME gedit recent files test passed! 🥳');
  console.log('All GNOME gedit tests passed! 🥳💃🕺');
}

main();
