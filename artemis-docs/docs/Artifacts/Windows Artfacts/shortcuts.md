---
description: Metadata about recently opened files
keywords:
  - windows
  - binary
---

# Shortcuts

Windows `Shotcut` files (.lnk extension) are files that point to another file. They
often contain a large amount of metadata related to the target file. Shortcut
files can be used to distribute malware and can also provide evidence of file
interaction. The directory at
`C:\Users\*\AppData\Roaming\Microsoft\Windows\Recent` contains multiple
Shortcuts that point to files recently opened by the user.

Other Parsers:

- [Velociraptor](https://docs.velociraptor.app/artifact_references/pages/windows.forensics.lnk/)

References:

- [Libyal](https://github.com/libyal/liblnk/blob/main/documentation/Windows%20Shortcut%20File%20(LNK)%20format.asciidoc)

# TOML Collection

```toml
[output]
name = "shortcuts_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "shortcuts"
[artifacts.shortcuts]
path = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Startup"
```

# Collection Options

- `path` Target path where artemis should parse `Shortcut` files. This
  configuration is **required**

# Output Structure

A `Shortcut` object structure

```typescript
export interface Shortcut {
  /**Path to `shortcut (lnk)` file */
  source_path: string;
  /**Flags that specify what data structures are in the `lnk` file */
  data_flags: string[];
  /**File attributes of target file */
  attribute_flags: string[];
  /**Standard Information created timestamp of target file */
  created: number;
  /**Standard Information accessed timestamp of target file */
  accessed: number;
  /**Standard Information modified timestamp of target file */
  modified: number;
  /**Size in bytes of target file */
  file_size: number;
  /**Flag associated where target file is located. On volume or network share */
  location_flags: string;
  /**Path to target file */
  path: string;
  /**Serial associated with volume if target file is on drive */
  drive_serial: string;
  /**Drive type associated with volume if target file is on drive */
  drive_type: string;
  /**Name of volume if target file is on drive */
  volume_label: string;
  /**Network type if target file is on network share */
  network_provider: string;
  /**Network share name if target file is on network share */
  network_share_name: string;
  /**Network share device name if target file is on network share */
  network_device_name: string;
  /**Description of shortcut (lnk) file */
  description: string;
  /**Relative path to target file */
  relative_path: string;
  /**Directory of target file */
  working_directory: string;
  /**Command args associated with target file */
  command_line_args: string;
  /**Icon path associated with shortcut (lnk) file */
  icon_location: string;
  /**Hostname of target file */
  hostname: string;
  /**
   * Digital Record Object Identification (DROID) used to track lnk file
   */
  droid_volume_id: string;
  /**
   * Digital Record Object Identification (DROID) used to track lnk file
   */
  droid_file_id: string;
  /**
   * Digital Record Object Identification (DROID) used to track lnk file
   */
  birth_droid_volume_id: string;
  /**
   * Digital Record Object Identification (DROID) used to track lnk file
   */
  birth_droid_file_id: string;
  /**Shellitems associated with shortcut (lnk) file */
  shellitems: ShellItems[];
  /**Array of property stores */
  properties: Record<string, string | number | boolean | null>[];
  /**Environmental variable data in shortcut */
  environment_variable: string;
  /**Console metadata in shortcut */
  console: Console[];
  /**Windows Codepage in shortcut */
  codepage: number;
  /**Special folder ID in shortcut */
  special_folder_id: number;
  /**macOS Darwin ID in shortcut */
  darwin_id: string;
  /**Shim layer entry in shortcut */
  shim_layer: string;
  /**Known folder GUID in shortcut */
  known_folder: string;
}

/**
 * Console metadata embeded in Shortcut file
 */
interface Console {
  /**Colors for Console */
  color_flags: string[];
  /**Additional colors for Console */
  pop_fill_attributes: string[];
  /**Console width buffer size */
  screen_width_buffer_size: number;
  /**Console height buffer size */
  screen_height_buffer_size: number;
  /**Console window width */
  window_width: number;
  /**Console window height */
  window_height: number;
  /**Console X coordinate */
  window_x_coordinate: number;
  /**Console Y coordinate */
  window_y_coordinate: number;
  /**Console font size */
  font_size: number;
  /**Console font family */
  font_family: string;
  /**Conesole font weight */
  font_weight: string;
  /**Console font name */
  face_name: string;
  /**Console cursor size */
  cursor_size: string;
  /**Is full screen set (boolean) */
  full_screen: number;
  /**Insert mode */
  insert_mode: number;
  /**Automatic position set (boolean) */
  automatic_position: number;
  /**Console history buffer size */
  history_buffer_size: number;
  /**Console number of bufffers */
  number_history_buffers: number;
  /**Duplicates allowed in history */
  duplicates_allowed_history: number;
  /**Base64 encoded color table. */
  color_table: string;
}
```
