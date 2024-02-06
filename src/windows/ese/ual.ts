import { getEnvValue } from "../../environment/env.ts";
import { FileError } from "../../filesystem/errors.ts";
import { glob } from "../../filesystem/files.ts";
import { WindowsError } from "../errors.ts";
import { parseTable } from "../ese.ts";

export function unifiedAccessLog(alt_glob?: string) {
  const default_path = getEnvValue("SystemRoot");

  if (default_path === "") {
    return new WindowsError("UAL", `failed determine SystemRoot`);
  }
  let path_glob = `${default_path}\\Windows\\System32\\LogFiles\\Sum\\*.mdb`;
  if (alt_glob != undefined) {
    path_glob = alt_glob;
  }

  const paths = glob(path_glob);
  if (paths instanceof FileError) {
    return new WindowsError("UAL", `failed to glob paths ${paths}`);
  }

  const current_tables = ["CLIENTS", "DNS", "ROLE_ACCESS"];
  const id_tables = ["ROLE_IDS"];

  for(const path of paths) {
    if (path.filename === "SystemIdentity.mdb") {
        const rows = parseTable(path.full_path, id_tables);
        console.log(rows);
        continue;
    }

    const rows = parseTable(path.full_path, current_tables);
    console.log(rows);
  }

}
