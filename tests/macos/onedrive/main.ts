import { OneDrive, PlatformType } from "../../../mod";
import { testOneDrive } from "../../test";

function main() {
  console.log('Running macOS OneDrive tests....');
  console.log(' Starting live test....');
  const client = new OneDrive(PlatformType.Darwin);
  if (client.oneDriveProfiles().length === 0) {
    console.info('No OneDrive application!');
  }
  const keys = client.oneDriveKeys();
  if(client.oneDriveProfiles().length !== 0 && keys.length === 0) {
    throw console.error(`No keys found?`);
  }
  console.log(' Live test passed! 🥳\n');

  console.log(' Starting OneDrive Mock tests....');
  testOneDrive();
  console.log(' All OneDrive Mock tests passed! 🥳\n');

  console.log('All macOS OneDrive tests passed! 🥳💃🕺');
}

main();
