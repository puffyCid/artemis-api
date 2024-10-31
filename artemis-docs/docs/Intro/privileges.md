---
sidebar_position: 4
---

# Privileges

The goal for artemis is to parse endpoint forensic artifacts. Many of these
artifacts can only be accessed with elevated privileges. If you try running
artemis as a standard user, depending on what you want to collect you will
encounter permission errors.

Artemis **does not** directly modify anything on disk. It only writes results to
a file(s) if specified in the TOML collection or CLI args.
