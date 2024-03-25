import { HttpError } from "./errors.ts";

export enum Protocol {
  GET = "GET",
  POST = "POST",
}

export enum BodyType {
  FORM = "form",
  NORMAL = "",
}

export enum FollowRedirect {
  DISABLE = "disable",
  ENABLE = "",
}

/**
 * A simple HTTP client that can be used to make network requests. The Rust crate [reqwest](https://docs.rs/reqwest/latest/reqwest/index.html) is used to make the request.
 * @param url Target URL to send request to
 * @param protocol Target `Protocol` to use for request
 * @param body Optional request body to send. Must be in raw bytes.
 * @param headers Optional headers associated with request. Default is `application/json`
 * @param body_type Optional body definition. Either `BodyType.FORM` or `BodyType.NORMAL`. Default is `NORMAL`
 * @param follow_redirect Optional setting to determine if HTTP client should follow redirects Default is `FollowRedirect.ENABLE`
 * @returns `ClientResponse` data or Error
 */
export async function request(
  url: string,
  protocol: Protocol,
  body: Uint8Array = new Uint8Array(0),
  headers: Record<string, string> = { "Content-Type": "application/json" },
  body_type: BodyType = BodyType.NORMAL,
  follow_redirect = FollowRedirect.ENABLE,
): Promise<ClientResponse | HttpError> {
  try {
    //@ts-ignore: Custom Artemis function
    const result = await http.send(
      url,
      protocol,
      headers,
      body,
      body_type,
      follow_redirect,
    );
    const res: ClientResponse = JSON.parse(result);
    return res;
  } catch (err) {
    return new HttpError(
      "REQUEST_ERROR",
      `failed to make ${protocol} request to ${url}: ${err}`,
    );
  }
}
