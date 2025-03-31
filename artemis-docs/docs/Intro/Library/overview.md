---
sidebar_position: 1
description: Import as a library
---

# Library Usage

The `core` (also referred to as `artemis-core`) workspace is a very simple Rust
library. It exposes two (2) primary functions:

- parse_toml_file - Parse a TOML collection file at provided path
- parse_toml_data - Parse bytes associated with a TOML collection

Both functions will return nothing on success (artemis-core handles data
output) or an error.

# Logging

artemis-core includes a logging feature that tracks internal issues it may
encounter when executing. If you import artemis-core into your own project you
may register you own logger, however that will then disable the builtin logger.
