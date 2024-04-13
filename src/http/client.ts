import { ClientResponse } from "../../types/http/client.ts";
import { HttpError } from "./errors.ts";

export enum Protocol {
  GET = "GET",
  POST = "POST",
}

export enum BodyType {
  FORM = "form",
  NORMAL = "",
}

/**
 * Interface used to make a HTTP request to a URL
 */
export interface ClientRequest {
  /**HTTP URL to send request to */
  url: string;
  /**GET or POST protocol */
  protocol: Protocol;
  /**Headers to send in request. Default is content-type/json */
  headers?: Record<string, string>;
  /**Request body type */
  body_type?: BodyType;
  /**Follow HTTP redirects */
  follow_redirects?: boolean;
  /**Verify SSL certs */
  verify_ssl?: boolean;
}

/**
 * A simple HTTP client that can be used to make network requests. The Rust crate [reqwest](https://docs.rs/reqwest/latest/reqwest/index.html) is used to make the request.
 * @param request `ClientRequest` object used to send HTTP requests
 * @param body Optional request body to send. Must be in raw bytes.
 * @returns `ClientResponse` data or Error
 */
export async function request(
  js_request: ClientRequest,
  body: Uint8Array = new Uint8Array(0),
): Promise<ClientResponse | HttpError> {
  // Check if optional settings were not enabled
  if (js_request.headers === undefined) {
    js_request.headers = { "Content-Type": "application/json" };
  }
  if (js_request.body_type === undefined) {
    js_request.body_type = BodyType.NORMAL;
  }
  if (js_request.follow_redirects === undefined) {
    js_request.follow_redirects = true;
  }
  if (js_request.verify_ssl === undefined) {
    js_request.verify_ssl = true;
  }

  try {
    //@ts-ignore: Custom Artemis function
    const result = await http.send(JSON.stringify(js_request), body);
    const res: ClientResponse = JSON.parse(result);
    return res;
  } catch (err) {
    return new HttpError(
      "REQUEST_ERROR",
      `failed to make ${js_request.protocol} request to ${js_request.url}: ${err}`,
    );
  }
}
