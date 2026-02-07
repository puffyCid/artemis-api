---
sidebar_position: 6
description: Daemon example
---

# Example Setup

The artemis repo contains a small example remote server that can be used to test the daemon features of artemis.  
In order to run the example server and daemon you will need to install Rust and NodeJS.

:::info

Currently only Linux systems are supported for the example server and daemon.

:::

1. Clone the artemis repo
2. Compile the example daemon by navigating the daemon folder and running `cargo build --release --examples`
3. Navigate the tools/daemon server folder and running:
  - npm install
  - npm run build
  - npm run start
4. Run the example daemon binary and provide it the example server.toml file under daemon/tests/configs/server.toml

Once the daemon and server are running you should start seeing example data getting collected and server output similar to below:

```json
{
  "x-artemis-endpoint_id": "da8883a7-72a5-4d36-8e49-f8d18d43bcd6",
  "x-artemis-collection_id": "1",
  "x-artemis-collection_name": "linux_collection",
  "accept": "application/json",
  "content-encoding": "gzip",
  "content-type": "multipart/form-data; boundary=095c8846acd09c3b-fa2f8c5b226d970d-b61b76551b0794d0-f428fd5c832ebd7a",
  "content-length": "30486",
  "host": "127.0.0.1:8000"
}
Received filename: 0d8d990e-19ee-454d-a4a4-50ff3d9f39be. MIME application/jsonl
```