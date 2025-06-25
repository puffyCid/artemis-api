import { Chrome, Edge, PlatformType } from "../../../mod";

function main() {
  const edge_client = new Edge(PlatformType.Windows, true);
  console.log(`Edge browser info: ${JSON.stringify(edge_client)}`);


  let history_hits = edge_client.history();
  if (history_hits.length === 0) {
    throw "No history???";
  }

  console.log(`Edge history: ${JSON.stringify(history_hits[0])}`);

  let cookie_hits = edge_client.cookies();
  if (cookie_hits.length === 0) {
    throw "No history???";
  }

  console.log(`Edge cookies: ${JSON.stringify(cookie_hits[0])}`);


  const chrome_client = new Chrome(PlatformType.Windows);
  console.log(`Chrome browser info: ${JSON.stringify(chrome_client)}`);

  history_hits = chrome_client.history();
  if (history_hits.length === 0) {
    throw "No chrome history???";
  }

  console.log(`Chrome history: ${JSON.stringify(history_hits[0])}`);

  cookie_hits = chrome_client.cookies();
  if (cookie_hits.length === 0) {
    throw "No chrome cookies???";
  }

  console.log(`Chrome cookies: ${JSON.stringify(cookie_hits[0])}`);
}

main();
