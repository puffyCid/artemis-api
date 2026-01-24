import { Registry } from "../../../types/windows/registry";
import {
  Mru,
  MruType,
  MruValues,
} from "../../../types/windows/registry/recently_used";
import { ShellItems } from "../../../types/windows/shellitems";
import { WindowsError } from "../errors";
import { getRegistry } from "../registry";
import { lastVisitMru, openSaveMru } from "./mru/common";
import { recentDocs } from "./mru/recent_docs";

/**
 * Parse common Most Recently Used (MRU) Registry keys
 * @param ntuser_path Path to NTUSER.DAT file
 * @returns Array of common `Mru` entries or `WindowsError`
 */
export function parseMru(ntuser_path: string): Mru[] | WindowsError {
  const reg_data = getRegistry(ntuser_path);
  if (reg_data instanceof WindowsError) {
    return new WindowsError(
      "MRU",
      `Could not parse Registry ${ntuser_path}: ${reg_data}`,
    );
  }

  const common = openSaveMru(reg_data);
  if (common instanceof WindowsError) {
    return new WindowsError(
      "MRU",
      `Could not get OpenSave MRU entries: ${common}`,
    );
  }

  const mrus: Mru[] = [];

  for (const entry of common) {
    const open_save_mru: Mru = {
      ntuser_path,
      kind: MruType.OPENSAVE,
      filename: entry.filename,
      path: entry.path,
      created: entry.created,
      modified: entry.modified,
      accessed: entry.accessed,
      items: entry.items,
      message: `MRU value: ${entry.path}`,
      datetime: entry.created,
      timestamp_desc: "MRU Entry Created",
      artifact: "MRU Open Save",
      data_type: "windows:registry:mru:entry"
    };
    mrus.push(open_save_mru);
  }

  const last_visit = lastVisitMru(reg_data);
  if (last_visit instanceof WindowsError) {
    return new WindowsError(
      "MRU",
      `Could not get LastVisited MRU entries: ${last_visit}`,
    );
  }

  for (const entry of last_visit) {
    const last_visit_mru: Mru = {
      ntuser_path,
      kind: MruType.OPENSAVE,
      filename: entry.filename,
      path: entry.path,
      created: entry.created,
      modified: entry.modified,
      accessed: entry.accessed,
      items: entry.items,
      message: `MRU value: ${entry.path}`,
      datetime: entry.created,
      timestamp_desc: "MRU Entry Created",
      artifact: "MRU Last Visit",
      data_type: "windows:registry:mru:entry"
    };
    mrus.push(last_visit_mru);
  }

  const recent_docs = recentDocs(reg_data);
  if (recent_docs instanceof WindowsError) {
    return new WindowsError(
      "MRU",
      `Could not get RecentDocs MRU entries: ${recent_docs}`,
    );
  }

  for (const entry of recent_docs) {
    const recent_docs_mru: Mru = {
      ntuser_path,
      kind: MruType.OPENSAVE,
      filename: entry.filename,
      path: entry.path,
      created: entry.created,
      modified: entry.modified,
      accessed: entry.accessed,
      items: entry.items,
      message: `MRU value: ${entry.path}`,
      datetime: entry.created,
      timestamp_desc: "MRU Entry Created",
      artifact: "MRU Recent Docs",
      data_type: "windows:registry:mru:entry"
    };
    mrus.push(recent_docs_mru);
  }

  return mrus;
}

/**
 * Assemble `ShellItems` into a MRU formatted entry
 * @param items Array of `Shellitems`
 * @returns Generic `MruValues`
 */
