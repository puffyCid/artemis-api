import {
  BashHistory,
  PythonHistory,
  ZshHistory,
} from "../../types/unix/shellhistory.d.ts";

/**
 * Parse and get the contents of the `.bash_history` file for all users on an endpoint
 * @returns Array of `BashHistory` for each user on the endpoint
 */
export function getBashHistory(): BashHistory[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_bash_history();

  const history: BashHistory[] = JSON.parse(data);
  return history;
}

/**
 * Parse and get the contents of the `.zsh_history` file for all users on an endpoint
 * @returns Array of `ZshHistory` for each user on the endpoint
 */
export function getZshHistory(): ZshHistory[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_zsh_history();

  const history: ZshHistory[] = JSON.parse(data);
  return history;
}

/**
 * Parse and get the contents of the `.bash_history` file for all users on an endpoint
 * @returns Array of `BashHistory` for each user on the endpoint
 */
export function getPythonHistory(): PythonHistory[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_python_history();

  const history: PythonHistory[] = JSON.parse(data);
  return history;
}
