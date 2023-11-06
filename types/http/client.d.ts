/**
 * The network response from a request made by the artemis client
 */
interface ClientResponse {
  /**URL associated with the response */
  url: string;
  /**Response status code */
  status: number;
  /**Headers associated with the response */
  headers: Record<string, string>;
  /**Body length */
  contentLength: number;
  /**Response body in raw bytes */
  body: ArrayBuffer;
}
