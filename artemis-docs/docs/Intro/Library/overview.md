---
sidebar_position: 1
description: Import as a library
---

# Library Usage

The artemis `forensics` workspace is a very simple Rust
library. It exposes two (2) primary functions:

- parse_toml_file - Parse a TOML collection file at provided path
- parse_toml_data - Parse bytes associated with a TOML collection

Both functions will return nothing on success (artemis handles data
output) or an error.

# Logging

The artemis forensics workspace includes a logging feature that tracks internal issues it may
encounter when executing. If you import artemis into your own project you
may register you own logger, however that will then disable the builtin logger.
