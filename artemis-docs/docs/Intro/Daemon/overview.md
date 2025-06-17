---
sidebar_position: 1
description: Daemon overview
---

# Background

Starting with version 0.15.0 artemis has **experimental** support for running as a daemon. By running artemis as a daemon you may send remote collection commands to the daemon and have it upload results to a compatible API server.  
Artemis daemon capabilities were inspired by the [osquery remote](https://osquery.readthedocs.io/en/stable/deployment/remote/) options. Artemis follows a similar process as osquery when running as a daemon

## Why run as a daemon?

Artemis currently has strong support for running as a standalone CLI tool. Typically you would parse forensic artifacts either on a live system by executing artemis using a remote tool like PsExec or acquire the artifact and parse locally.  
By adding support to run as a daemon, users could install artemis on remote systems and then issue and receive collections from a central server. This would make it easier for users to collect data from multiple endpoints at the same time.

## How to run as a daemon?

Since daemon support is still experimental it is not built into the release binaries yet. You must clone the [artemis](https://github.com/puffyCid/artemis) repo and build the example daemon binary.