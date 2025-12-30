import { OneDrive, PlatformType } from "../../../mod";
import { testExtractSyncEngine, testOneDrive, testReadOdlFiles } from "../../test";

function main() {
  console.log('Running Windows OneDrive tests....');
  console.log(' Starting live test....');
  const client = new OneDrive(PlatformType.Windows);
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

  console.log(' Starting OneDrive ODL tests....');
  testReadOdlFiles();
  console.log(' All OneDrive ODL tests passed! 🥳\n');

  console.log(' Starting OneDrive Sync Database tests....');
  testExtractSyncEngine();
  console.log(' All OneDrive Sync Database tests passed! 🥳\n');

  console.log('All Windows OneDrive tests passed! 🥳💃🕺');
}

main();
