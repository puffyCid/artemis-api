---
description: Services installed on Windows
keywords:
  - windows
  - registry
  - persistence
---

# Services

Windows `Services` are a common form of persistence and privilege escalation on
Windows systems. Service data is stored in the SYSTEM Registry file.<br />
`Services` run with SYSTEM level privileges.

Other Parsers:

- Any tool that can read the Registry
- [Velociraptor](https://docs.velociraptor.app/artifact_references/pages/windows.system.services/)

References:

- [Services](https://forensafe.com/blogs/windowsservices.html)
- [Velociraptor](https://github.com/Velocidex/velociraptor/blob/master/artifacts/definitions/Windows/System/Services.yaml)
- [Libyal](https://winreg-kb.readthedocs.io/en/latest/sources/system-keys/Services-and-drivers.html)

# TOML Collection

```toml
system = "windows"

[output]
name = "services_collection"
directory = "./tmp"
format = "jsonl"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "services"
[artifacts.services]
# alt_file = "C:\\Artifacts\\SYSTEM"
```

# Collection Options

- `alt_file` Full path to alternative SYSTEM Registry file. This configuration
  is **optional**. By default artemis will parse the SYSTEM Registry at the
  default location.

# Output Structure

An array of `Services` entries

```typescript
export interface Services {
  /**Current State of the Service */
  state: string;
  /**Name of Service */
  name: string;
  /**Display name of Service */
  display_name: string;
  /**Service description */
  description: string;
  /**Start mode of Service */
  start_mode: string;
  /**Path to executable for Service */
  path: string;
  /**Service types. Ex: KernelDriver */
  service_type: string[];
  /**Account associated with Service */
  account: string;
  /**Registry modified timestamp. May be used to determine when the Service was created */
  modified: string;
  /**DLL associated with Service */
  service_dll: string;
  /**Service command upon failure */
  failure_command: string;
  /**Reset period associated with Service */
  reset_period: number;
  /**Service actions upon failure */
  failure_actions: FailureActions[];
  /**Privileges associated with Service */
  required_privileges: string[];
  /**Error associated with Service */
  error_control: string;
  /**Registry path associated with Service */
  reg_path: string;
}

/**
 * Failure actions executed when Service fails
 */
interface FailureActions {
  /**Action executed upon failure */
  action: string;
  /**Delay in seconds on failure */
  delay: number;
}
```
