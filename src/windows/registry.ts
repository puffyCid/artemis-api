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
  /**Timestamp of when the path was last modified in UNIXEPOCH seconds */
  last_modified: number;
  /**Depth of key name */
  depth: number;
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
 * Function to parse a `Registry` file
 * @param path Full path to a `Registry` file
 * @returns Array of `Registry` entries
 */
export function get_registry(path: string): Registry[] {
  // Array of JSON objects
  const data = Deno.core.ops.get_registry(path);
  const reg_array: Registry[] = JSON.parse(data);

  return reg_array;
}
