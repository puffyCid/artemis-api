---
description: Timeline artifacts
---

# Timesketch API

These functions help timeline artifacts that artemis can parse.

### timelineArtifact(data, artifact): TimesketchTimeline[] | TimesketchError

Function to timeline supported artifacts and return an array of timeline entries
or error.

| Param    | Type               | Description                  |
| -------- | ------------------ | ---------------------------- |
| data     | unknown            | Artifact data                |
| artifact | TimesketchArtifact | Type of artifact to timeline |

### Timesketch Class

A _very_ basic class to help authenticate and upload timelines to Timesketch.
Currently only credential authentication is supported

:::warning

Just like uploading to the [cloud](../../Intro//Collections/uploads.md)
currently artemis does not securely protect credentials used to authenticate to
Timesketch.

**This is important.** Timesketch has very limited support for any kind of
account permissions. If you create an account for artemis and an unauthorized
user obtains the credentials for the account they will be able upload, delete,
etc any data uploaded by artemis.

If you do not want to expose Timesketch credentials, you can timeline the data
to a local directory, network share, or external drive. Then upload the data
using an alternative tool.

:::

#### timelineAndUpload(data, artifact): Promise&lt;void | TimesketchError&gt;

Async function to timeline and upload data to Timesketch. Returns nothing if
successful or an error.

| Param    | Type               | Description                  |
| -------- | ------------------ | ---------------------------- |
| data     | unknown            | Artifact data                |
| artifact | TimesketchArtifact | Type of artifact to timeline |

#### upload(data, artifact): Promise&lt;void | TimesketchError&gt;

Async function to upload data to Timesketch. Returns nothing if successful or an
error.

| Param    | Type                 | Description             |
| -------- | -------------------- | ----------------------- |
| data     | TimesketchTimeline[] | Array of timelined data |
| artifact | string               | Name of artifact        |
