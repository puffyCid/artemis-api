import { Unfold } from "../../../src/unfold/client.ts";
import { UnfoldError } from "../../../src/unfold/error.ts";

function main() {
  const client = new Unfold(
    "http://www.bing.com/search?form=&q=artemis+dfir+github&form=QBLH&sp=-1&ghc=1&lq=0&pq=artemis+dfir+github&sc=8-19&qs=n&sk=&cvid=623401B91F904E238BC110949286AC22&ghsh=0&ghacc=0&ghpl=",
  );
  const info = client.parseUrl();
  if (info instanceof UnfoldError) {
    throw info;
  }

  console.log(info);
  if (info["partial_query"] != "artemis dfir github") {
    throw `got ${info["partial_query"]} instead of 'artemis dfir github'`;
  }
}

main();
