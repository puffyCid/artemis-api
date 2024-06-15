---
description: Connected USB devices
keywords:
  - windows
  - registry
---

# USBs

Artemis support attempting to extract USB devices that have been connected to
the Windows system. It will parse the SYSTEM Registry file to look for USB
devices that have been connected.

References:

- [Truth about USBs](https://www.sans.org/blog/the-truth-about-usb-device-serial-numbers/)

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect MRU
keys.

# Sample API Script

```typescript
import { listUsbDevices } from "./artemis-api/src/windows/registry/usb.ts";

function main() {
  const results = listUsbDevices();
  console.log(results);
}
```

# Output Structure

An array of `UsbDevices`

```typescript
export interface UsbDevices {
  device_class_id: string;
  friendly_name: string;
  /**Last drive letter assigned to the USB */
  drive_letter: string;
  last_connected: string;
  last_insertion: string;
  last_removal: string;
  install: string;
  first_install: string;
  usb_type: string;
  vendor: string;
  product: string;
  revision: string;
  tracking_id: string;
  disk_id: string;
}
```
