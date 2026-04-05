---
sidebar_position: 6
description: Additional Platforms
---

# Musl Support

Artemis has support for the musl C standard library. This is useful if you want to run artemis on very niche Linux systems or systems that support ELF binaries. This allows us to avoid the target system C runtime and statically link msul instead.

If you want to compile artemis with musl runtime you will need [cross](https://github.com/cross-rs/cross). Once cross is installed just run:

- cross build --release --bin artemis --target x86_64-unknown-linux-musl

You should then get an artemis Linux binary at:

- target/x86_64-unknown-linux-musl/release/artemis


## ESXi

A possible use case for musl binaries is running artemis on ESXi systems. You can use artemis to parse logs and data for forensic analysis.

:::info

Artemis has only been tested on ESXi version 8.0.3. But it *should* run on older and newer versions of ESXi.

Feel free to open issue if errors are encountered.

:::

:::warning

Unsigned 3rd party binaries are discouraged on ESXi appliances.

[UAC](https://github.com/tclahr/uac) is recommended if want to collect data without using a 3rd party binary.

If you have never collected data from an ESXi system before. You should try [UAC](https://github.com/tclahr/uac).

:::

The easiest method to run artemis on ESXi is:

1. Download the latest stable [musl linux release](https://github.com/puffyCid/artemis/releases)
2. Package artemis into a vSphere Installation Bundles (VIB)
3. SSH into the ESXi appliance and install the VIB package

Since the VIB package is not signed, you will need root permissions in order to install the VIB package:

- `esxcli software vib install -f -v file:///vmfs/volumes/<id>/artemis.vib`

Once artemis is installed you can start collecting supported [artifacts](../../Artifacts/esxi.md)

```
esxcli software vib install -f -v file:///vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0/artemis.vib
Installation Result
   Message: Operation finished successfully.
   VIBs Installed: puffycid_bootbank_artemis_0.19.0
   VIBs Removed: 
   VIBs Skipped: 
   Reboot Required: false
   DPU Results: 

[root@localhost:/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0] artemis -h
A cross platform forensic parser

Usage: artemis [OPTIONS] [COMMAND]

Commands:
  acquire  Acquire forensic artifacts
  help     Print this message or the help of the given subcommand(s)

Options:
  -t, --toml <TOML>              Full path to TOML collector
  -d, --decode <DECODE>          Base64 encoded TOML file
  -j, --javascript <JAVASCRIPT>  Full path to JavaScript file
  -h, --help                     Print help
  -V, --version                  Print version

[root@localhost:/vmfs/volumes/69d0473d-ded27d57-be04-52540075d1a0] artemis -j main.js 
[artemis] Starting artemis collection!
2026-04-03T23:07:31Z In(182) vmkernel: VMB: 65: Reserved 4 MPNs starting @ 0x4c4
2026-04-03T23:07:31Z In(182) vmkernel: VMB_ACPI: 793: No SPCR table found.
2026-04-03T23:07:31Z In(182) vmkernel: VMB_SERIAL: 332: Serial port set to default configuration.
2026-04-03T23:07:31Z In(182) vmkernel: VMB: 79: TDX: Unsupported on CPU (MSR_MTRRCAP = 0x508)
2026-04-03T23:07:31Z In(182) vmkernel: VMB_MEMMAP: 2744: memmap[0]: addr 0, len 9fc00, type 1
```

Remove artemis once you are done:

- `esxcli software vib remove -n artemis`

:::danger

Artemis has only been tested on development/test instances of ESXi devices.
Unsigned 3rd party binaries are discouraged on ESXi appliances.

Currently [UAC](https://github.com/tclahr/uac) is suggested if want to collect data

You should only consider using artemis if you want todo the following:

- Run yara rules against ESXi appliance
- Generate a filelisting timeline
- Develop additional artifact parsers
- Run it on a test ESXi instance

:::


:::danger

You may also run artemis without packaging it in a VIB.  
However, runtime ESXi security protections associated with `/User/ExecInstalledOnly -i 0` will need to be disabled.

:::

### ESXi Limitations

Artemis currently does not support the following artifacts on ESXi systems:

- Process listing
- Network connections
- System info


In addition, cloud uploads and remote TOML collections are currently not supported.


:::info

Is ESXi Linux based?  
[No (supposedly)](https://www.v-front.de/2013/08/a-myth-busted-and-faq-esxi-is-not-based.html)

:::