export function assembleMru(items: ShellItems[]): MruValues {
  const paths: string[] = [];

  if (items.length === 0) {
    return {
      filename: "",
      path: "",
      modified: "1970-01-01T00:00:00.000Z",
      created: "1970-01-01T00:00:00.000Z",
      accessed: "1970-01-01T00:00:00.000Z",
      items: [],
    };
  }

  for (const item of items) {
    paths.push(item.value.replaceAll("\\\\", ""));
  }
  // Get last entry
  const item = items[items.length - 1];
  if (item === undefined) {
    return {
      filename: "",
      path: "",
      modified: "1970-01-01T00:00:00.000Z",
      created: "1970-01-01T00:00:00.000Z",
      accessed: "1970-01-01T00:00:00.000Z",
      items: [],
    };
  }
  const entry: MruValues = {
    filename: item.value,
    path: paths.join("\\"),
    modified: item.modified,
    created: item.created,
    accessed: item.accessed,
    items,
  };

  return entry;
}

/**
 * Function to test Windows MRU parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Windows MRU parsing
 */
export function testParseMru(): void {
  const test = "../../tests/test_data/windows/registry/NTUSER.DAT";
  const results = parseMru(test);
  if (results instanceof WindowsError) {
    throw results;
  }

  if (results.length != 0) {
    throw `Got ${results.length} entries, expected 0.......parseMru ❌`;
  }

  console.info(`  Function parseMru ✅`);

  const open_save: Registry[] = [{ "path": "ROOT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\OpenSavePidlMRU", "key": "ROOT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32", "name": "OpenSavePidlMRU", "values": [], "last_modified": "2025-08-30T22:59:19.000Z", "depth": 7, "security_offset": 69216, "registry_path": "C:\\Users\\azur3\\NTUSER.dat", "registry_file": "NTUSER.dat" }, { "path": "ROOT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\OpenSavePidlMRU\\*", "key": "ROOT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\OpenSavePidlMRU", "name": "*", "values": [{ "value": "0", "data": "OgAfSUcaA1lyP6dEicVVlf5rMO4mAAEAJgDvvhAAAACoIgXqOfHbAVOF/R9I8dsBIGUiJEjx2wEUAIYAdAAeAENGU0YYADEAAAAAAOpaGhIQAFByb2plY3RzAAAAAHQaWV6W39NIjWcXM7zuKLrFzfrfn2dWQYlHxcdrwLZ/QgAJAAQA777qWhQS6lrFGC4AAADivwAAAAADAAAAAAAAAAAAAAAAAAAA8aNxAFAAcgBvAGoAZQBjAHQAcwAAAEQAVgAxAAAAAADqWvMUMABhcnRlbWlzAEAACQAEAO++6loaEupaxRguAAAA478AAAAAAwAAAAAAuAAAAAAAAAAAAILw7ABhAHIAdABlAG0AaQBzAAAAFgAAAA==", "data_type": "REG_BINARY" }, { "value": "MRUListEx", "data": "CQAAAAQAAAAOAAAADQAAAAwAAAALAAAACgAAAAAAAAAIAAAABwAAAAYAAAAFAAAAAwAAAAIAAAABAAAA/////w==", "data_type": "REG_BINARY" }, { "value": "1", "data": "OgAfSDrMv7Qs20xCsCl/6ZqHxkEmAAEAJgDvvhEAAADMXgjqOfHbAeFhw+xO8dsBWw5x8k7x2wEUAGAAMgAAMFwY6lpwHCAAV2luZG93cy5kYgAARgAJAAQA777qWlUf6lpWHy4AAAAUBgcAAAAVAAAAAAAAAAAAAAAAAAAA9oCZAFcAaQBuAGQAbwB3AHMALgBkAGIAAAAaAAAA", "data_type": "REG_BINARY" }, { "value": "2", "data": "OgAfSUcaA1lyP6dEicVVlf5rMO4mAAEAJgDvvhAAAACoIgXqOfHbAVOF/R9I8dsBIGUiJEjx2wEUAIYAdAAeAENGU0YYADEAAAAAAOxaFKwQAFByb2plY3RzAAAAAHQaWV6W39NIjWcXM7zuKLrFzfrfn2dWQYlHxcdrwLZ/QgAJAAQA777qWhQS7FoUrC4AAADivwAAAAADAAAAAAAAAAAAAAAAAAAAErkXAVAAcgBvAGoAZQBjAHQAcwAAAEQAbAAxAAAAAADsWhSsEABNQUNPUy1+MQAAVAAJAAQA777sWhSs7FoUrC4AAADVlwAAAAAGAAAAAAAAAAAAAAAAAAAASeiLAG0AYQBjAG8AcwAtAHUAbgBpAGYAaQBlAGQAbABvAGcAcwAAABgAAAA=", "data_type": "REG_BINARY" }], "last_modified": "2025-07-15T03:39:32.000Z", "depth": 8, "security_offset": 69216, "registry_path": "C:\\Users\\azur3\\NTUSER.dat", "registry_file": "NTUSER.dat" }, { "path": "ROOT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\OpenSavePidlMRU\\ts", "key": "ROOT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\OpenSavePidlMRU", "name": "ts", "values": [{ "value": "0", "data": "OgAfAAU5jggjAwJLmCZdmUKOEV8mAAEAJgDvvjEAAADTNgjqOfHbAY1eTb0OCNwBH5rlEP0Z3AEUAFYAMgAAAAAAAAAAAIAAbWFpbi50cwBAAAkABADvvgAAAAAAAAAALgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbQBhAGkAbgAuAHQAcwAAABYAAAA=", "data_type": "REG_BINARY" }, { "value": "MRUListEx", "data": "AAAAAP////8=", "data_type": "REG_BINARY" }], "last_modified": "2025-08-30T22:59:19.000Z", "depth": 8, "security_offset": 69216, "registry_path": "C:\\Users\\azur3\\NTUSER.dat", "registry_file": "NTUSER.dat" }];
  const open_mru = openSaveMru(open_save);
  if (open_mru instanceof WindowsError) {
    throw open_mru;
  }

  if (open_mru.length != 4 || open_mru[0] === undefined) {
    throw `Got ${open_mru.length} entries, expected 4.......openSaveMru ❌`;
  }

  if (open_mru[0].filename != "artemis") {
    throw `Got ${open_mru[0].filename}, expected 'artemis'.......openSaveMru ❌`;
  }

  console.info(`  Function openSaveMru ✅`);

  const list_visit: Registry[] = [{ "path": "ROOT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\LastVisitedPidlMRU", "key": "ROOT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32", "name": "LastVisitedPidlMRU", "values": [{ "value": "MRUListEx", "data": "AgAAAAAAAAAEAAAAAwAAAAEAAAD/////", "data_type": "REG_BINARY" }, { "value": "1", "data": "aQBtAGgAZQB4AC0AZwB1AGkALgBlAHgAZQAAABQAH1DgT9Ag6jppEKLYCAArMDCdGQAvQzpcAAAAAAAAAAAAAAAAAAAAAAAAAHgAMQAAAAAA6loKDhEAVXNlcnMAZAAJAAQA776BWEFF71p5Gi4AAADaEQAAAAABAAAAAAAAAAAAOgAAAAAAzMkTAFUAcwBlAHIAcwAAAEAAcwBoAGUAbABsADMAMgAuAGQAbABsACwALQAyADEAOAAxADMAAAAUAFAAMQAAAAAA61qBABAAYXp1cjMAPAAJAAQA777qWokL71p5Gi4AAACnCwIAAAACAAAAAAAAAAAAAAAAAAAA3UCjAGEAegB1AHIAMwAAABQAWgAxAAAAAADsWhSsEABQcm9qZWN0cwAAQgAJAAQA777qWhQS71p5Gi4AAADivwAAAAADAAAAAAAAAAAAAAAAAAAAErkXAVAAcgBvAGoAZQBjAHQAcwAAABgAVgAxAAAAAADqWvMUMABhcnRlbWlzAEAACQAEAO++6loaEu9aeRouAAAA478AAAAAAwAAAAAAuAAAAAAAAAAAAILw7ABhAHIAdABlAG0AaQBzAAAAFgBcADEAAAAAAO9aNhkQAEZPUkVOU34xAABEAAkABADvvupaIhLvWnkaLgAAAII7BQAAAAEAAAAAAAAAAAAAAAAAAAC64qEAZgBvAHIAZQBuAHMAaQBjAHMAAAAYAFAAMQAAAAAA6lojEhAAdGVzdHMAPAAJAAQA777qWiIS71p5Gi4AAABlPgUAAAABAAAAAAAAAAAAAAAAAAAAO83cAHQAZQBzAHQAcwAAABQAXAAxAAAAAADqWiISEABURVNUX0R+MQAARAAJAAQA777qWiIS71p5Gi4AAACKPgUAAAABAAAAAAAAAAAAAAAAAAAAiic1AHQAZQBzAHQAXwBkAGEAdABhAAAAGABWADEAAAAAAOpaIxIQAHdpbmRvd3MAQAAJAAQA777qWiIS71p5Gi4AAAA4PwUAAAABAAAAAAAAAAAAAAAAAAAATjjdAHcAaQBuAGQAbwB3AHMAAAAWAFoAMQAAAAAA6lojEhAAcmVnaXN0cnkAAEIACQAEAO++6lojEu9adBouAAAAZkIFAAAAAQAAAAAAAAAAAAAAAAAAAOPeAgFyAGUAZwBpAHMAdAByAHkAAAAYAFAAMQAAAAAA6lojEhAAd2luMTAAPAAJAAQA777qWiMS71p0Gi4AAABnQgUAAAABAAAAAAAAAAAAAAAAAAAA9SzsAHcAaQBuADEAMAAAABQAAAA=", "data_type": "REG_BINARY" }, { "value": "3", "data": "UABpAGMAawBlAHIASABvAHMAdAAuAGUAeABlAAAAFAAfUOBP0CDqOmkQotgIACswMJ0ZAC9DOlwAAAAAAAAAAAAAAAAAAAAAAAAAeAAxAAAAAADqWgoOEQBVc2VycwBkAAkABADvvoFYQUXwWoA2LgAAANoRAAAAAAEAAAAAAAAAAAA6AAAAAADMyRMAVQBzAGUAcgBzAAAAQABzAGgAZQBsAGwAMwAyAC4AZABsAGwALAAtADIAMQA4ADEAMwAAABQAUAAxAAAAAADwWiY2EABhenVyMwA8AAkABADvvupaiQvwWoI2LgAAAKcLAgAAAAIAAAAAAAAAAAAAAAAAAACtlOkAYQB6AHUAcgAzAAAAFABaADEAAAAAAOxaFKwQAFByb2plY3RzAABCAAkABADvvupaFBLwWoM2LgAAAOK/AAAAAAMAAAAAAAAAAAAAAAAAAAASuRcBUAByAG8AagBlAGMAdABzAAAAGABWADEAAAAAAPBagS4wAGFydGVtaXMAQAAJAAQA777qWhoS8FqFNi4AAADjvwAAAAADAAAAAAC4AAAAAAAAAAAAu79hAGEAcgB0AGUAbQBpAHMAAAAWAFQAMQAAAAAA8FqVNRAgdGFyZ2V0AAA+AAkABADvvvBagS7wWoc2LgAAAGQMAAAAAAwAAAAAAAAAAAAAAAAAAAAuTigAdABhAHIAZwBlAHQAAAAWAAAA", "data_type": "REG_BINARY" }, { "value": "4", "data": "TQBzAGkAeABQAGEAYwBrAGEAZwBlAFQAbwBvAGwALgBlAHgAZQAAABQAH1DgT9Ag6jppEKLYCAArMDCdGQAvQzpcAAAAAAAAAAAAAAAAAAAAAAAAAHgAMQAAAAAA6loKDhEAVXNlcnMAZAAJAAQA776BWEFF81qmti4AAADaEQAAAAABAAAAAAAAAAAAOgAAAAAAzMkTAFUAcwBlAHIAcwAAAEAAcwBoAGUAbABsADMAMgAuAGQAbABsACwALQAyADEAOAAxADMAAAAUAFAAMQAAAAAA81rDshAAYXp1cjMAPAAJAAQA777qWokL81rRui4AAACnCwIAAAACAAAAAAAAAAAAAAAAAAAAR2ogAGEAegB1AHIAMwAAABQAWgAxAAAAAADzWsmuEABQcm9qZWN0cwAAQgAJAAQA777qWhQS81prui4AAADivwAAAAADAAAAAAAAAAAAAAAAAAAAVCnLAFAAcgBvAGoAZQBjAHQAcwAAABgAVgAxAAAAAADzWnKuMABhcnRlbWlzAEAACQAEAO++6loaEvNacq4uAAAA478AAAAAAwAAAAAAuAAAAAAAAAAAADGFvwBhAHIAdABlAG0AaQBzAAAAFgBUADEAAAAAAPBalTUQIHRhcmdldAAAPgAJAAQA777wWoEu8FpNOC4AAABkDAAAAAAMAAAAAAAAAAAAAAAAAAAALk4oAHQAYQByAGcAZQB0AAAAFgBWADEAAAAAAPBaxjUwIHJlbGVhc2UAQAAJAAQA777wWoEu8FpNOC4AAAAskAAAAAD1AAAAAAC4AAAAAAAAAAAAIZ3AAHIAZQBsAGUAYQBzAGUAAAAWAAAA", "data_type": "REG_BINARY" }, { "value": "0", "data": "VgBTAEMAbwBkAGkAdQBtAC4AZQB4AGUAAAA6AB8ABTmOCCMDAkuYJl2ZQo4RXyYAAQAmAO++MQAAANM2COo58dsBjV5NvQ4I3AEfmuUQ/RncARQAAAA=", "data_type": "REG_BINARY" }, { "value": "2", "data": "UgBlAGcAaQBzAHQAcgB5AEUAeABwAGwAbwByAGUAcgAuAGUAeABlAAAAFAAfUOBP0CDqOmkQotgIACswMJ0ZAC9DOlwAAAAAAAAAAAAAAAAAAAAAAAAAeAAxAAAAAADqWgoOEQBVc2VycwBkAAkABADvvoFYQUU0WySmLgAAANoRAAAAAAEAAAAAAAAAAAA6AAAAAADMyRMAVQBzAGUAcgBzAAAAQABzAGgAZQBsAGwAMwAyAC4AZABsAGwALAAtADIAMQA4ADEAMwAAABQAUAAxAAAAAAA0W519EABhenVyMwA8AAkABADvvupaiQs0WySmLgAAAKcLAgAAAAIAAAAAAAAAAAAAAAAAAADtvQMBYQB6AHUAcgAzAAAAFABaADEAAAAAAB5b7bMQAFByb2plY3RzAABCAAkABADvvupaFBI0W8SkLgAAAOK/AAAAAAMAAAAAAAAAAAAAAAAAAAAfnpsAUAByAG8AagBlAGMAdABzAAAAGABWADEAAAAAADRbFXkwAGFydGVtaXMAQAAJAAQA777qWhoSNFvJpC4AAADjvwAAAAADAAAAAACsAAAAAAAAAAAA0M9zAGEAcgB0AGUAbQBpAHMAAAAWAFwAMQAAAAAANFtnpBAARk9SRU5TfjEAAEQACQAEAO++6loiEjRb1qQuAAAAgjsFAAAAAQAAAAAAAAAAAAAAAAAAAFK37QBmAG8AcgBlAG4AcwBpAGMAcwAAABgAUAAxAAAAAADzWm6uEAB0ZXN0cwA8AAkABADvvupaIhI0W9akLgAAAGU+BQAAAAEAAAAAAAAAAAAAAAAAAAAkHnUAdABlAHMAdABzAAAAFABcADEAAAAAAB5b07MQAFRFU1RfRH4xAABEAAkABADvvupaIhI0W9akLgAAAIo+BQAAAAEAAAAAAAAAAAAAAAAAAACIlQgAdABlAHMAdABfAGQAYQB0AGEAAAAYAFYAMQAAAAAA6lojEhAAd2luZG93cwBAAAkABADvvupaIhI0WzagLgAAADg/BQAAAAEAAAAAAAAAAAAAAAAAAABOON0AdwBpAG4AZABvAHcAcwAAABYAWgAxAAAAAADqWiMSEAByZWdpc3RyeQAAQgAJAAQA777qWiMSNFvWpC4AAABmQgUAAAABAAAAAAAAAAAAAAAAAAAA494CAXIAZQBnAGkAcwB0AHIAeQAAABgAUAAxAAAAAADwWmYuEAB3aW4xMAA8AAkABADvvupaIxI0W9akLgAAAGdCBQAAAAEAAAAAAAAAAAAAAAAAAAB3QK0AdwBpAG4AMQAwAAAAFAAAAA==", "data_type": "REG_BINARY" }], "last_modified": "2025-09-20T21:00:12.000Z", "depth": 7, "security_offset": 69216, "registry_path": "C:\\Users\\azur3\\NTUSER.dat", "registry_file": "NTUSER.dat" }];
  const visit_mru = lastVisitMru(list_visit);
  if (visit_mru instanceof WindowsError) {
    throw visit_mru;
  }

  if (visit_mru.length != 5 || visit_mru[2] === undefined) {
    throw `Got ${visit_mru.length} entries, expected 5.......lastVisitMru ❌`;
  }

  if (visit_mru[2].filename != "MsixPackageTool.exe") {
    throw `Got ${visit_mru[2].filename}, expected 'MsixPackageTool.exe'.......lastVisitMru ❌`;
  }

  console.info(`  Function lastVisitMru ✅`);

  const recent_mru: Registry[] = [{ "path": "ROOT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RecentDocs", "key": "ROOT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer", "name": "RecentDocs", "values": [], "last_modified": "2025-07-19T21:56:37.000Z", "depth": 6, "security_offset": 69216, "registry_path": "C:\\Users\\azur3\\NTUSER.dat", "registry_file": "NTUSER.dat" }];
  const recent_values = recentDocs(recent_mru);
  if (recent_values instanceof WindowsError) {
    throw recent_values;
  }

  if (recent_values.length != 0) {
    throw `Got ${recent_values.length} entries, expected 0.......recentDocs ❌`;
  }

  console.info(`  Function recentDocs ✅`);

  const item: ShellItems[] = [{ "value": "59031a47-3f72-44a7-89c5-5595fe6b30ee", "shell_type": "RootFolder", "created": "1970-01-01T00:00:00.000Z", "modified": "1970-01-01T00:00:00.000Z", "accessed": "1970-01-01T00:00:00.000Z", "mft_entry": 0, "mft_sequence": 0, "stores": {} }, { "value": "Projects", "shell_type": "Delegate", "created": "2025-07-10T02:16:40.000Z", "modified": "2025-07-10T02:16:52.000Z", "accessed": "2025-07-10T03:06:10.000Z", "mft_entry": 49122, "mft_sequence": 3, "stores": {} }, { "value": "artemis", "shell_type": "Directory", "created": "2025-07-10T02:16:52.000Z", "modified": "2025-07-10T02:39:38.000Z", "accessed": "2025-07-10T03:06:10.000Z", "mft_entry": 49123, "mft_sequence": 3, "stores": {} }];
  const items = assembleMru(item);
  if (items.created != "2025-07-10T02:16:52.000Z") {
    throw `Got ${items.created}, expected 2025-07-10T02:16:52.000Z.......assembleMru ❌`;

  }

  console.info(`  Function assembleMru ✅`);
}