---
sidebar_position: 2
description: Custom Filelisting
---

# File Listings

Windows TOML collection looking for all files created in the last 14 days

```toml
[output]
name = "recent_files"
directory = "./tmp"
format = "jsonl"
compress = false
timeline = false
endpoint_id = "abdc"
collection_id = 1
output = "local"
filter_name = "recently_created_files"
# This script will take the search artifact below and filter it to only return files that were created in the past 14 days
filter_script = "Ly8gbWFpbi50cwpmdW5jdGlvbiBtYWluKCkgewogIGNvbnN0IGFyZ3MgPSBTVEFUSUNfQVJHUzsKICBpZiAoYXJncy5sZW5ndGggPT09IDApIHsKICAgIHJldHVybiBbXTsKICB9CiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoYXJnc1swXSk7CiAgY29uc3QgdGltZV9ub3cgPSBuZXcgRGF0ZSgpOwogIGNvbnN0IG1pbGxpc2Vjb25kcyA9IHRpbWVfbm93LmdldFRpbWUoKTsKICBjb25zdCBzZWNvbmRzID0gbWlsbGlzZWNvbmRzIC8gMWUzOwogIGNvbnN0IGZvdXJ0ZWVuX2RheXMgPSAxMjA5NjAwOwogIGNvbnN0IGVhcmxpZXN0X3N0YXJ0ID0gc2Vjb25kcyAtIGZvdXJ0ZWVuX2RheXM7CiAgY29uc3QgZmlsdGVyX2RhdGEgPSBbXTsKICBmb3IgKGNvbnN0IGVudHJ5IG9mIGRhdGEpIHsKICAgIGlmIChlbnRyeS5jcmVhdGVkIDwgZWFybGllc3Rfc3RhcnQpIHsKICAgICAgY29udGludWU7CiAgICB9CiAgICBmaWx0ZXJfZGF0YS5wdXNoKGVudHJ5KTsKICB9CiAgcmV0dXJuIGZpbHRlcl9kYXRhOwp9Cm1haW4oKTsK"

[[artifacts]]
artifact_name = "files" # Name of artifact
filter = true
[artifacts.files]
start_path = "C:\\" # Start of file listing
depth = 100 # How many sub directories to descend
```

macOS TOML collection looking for all files created in the last 14 days

```toml
[output]
name = "recent_files"
directory = "./tmp"
format = "jsonl"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"
filter_name = "recently_created_files"
# This script will take the search artifact below and filter it to only return files that were created in the past 14 days
filter_script = "Ly8gbWFpbi50cwpmdW5jdGlvbiBtYWluKCkgewogIGNvbnN0IGFyZ3MgPSBTVEFUSUNfQVJHUzsKICBpZiAoYXJncy5sZW5ndGggPT09IDApIHsKICAgIHJldHVybiBbXTsKICB9CiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoYXJnc1swXSk7CiAgY29uc3QgdGltZV9ub3cgPSBuZXcgRGF0ZSgpOwogIGNvbnN0IG1pbGxpc2Vjb25kcyA9IHRpbWVfbm93LmdldFRpbWUoKTsKICBjb25zdCBzZWNvbmRzID0gbWlsbGlzZWNvbmRzIC8gMWUzOwogIGNvbnN0IGZvdXJ0ZWVuX2RheXMgPSAxMjA5NjAwOwogIGNvbnN0IGVhcmxpZXN0X3N0YXJ0ID0gc2Vjb25kcyAtIGZvdXJ0ZWVuX2RheXM7CiAgY29uc3QgZmlsdGVyX2RhdGEgPSBbXTsKICBmb3IgKGNvbnN0IGVudHJ5IG9mIGRhdGEpIHsKICAgIGlmIChlbnRyeS5jcmVhdGVkIDwgZWFybGllc3Rfc3RhcnQpIHsKICAgICAgY29udGludWU7CiAgICB9CiAgICBmaWx0ZXJfZGF0YS5wdXNoKGVudHJ5KTsKICB9CiAgcmV0dXJuIGZpbHRlcl9kYXRhOwp9Cm1haW4oKTsK"

[[artifacts]]
artifact_name = "files" # Name of artifact
filter = true
[artifacts.files]
start_path = "/" # Start of file listing
depth = 100 # How many sub directories to descend
```
