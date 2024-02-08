---
sidebar_position: 1
---

# Introduction

**Artemis** is a powerful command line digital forensic and incident response
(DFIR) tool that collects forensic data from Windows, macOS, and Linux
endpoints. Its primary focus is: speed, ease of use, and low resource usage.

Notable features _so far_:

- Setup collections using basic TOML files
- Parsing support for large amount of forensic artifacts (25+)
- Output to JSON or JSONL file(s)
- Can output results to local system or upload to cloud services.
- Embedded JavaScript runtime via [Deno](https://deno.land/)
- Can be used as a library via [artemis-core](./Library/overview.md)
- MIT license

The goal of this book is to provide a comprehensive guide on how to use artemis
and `artemis-core`.

# Has this been tested on real incidents?

**NO**

artemis is a new forensic tool written from scratch and it has not been tested
in any production environment. It does however have an extensive test suite and
has been carefully developed to make sure the data it produces is accurate.

If you are looking for a free and open-source forensic tool to lead an
investigation, two (2) great options are:

- The cross platform forensic tool
  [Velociprator](https://docs.velociraptor.app/)
- Windows artifacts only but still excellent
  [Zimmerman tools](https://ericzimmerman.github.io/#!index.md)

During the development of artemis both of these tools were used to provide
verification that the output of artemis is correct.

If you looking are for free and open-source forensic tool to add to your
forensic toolkit or to casually review forensic data or compare the results of
other forensic tools then artemis is a great option!

# artemis vs artemis-core

artemis is an executable that can be executed on Windows, macOS, or Linux
systems.

`artemis-core` is a library that can be imported to an application to parse
forensic data. artemis imports the `artemis-core` library to perform all of its
forensic parsing.

# Contributing

You can find the source code on [GitHub](https://github.com/puffycid/artemis).
If you find a bug feel free to open an issue. If you would like to contribute,
**please** read the
[CONTRIBUTING](https://github.com/puffycid/artemis/blob/main/CONTRIBUTING.md)
guide prior to starting.

# License

[artemis](https://github.com/puffycid/artemis),
[artemis-api](https://github.com/puffycid/artemis-api), and
[artemis-scripts](https://github.com/puffycid/artemis-scripts) are all released
under the MIT License
