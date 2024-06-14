import { Descriptor } from "./acls.ts";

/**
 * Windows `Registry` is a collection of binary files that store Windows configuration settings and OS information.
 * There are multiple `Registry` files on a system such as:
 *   - `SYSTEM`
 *   - `SOFTWARE`
 *   - `SAM`
 *   - `SECURITY`
 *   - `NTUSER.DAT -- One per user`
 *   - `UsrClass.dat -- One per user`
 *
 * References:
 *  - https://github.com/libyal/libregf
 *  - https://github.com/msuhanov/regf/blob/master/Windows%20registry%20file%20format%20specification.md
 */
export interface RegistryData {
  /**Path to Registry file */
  registry_path: string;
  /**Registry file name */
  registry_file: string;
  /**Array of Registry entries */
  registry_entries: Registry[];
}

/**
 * Inteface representing the parsed `Registry` structure
 */
export interface Registry {
  /**
   * Full path to `Registry` key and name.
   * Ex: ` ROOT\...\CurrentVersion\Run`
   */
  path: string;
  /**
   * Path to Key
   * Ex: ` ROOT\...\CurrentVersion`
   */
  key: string;
  /**
   * Key name
   * Ex: `Run`
   */
  name: string;
  /**
   * Values associated with key name
   * Ex: `Run => Vmware`. Where `Run` is the `Key` name and `Vmware` is the value name
   */
  values: Value[];
  /**Timestamp of when the path was last modified */
  last_modified: string;
  /**Depth of key name */
  depth: number;
  /**Offset to the Security Key info for the key */
  security_offset: number;
}

/**
 * The value data associated with Registry key
 * References:
 *   https://github.com/libyal/libregf
 *   https://github.com/msuhanov/regf/blob/master/Windows%20registry%20file%20format%20specification.md
 */
export interface Value {
  /**Name of Value */
  value: string;
  /**
   * Data associated with value. All types are strings by default. The real type can be determined by `data_type`.
   * `REG_BINARY` is a base64 encoded string
   */
  data: string;
  /**
   * Value type.
   * Full list of types at: https://learn.microsoft.com/en-us/windows/win32/sysinfo/registry-value-types
   */
  data_type: string;
}

/**
 * Security Key data associated with a Registry Key
 */
export interface SecurityKey {
  /**Number of references to the key */
  reference_count: number;
  /**Permissions and ACLs associated with the key */
  info: Descriptor;
}
