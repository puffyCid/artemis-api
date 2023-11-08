export enum Protocol {
  GET = "GET",
  POST = "POST",
}
/**
 * A simple HTTP client that can be used to make network requests. The Rust crate [reqwest](https://docs.rs/reqwest/latest/reqwest/index.html) is used to make the request.
 * @param url Target URL to send request to
 * @param protocol Target `Protocol` to use for request
 * @param body Optional request body to send. Must be in raw bytes.
 * @param headers Optional headers associated with request. Default is `application/json`
 * @returns `ClientResponse` data or Error
 */
export async function request(
  url: string,
  protocol: Protocol,
  body: Uint8Array = new Uint8Array(0),
  headers: Record<string, string> = { "Content-Type": "application/json" },
): Promise<ClientResponse | Error> {
  //@ts-ignore: Custom Artemis function
  const result = await http.send(url, protocol, headers, body);
  if (result instanceof Error) {
    return result;
  }

  const res: ClientResponse = JSON.parse(result);
  return res;
}
