import { ElfInfo } from "../../../types/linux/elf.ts";
import { MachoInfo } from "../../../types/macos/macho.ts";
import { ProcessInfo } from "../../../types/system/processes.ts";
import { TimesketchTimeline } from "../../../types/timesketch/timeline.ts";
import { PeInfo } from "../../../types/windows/pe.ts";
import { unixEpochToISO } from "../../time/conversion.ts";

/**
 * Function to timeline process info
 * @param data Array of `ProcessInfo`
 * @returns Array `TimesketchTimeline` of processes
 */
export function timelineProcesses(
  data: ProcessInfo[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.start_time),
      timestamp_desc: "ProcessStart",
      message: `${item.full_path} ${item.arguments}`,
      artifact: "Processes",
      data_type: "system:processes:process",
    };

    entry["full_path"] = item.full_path;
    entry["name"] = item.name;
    entry["path"] = item.path;
    entry["pid"] = item.pid;
    entry["ppid"] = item.ppid;
    entry["environment"] = item.environment;
    entry["status"] = item.status;
    entry["arguments"] = item.arguments;
    entry["memory_usage"] = item.memory_usage;
    entry["virtual_memory_usage"] = item.virtual_memory_usage;
    entry["start_time"] = item.start_time;
    entry["uid"] = item.uid;
    entry["gid"] = item.gid;
    entry["md5"] = item.md5;
    entry["sha1"] = item.sha1;
    entry["sha256"] = item.sha256;

    entry["start_time"] = unixEpochToISO(item.start_time);

    if (isPe(item.binary_info)) {
      entry = windowsProcess(entry, item.binary_info);
    } else if (isMacho(item.binary_info)) {
      entry = macosProcess(entry, item.binary_info);
    }
    entries.push(entry);
  }

  return entries;
}

/**
 * Function to determine if processes came from Windows
 * @param binary PeInfo[] or MachoInfo[] or ElfInfo[]
 * @returns true if PeInfo[]
 */
function isPe(binary: PeInfo[] | MachoInfo[] | ElfInfo[]): binary is PeInfo[] {
  const value = binary.at(0);
  if (value === undefined) {
    return false;
  }
  return (value as PeInfo).pdb != undefined;
}

/**
 * Function to extract more data from PE binaries
 * @param entry `TimesketchTimeline` value
 * @param macho Array of `PeInfo`
 * @returns `TimesketchTimeline`
 */
function windowsProcess(
  entry: TimesketchTimeline,
  pe: PeInfo[],
): TimesketchTimeline {
  for (const value of pe) {
    entry["imports"] = value.imports;
    entry["sections"] = value.sections;
    entry["cert"] = value.cert;
    entry["pdb"] = value.pdb;
    entry["product_version"] = value.product_version;
    entry["product_name"] = value.product_name;
    entry["company_name"] = value.company_name;
    entry["file_description"] = value.file_description;
    entry["internal_name"] = value.internal_name;
    entry["original_filename"] = value.original_filename;
    entry["file_version"] = value.file_version;
    entry["legal_copyright"] = value.legal_copyright;
    entry["manifest"] = value.manifest;
    entry["icons"] = value.icons;
  }
  return entry;
}

/**
 * Function to determine if processes came from macOS
 * @param binary PeInfo[] or MachoInfo[] or ElfInfo[]
 * @returns true if MachoInfo[]
 */
function isMacho(
  binary: PeInfo[] | MachoInfo[] | ElfInfo[],
): binary is MachoInfo[] {
  const value = binary.at(0);
  if (value === undefined) {
    return false;
  }
  return (value as MachoInfo).cpu_subtype != undefined;
}

/**
 * Function to extract more data from MACHO binaries
 * @param entry `TimesketchTimeline` value
 * @param macho Array of `MachoInfo`
 * @returns `TimesketchTimeline`
 */
function macosProcess(
  entry: TimesketchTimeline,
  macho: MachoInfo[],
): TimesketchTimeline {
  entry["is_fat"] = macho.length > 1 ? true : false;

  // Only get first MACHO binary if FAT
  for (const value of macho) {
    const segs = [];
    const sections = [];
    for (const seg of value.segments) {
      segs.push(seg.name);
      for (const section of seg.sections) {
        sections.push(section.section_name);
      }
    }

    const dylibs = [];
    for (const dylib of value.dylib_command) {
      dylibs.push(dylib.name);
    }

    const titles = [];
    // Timesketch will silently complain and exclude data if we include all entitlement data :(
    // So just get the entitlement name
    for (const key in value.entitlements) {
      titles.push(key);
    }

    entry["segments"] = segs;
    entry["sections"] = sections;
    entry["cpu_type"] = value.cpu_type;
    entry["cpu_subtype"] = value.cpu_subtype;
    entry["dylib_commmand"] = dylibs;
    entry["id"] = value.id;
    entry["team_id"] = value.team_id;
    entry["entitlements"] = titles;
    entry["certs"] = value.certs;
    entry["minos"] = value.minos;
    entry["sdk"] = value.sdk;

    break;
  }
  return entry;
}
