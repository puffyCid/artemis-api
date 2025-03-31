import {
  BashHistory,
  PythonHistory,
  ZshHistory,
} from "../../types/unix/shellhistory";
import { UnixError } from "./errors";

/**
 * Parse and get the contents of the `.bash_history` file for all users on an endpoint
 * @returns Array of `BashHistory` for each user on the endpoint or `UnixError`
 */
export function getBashHistory(): BashHistory[] | UnixError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_bash_history();
    return data;
  } catch (err) {
    return new UnixError(
      "BASHHISTORY",
      `failed to parse shell history: ${err}`,
    );
  }
}

/**
 * Parse and get the contents of the `.zsh_history` file for all users on an endpoint
 * @returns Array of `ZshHistory` for each user on the endpoint or `UnixError`
 */
export function getZshHistory(): ZshHistory[] | UnixError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_zsh_history();
    return data;
  } catch (err) {
    return new UnixError("ZSHHISTORY", `failed to parse shell history: ${err}`);
  }
}

/**
 * Parse and get the contents of the `.python_history` file for all users on an endpoint
 * @returns Array of `PythonHistory` for each user on the endpoint or `UnixError`
 */
export function getPythonHistory(): PythonHistory[] | UnixError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_python_history();

    const history: PythonHistory[] = JSON.parse(data);
    return history;
  } catch (err) {
    return new UnixError(
      "PYTHONHISTORY",
      `failed to parse shell history: ${err}`,
    );
  }
}
