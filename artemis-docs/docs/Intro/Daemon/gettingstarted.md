---
sidebar_position: 2
description: Setup the daemon
---

# Getting Started

The artemis daemon follows a similar process as [osquery remote](https://osquery.readthedocs.io/en/stable/deployment/remote/) settings. It currently has the following features:
- Enrollment
- Daemon configuration
- Receiving and uploading collections

## Enrollment

Currently in order to connect to a supported server artemis must use an enrollment secret. Once a remote server accepts the enrollment request it should generate a node_key for the endpoint.  
When artemis receives the node_key, it will use the node_key instead of the enrollment secret for all future communications with the remote server.

## Configuration

Once artemis has successfully enrolled into a remote server it will send a request for a TOML daemon configuration file. If the server does not provide one, artemis will generate a default configuration file and use that.

## Collections

After enrolling and setting up a configuration file, artemis will begin polling the server for TOML collection jobs. If server sends a collection job to the daemon, artemis will parse the collection and start uploading the results to the remote server.