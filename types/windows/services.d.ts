/**
 * Windows `Services` are a common form of persistence and privilege escalation on Windows systems. Service data is stored in the SYSTEM Registry file.
 * `Services` run with SYSTEM level privileges.
 *
 * References:
 * `https://forensafe.com/blogs/windowsservices.html`
 * `https://github.com/Velocidex/velociraptor/blob/master/artifacts/definitions/Windows/System/Services.yaml`
 */
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
  /**Registry modified timestamp in UNIXEPOCH seconds. May be used to determine when the Service was created */
  modified: number;
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
