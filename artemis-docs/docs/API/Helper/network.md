---
description: Connecting to the World Wide Web!
---

# Networking APIs

The artemis API allows a user to make HTTP network requests using the
[reqwest](https://docs.rs/reqwest/latest/reqwest/index.html) crate. It can be
used to interact with external services or services that expose an API.

### request(url, protocol, body, headers) -> `ClientResponse | Error`

Make a very simple GET or POST request to the provided URL. You may specify an
optional body or headers. By default headers will use
`Content-Type: application/json`.

The body must be in raw bytes if provided. This function is `async`

| Param    | Type                     | Description                                                          |
| -------- | ------------------------ | -------------------------------------------------------------------- |
| url      | `string`                 | URL to target                                                        |
| protocol | `Protocol`               | `Protocol` to use. Currently only GET or POST                        |
| body     | `ArrayBuffer`            | Optional body to send with request                                   |
| headers  | `Record<string, string>` | Optional headers to use. Default is `Content-Type: application/json` |
