import { CommandResult } from "../../types/system/command.ts";

/**
 * Execute a command on the system and return the data
 * @param command Command to run. If the command can be found via ENV variables then full path not needed
 * @param args Optional args to provided to command
 * @returns `CommandResult` data or Error
 */
export function executeCommand(
  command: string,
  args: string[] = [],
): CommandResult | Error {
  //@ts-ignore: Custom Artemis function
  const data = system.execute(command, args);
  if (data instanceof Error) {
    return data;
  }

  const result: CommandResult = JSON.parse(data);
  return result;
}
