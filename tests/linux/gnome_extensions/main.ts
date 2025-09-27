import { LinuxError } from "../../../src/linux/errors";
import { getGnomeExtensions, testGetGnomeExtensions } from "../../../src/linux/gnome/extensions";

function main() {
  console.log('Running GNOME Extensions tests....');
  console.log(' Starting live test....');
  const results = getGnomeExtensions();
  if (results instanceof LinuxError) {
    throw results;
  }

  console.log(' Live test passed! 🥳\n');

  console.log(' Starting extension test....');
  testGetGnomeExtensions();

  console.log(' GNOME Extensions test passed! 🥳');
  console.log('All GNOME Extensions tests passed! 🥳💃🕺');

}

main();
