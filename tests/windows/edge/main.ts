import { Edge, PlatformType } from "../../../mod";

function main() {
  console.log('Running Microsoft Edge tests....');
  console.log(' Starting live test....');
  const client = new Edge(PlatformType.Windows);
  const history = client.history();
  if (history.length === 0) {
    console.warn(`No history in Edge browser?`);
  } else if (history[0].url === "") {
    throw `Empty URL for Edge history: ${history[0]}`;
  }

  console.log(' Live test passed! 🥳\n');
  console.log('All Microsoft Edge tests passed! 🥳💃🕺');
}

main();
