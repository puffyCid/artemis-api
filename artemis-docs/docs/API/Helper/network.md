---
description: Connecting to the World Wide Web!
---

# Networking APIs

The artemis API allows a user to make HTTP network requests using the
[reqwest](https://docs.rs/reqwest/latest/reqwest/index.html) crate. It can be
used to interact with external services or services that expose an API.

### request(client, body) -> ClientResponse | HttpError

Make a very simple GET or POST request to the provided URL. You may specify an
optional body.

The body must be in raw bytes if provided. This function is async

| Param  | Type          | Description                        |
| ------ | ------------- | ---------------------------------- |
| client | ClientRequest | ClientRequest object               |
| body   | Uint8Array    | Optional body to send with request |

### VirusTotal Class

A _very_ basic class to help interact with the VirusTotal API using the JS HTTP
client. Can be used to check VT for any additional data on hashes. Requires an
API key.

:::warning

**DO NOT** use this to lookup hashes for your entire filesystem!

Your key or IP will be **blocked** if you do!

:::

#### lookupHash(hash) -> VTResponse | HttpError

Lookup a MD5, SHA1, or SHA256 hash on VirusTotal. This function is async

| Param | Type   | Description               |
| ----- | ------ | ------------------------- |
| hash  | string | MD5, SHA1, or SHA256 hash |

#### lookupDomain(domain) -> VTResponse | HttpError

Lookup a domain on VirusTotal. This function is async

| Param  | Type   | Description      |
| ------ | ------ | ---------------- |
| domain | string | Domain to submit |

#### lookupIP(ip) -> VTResponse | HttpError

Lookup an IP on VirusTotal. This function is async

| Param | Type   | Description  |
| ----- | ------ | ------------ |
| ip    | string | IP to submit |

### checkEolStatus(name, version) -> EolStatus | HttpError

Check software status at https://endoflife.date. This can be used to determine
if installed software is still supported. Only the name of the software is
submitted to https://endoflife.date.

| Param   | Type   | Description      |
| ------- | ------ | ---------------- |
| name    | string | Software name    |
| version | string | Software version |

### lookupExtension(id, version, browser) -> CrxResponse | HttpError

Lookup browser extension reports on https://crxcavator.io. Will submit the
extension ID and version to https://crxcavator.io.

| Param   | Type    | Description                           |
| ------- | ------- | ------------------------------------- |
| id      | string  | Extension ID                          |
| version | string  | Extension version                     |
| browser | Browser | Browser associated with the extension |
