---
description: Windows Email Client
keywords:
  - windows
---

# Outlook

Outlook is a popular email client on Windows systems. Outlook on Windows stores
messages in OST or PST files. PST was used by older Outlook versions (prior to
Outlook 2013). OST is used by Outlook 2013+.

Artemis supports parsing and extracting emails and attachments from OST files.

:::note

Outlook was re-written in 2022 (New Outlook for Windows). Which is an online
only web app. This parser does not support that version

:::

Other parsers:

- [libpff](https://github.com/libyal/libpff)

References:

- [libyal](https://github.com/libyal/libpff/blob/main/documentation/Personal%20Folder%20File%20(PFF)%20format.asciidoc)
- [Outlook Messages](https://www.forensafe.com/blogs/outlook.html)

# TOML Collection

```toml
system = "windows"

[output]
name = "outlook_collection"
directory = "./tmp"
format = "jsonl"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "outlook"
[artifacts.outlook]
include_attahcments = true
```

# Collection Options

- `alt_path` An alternative path to the OST file. This configuration is
  **optional**. By default will parse all OST files under
  `%systemdrive%\Users\*\AppData\Local\Microsoft\Outlook\*.ost`
- `include_attachments` - Boolean value whether to extract attachments in email
  messages. This configuration is **required**.
- `start_date` - Only extract emails after this date. This configuration is
  **optional**. By default artemis will extract all emails
- `end_date` - Only extract emails before this date. This configuration is
  **optional**. By default artemis will extract all emails
- `yara_rule_message` - Run provided Yara-X rule against the message. Only
  matches will be returned. This configuration is **optional**. By default
  artemis will not scan with Yara
- `yara_rule_attachment` - Run provided Yara-X rule against attachments. Only
  matches will be returned. This configuration is **optional**. By default
  artemis will not scan with Yara

# Output Structure

**TODO**
