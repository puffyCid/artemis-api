---
sidebar_position: 1
---

# Introduction

Artemis is a powerful command line digital forensic and incident response (DFIR)
tool that collects forensic data from Windows, macOS, and Linux endpoints. Its
primary focus is: speed, ease of use, and low resource usage.

Notable features _so far_:

- Setup collections using basic TOML files
- Parsing support for large amount of forensic artifacts (40+)
- Output to JSON or JSONL or CSV file(s)
- Can output results to local system or upload to cloud services.
- Embedded JavaScript runtime via [Deno](https://deno.land/)

The goal of this book is to provide a comprehensive guide on how to use artemis.

Artemis is a relatively(ish) new forensic tool written from scratch. While it
does have an extensive test suite and has been carefully developed to make sure
the data it produces is accurate. You may want to verify its output with other
popular DFIR tools:

- The cross platform forensic tool
  [Velociprator](https://docs.velociraptor.app/)

During the development of artemis both of these tools were used to provide
verification that the output of artemis is correct.

If you looking are for free and open-source forensic tool to add to your
forensic toolkit or to casually review forensic data or compare the results of
other forensic tools then artemis is a great option!

# Contributing

You can find the source code on [GitHub](https://github.com/puffycid/artemis).
If you find a bug feel free to open an issue. If you would like to contribute,
**please** checkout the
[CONTRIBUTING](https://github.com/puffycid/artemis/blob/main/CONTRIBUTING.md)
guide and [docs](../Contributing/overview.md) prior to starting.

# License

[artemis](https://github.com/puffycid/artemis),
[artemis-api](https://github.com/puffycid/artemis-api), and
[artemis-scripts](https://github.com/puffycid/artemis-scripts) are all released
under the MIT License
