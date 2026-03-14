---
sidebar_position: 5
description: Acquiring Files
---


# File Acquisitions

Artemis supports acquiring files from a system for later processing. Acquiring a file is just like collecting forensic artifacts.  


## Format
An example file acquisition collection is below:

```toml
[output]
name = "triage_collection"
directory = "./tmp"
format = "json"
compress = false
timeline = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "triage"
[[artifacts.triage]]
name = "Default journal location"
path = "/var/log/journal/"
file_mask = "*.journal"
recursive = true
recreate_directories = true
```

- `recursive` Should artemis recursively walk the path provided
- `file_mask` A glob or regex of files artemis should acquire
- `recreate_directories` Should artemis recreate the directory structure when acquiring the file


:::info

The file acquisition structure was inspired by [KapeFiles](https://github.com/EricZimmerman/KapeFiles).  
You can convert KAPE collections to the artemis format by [downloading](https://github.com/puffyCid/artemis/tree/main/tools/Kape) a Python script to run the conversion

:::

## Output

If you run the collection above on Linux system you will get same types of files you get when collecting forensic artifacts.

```
b8141817-69b5-43cf-acec-cc9c66621a23.log  files.zip  report_88da2beb-a9f7-4179-a0bb-3a6512e14a7b.json  status_fedora.log
```

File acquisitions are compressed into the zip file **files.zip**. Since we enabled `recreate_directories` the directory structure should be retained

```
Archive:  files.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
 16777216  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000002f76272-0006269487fbba0a.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000002f77162-0006272393872423.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000002f77d90-0006279b777261b2.journal
      272  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-000000000302a710-0006279d1dd74605.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000003057d90-00062946b7392ff3.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-000000000305b0eb-00062bb1ef80d881.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-000000000305bbb5-00062bb1f7633c49.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-000000000305f8d3-00062ec17f3f0b08.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000003062e53-000630f66b5e7793.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000003065683-0006316df454faff.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000003065f6e-0006316df8e74793.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030671b2-00063492218b398e.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-000000000306755f-000634921fae12ac.journal
 33554432  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000003068d02-000635c2c3cd8f29.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-000000000307d265-0006394b11e2bed3.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-000000000308258d-00063aa2708d9087.journal
 16777216  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000003085216-00063bf9c9bbffcd.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000003089682-00063e290c3eec77.journal
 16777216  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000003091180-00064086d36f2126.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030983d5-000641efe20d6355.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000003099cc6-0006430f35ceeaf9.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-000000000309d947-00064422958a9fab.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-000000000309e43d-000644229e43ebed.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-000000000309fbf3-0006464738cbb0e3.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030a0de2-000646f3e240bfbc.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030ac2a1-000648b049ef907e.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030af2e9-00064bc0a0d1bb52.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/system@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030b0194-00064bfdf9bf9bec.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000002f75e8a-000625f96c6adac9.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000002f77a71-00062723a05d1cd3.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-000000000305867b-00062946ba9e7850.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-000000000305b9c5-00062bb1f26f86a6.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-000000000305bbbc-00062bb1f7714572.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000003065f96-0006316dfa2b9e70.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030675a7-00063492215b7ad2.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000003068d05-000635c2c3d051ed.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000003082f1d-00063aa27542d7a9.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000003087d94-00063d10471eb475.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000003091b37-00064086e0df69d1.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030942da-0006414ec5b1464c.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-0000000003098dc6-000641f00b3f017f.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-000000000309e2ff-000644229ec21cfa.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-000000000309e442-000644229e476b69.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030a05a7-000646473ec38072.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030a0774-0006464745d0343d.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030acc48-000648b04e25d187.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030afc2a-00064bc0a8212038.journal
  8388608  01-01-1980 00:00   var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030b0b2b-00064bfe02811908.journal
    22309  01-01-1980 00:00   acquisition_report.json
```

The **files.zip** also contains a JSON acquisition report which contains some metadata about the collected files:

```json
  {
    "created": "2026-02-26T21:23:25.000Z",
    "modified": "2026-02-26T21:23:25.000Z",
    "accessed": "2026-03-13T22:49:57.000Z",
    "changed": "2026-02-26T21:23:25.000Z",
    "full_path": "/var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030afc2a-00064bc0a8212038.journal",
    "filename": "user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030afc2a-00064bc0a8212038.journal",
    "md5": "03f3f3bfa91df6306d05ad2a2f313280",
    "size": 8388608
  },
  {
    "created": "2026-03-01T22:31:22.000Z",
    "modified": "2026-03-01T22:31:22.000Z",
    "accessed": "2026-03-13T22:49:57.000Z",
    "changed": "2026-03-01T22:31:22.000Z",
    "full_path": "/var/log/journal/19b88c32e63d43d583efce254b5f2b0d/user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030b0b2b-00064bfe02811908.journal",
    "filename": "user-1000@c547b1d5e6e54ca3abfc70fda4dd54c7-00000000030b0b2b-00064bfe02811908.journal",
    "md5": "fea921a7c022c226ba6554bbd3987b09",
    "size": 8388608
  }
```