---
sidebar_position: 3
description: Live Response Collectino
---

# Live Response

Windows TOML collection focusing on collecting data to help investigate a
Windows incident.

```toml
[output]
name = "windows_collection"
directory = "./tmp"
format = "jsonl"
compress = true
timeline = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "prefetch"
[artifacts.prefetch]

[[artifacts]]
artifact_name = "processes"
[artifacts.processes]
md5 = true
sha1 = false
sha256 = false
metadata = true

[[artifacts]]
artifact_name = "systeminfo"

[[artifacts]]
artifact_name = "chromium-history"

[[artifacts]]
artifact_name = "chromium-downloads"

[[artifacts]]
artifact_name = "firefox-history"

[[artifacts]]
artifact_name = "firefox-downloads"

[[artifacts]]
artifact_name = "amcache"
[artifacts.amcache]

[[artifacts]]
artifact_name = "bits"
[artifacts.bits]
carve = true

[[artifacts]]
artifact_name = "eventlogs"
[artifacts.eventlogs]

[[artifacts]]
artifact_name = "rawfiles"
[artifacts.rawfiles]
drive_letter = 'C'
start_path = "C:\\"
depth = 40
recover_indx = true
md5 = true
sha1 = false
sha256 = false
metadata = true

[[artifacts]]
artifact_name = "registry" # Parses the whole Registry file
[artifacts.registry]
user_hives = true # All NTUSER.DAT and UsrClass.dat
system_hives = true # SYSTEM, SOFTWARE, SAM, SECURITY

[[artifacts]]
artifact_name = "shellbags"
[artifacts.shellbags]
resolve_guids = true

[[artifacts]]
artifact_name = "shimcache"
[artifacts.shimcache]

[[artifacts]]
artifact_name = "srum"
[artifacts.srum]

[[artifacts]]
artifact_name = "userassist"
[artifacts.userassist]

[[artifacts]]
artifact_name = "users"
[artifacts.users]

[[artifacts]]
artifact_name = "usnjrnl"
[artifacts.usnjrnl]

[[artifacts]]
artifact_name = "script"
[artifacts.script]
name = "recent_files"
# Parses all recent accessed files (shortcuts/lnk files) for all users
script = "Ly8gaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3B1ZmZ5Y2lkL2FydGVtaXMtYXBpL21hc3Rlci9zcmMvd2luZG93cy9zaG9ydGN1dHMudHMKZnVuY3Rpb24gZ2V0TG5rRmlsZShwYXRoKSB7CiAgY29uc3QgZGF0YSA9IERlbm8uY29yZS5vcHMuZ2V0X2xua19maWxlKHBhdGgpOwogIGNvbnN0IHJlc3VsdHMgPSBKU09OLnBhcnNlKGRhdGEpOwogIHJldHVybiByZXN1bHRzOwp9CgovLyBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcHVmZnljaWQvYXJ0ZW1pcy1hcGkvbWFzdGVyL3NyYy9lbnZpcm9ubWVudC9lbnYudHMKZnVuY3Rpb24gZ2V0RW52VmFsdWUoa2V5KSB7CiAgY29uc3QgZGF0YSA9IGVudi5lbnZpcm9ubWVudFZhbHVlKGtleSk7CiAgcmV0dXJuIGRhdGE7Cn0KCi8vIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9wdWZmeWNpZC9hcnRlbWlzLWFwaS9tYXN0ZXIvc3JjL2ZpbGVzeXN0ZW0vZGlyZWN0b3J5LnRzCmFzeW5jIGZ1bmN0aW9uIHJlYWREaXIocGF0aCkgewogIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGF3YWl0IGZzLnJlYWREaXIocGF0aCkpOwogIHJldHVybiBkYXRhOwp9CgovLyBtYWluLnRzCmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7CiAgY29uc3QgZHJpdmUgPSBnZXRFbnZWYWx1ZSgiU3lzdGVtRHJpdmUiKTsKICBpZiAoZHJpdmUgPT09ICIiKSB7CiAgICByZXR1cm4gW107CiAgfQogIGNvbnN0IHVzZXJzID0gYCR7ZHJpdmV9XFxVc2Vyc2A7CiAgY29uc3QgcmVjZW50X2ZpbGVzID0gW107CiAgZm9yIChjb25zdCBlbnRyeSBvZiBhd2FpdCByZWFkRGlyKHVzZXJzKSkgewogICAgdHJ5IHsKICAgICAgY29uc3QgcGF0aCA9IGAke3VzZXJzfVxcJHtlbnRyeS5maWxlbmFtZX1cXEFwcERhdGFcXFJvYW1pbmdcXE1pY3Jvc29mdFxcV2luZG93c1xcUmVjZW50YDsKICAgICAgZm9yIChjb25zdCBlbnRyeTIgb2YgYXdhaXQgcmVhZERpcihwYXRoKSkgewogICAgICAgIGlmICghZW50cnkyLmZpbGVuYW1lLmVuZHNXaXRoKCJsbmsiKSkgewogICAgICAgICAgY29udGludWU7CiAgICAgICAgfQogICAgICAgIGNvbnN0IGxua19maWxlID0gYCR7cGF0aH1cXCR7ZW50cnkyLmZpbGVuYW1lfWA7CiAgICAgICAgY29uc3QgbG5rID0gZ2V0TG5rRmlsZShsbmtfZmlsZSk7CiAgICAgICAgcmVjZW50X2ZpbGVzLnB1c2gobG5rKTsKICAgICAgfQogICAgfSBjYXRjaCAoX2Vycm9yKSB7CiAgICAgIGNvbnRpbnVlOwogICAgfQogIH0KICByZXR1cm4gcmVjZW50X2ZpbGVzOwp9Cm1haW4oKTsK"
```

macOS colleciton focusing on collecting data to help investigate a macOS
incident.

```toml
[output]
name = "macos_collection"
directory = "./tmp"
format = "jsonl"
compress = true
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "processes"
[artifacts.processes]
md5 = true
sha1 = false
sha256 = false
metadata = true

[[artifacts]]
artifact_name = "loginitems"

[[artifacts]]
artifact_name = "emond"

[[artifacts]]
artifact_name = "fseventsd"

[[artifacts]]
artifact_name = "launchd"

[[artifacts]]
artifact_name = "files"
[artifacts.files]
start_path = "/"
depth = 90
metadata = true
md5 = true
sha1 = false
sha256 = false
regex_filter = ""

[[artifacts]]
artifact_name = "users"

[[artifacts]]
artifact_name = "groups"

[[artifacts]]
artifact_name = "systeminfo"

[[artifacts]]
artifact_name = "safari-history"

[[artifacts]]
artifact_name = "safari-downloads"

[[artifacts]]
artifact_name = "unifiedlogs"
[artifacts.unifiedlogs]
sources = ["Persist", "Special", "Signpost", "HighVolume"] # Option to specify the log directories (sources)
```
