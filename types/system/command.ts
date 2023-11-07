/**
 * Interface representing the command execution
 */
export interface CommandResult {
  /**If command execution was successful */
  success: boolean;
  /**Output of command */
  stdout: string;
  /**Errors associated with command */
  stderr: string;
}
