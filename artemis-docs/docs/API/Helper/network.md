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
| body     | `Uint8Array`             | Optional body to send with request                                   |
| headers  | `Record<string, string>` | Optional headers to use. Default is `Content-Type: application/json` |

### VirusTotal Class

A _very_ basic class to help interact with the VirusTotal API using the JS HTTP
client. Can be used to check VT for any additional data on hashes. Requires an
API key.

:::warning

**DO NOT** use this to lookup hashes for your entire filesystem!

Your key or IP will be **blocked** if you do!

:::

#### lookupHash(hash) -> `VTResponse | Error`

Lookup a MD5, SHA1, or SHA256 hash on VirusTotal. This function is `async`

| Param | Type     | Description               |
| ----- | -------- | ------------------------- |
| hash  | `string` | MD5, SHA1, or SHA256 hash |

#### lookupDomain(domain) -> `VTResponse | Error`

Lookup a domain on VirusTotal. This function is `async`

| Param  | Type     | Description      |
| ------ | -------- | ---------------- |
| domain | `string` | Domain to submit |

#### lookupIP(ip) -> `VTResponse | Error`

Lookup an IP on VirusTotal. This function is `async`

| Param | Type     | Description  |
| ----- | -------- | ------------ |
| ip    | `string` | IP to submit |
