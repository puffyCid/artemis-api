import { ElfInfo } from "../../../types/linux/elf";
import { MachoInfo } from "../../../types/macos/macho";
import { ProcessInfo } from "../../../types/system/processes";
import { TimesketchTimeline } from "../../../types/timesketch/timeline";
import { PeInfo } from "../../../types/windows/pe";

/**
 * Function to timeline process info
 * @param data Array of `ProcessInfo`
 * @returns Array `TimesketchTimeline` of processes
 */
export function timelineProcesses(
  data: ProcessInfo[],
): TimesketchTimeline[] {
  const entries: TimesketchTimeline[] = [];

  for (const item of data) {
    let entry: TimesketchTimeline = {
      datetime: item.start_time,
      timestamp_desc: "ProcessStart",
      message: `${item.full_path} ${item.arguments}`,
      artifact: "Processes",
      data_type: "system:processes:process",
    };

    entry[ "full_path" ] = item.full_path;
    entry[ "name" ] = item.name;
    entry[ "path" ] = item.path;
    entry[ "pid" ] = item.pid;
    entry[ "ppid" ] = item.ppid;
    entry[ "environment" ] = item.environment;
    entry[ "status" ] = item.status;
    entry[ "arguments" ] = item.arguments;
    entry[ "memory_usage" ] = item.memory_usage;
    entry[ "virtual_memory_usage" ] = item.virtual_memory_usage;
    entry[ "start_time" ] = item.start_time;
    entry[ "uid" ] = item.uid;
    entry[ "gid" ] = item.gid;
    entry[ "md5" ] = item.md5;
    entry[ "sha1" ] = item.sha1;
    entry[ "sha256" ] = item.sha256;

    entry[ "start_time" ] = item.start_time;

    if (isPe(item.binary_info)) {
      entry = windowsProcess(entry, item.binary_info);
    } else if (isMacho(item.binary_info)) {
      entry = macosProcess(entry, item.binary_info);
    } else if (isElf(item.binary_info)) {
      entry = linuxProcess(entry, item.binary_info);
    }
    entries.push(entry);
  }

  return entries;
}

/**
 * Function to determine if processes came from Windows
 * @param binary `PeInfo` or `MachoInfo[]` or `ElfInfo`
 * @returns true if `PeInfo`
 */
function isPe(binary: PeInfo | MachoInfo[] | ElfInfo | null): binary is PeInfo {
  if (Array.isArray(binary)) {
    return false;
  }

  return (binary as PeInfo).pdb !== undefined;
}

/**
 * Function to extract more data from PE binaries
 * @param entry `TimesketchTimeline` value
 * @param value `PeInfo` object
 * @returns `TimesketchTimeline`
 */
function windowsProcess(
  entry: TimesketchTimeline,
  value: PeInfo,
): TimesketchTimeline {
  entry[ "imports" ] = value.imports;
  entry[ "sections" ] = value.sections;
  entry[ "cert" ] = value.cert;
  entry[ "pdb" ] = value.pdb;
  entry[ "product_version" ] = value.product_version;
  entry[ "product_name" ] = value.product_name;
  entry[ "company_name" ] = value.company_name;
  entry[ "file_description" ] = value.file_description;
  entry[ "internal_name" ] = value.internal_name;
  entry[ "original_filename" ] = value.original_filename;
  entry[ "file_version" ] = value.file_version;
  entry[ "legal_copyright" ] = value.legal_copyright;
  entry[ "manifest" ] = value.manifest;
  entry[ "icons" ] = value.icons;

  return entry;
}

/**
 * Function to determine if processes came from macOS
 * @param binary `PeInfo` or `MachoInfo[]` or `ElfInfo`
 * @returns true if MachoInfo[]
 */
function isMacho(
  binary: PeInfo | MachoInfo[] | ElfInfo | null
): binary is MachoInfo[] {
  if (!Array.isArray(binary)) {
    return false;
  }
  const value = binary.at(0);
  if (value === undefined) {
    return false;
  }
  return (value as MachoInfo).cpu_subtype !== undefined;
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
  entry[ "is_fat" ] = macho.length > 1 ? true : false;

  // Only get first MACHO binary if FAT
  for (const value of macho) {
    const segs: string[] = [];
    const sections: string[] = [];
    for (const seg of value.segments) {
      segs.push(seg.name);
      for (const section of seg.sections) {
        sections.push(section.section_name);
      }
    }

    const dylibs: string[] = [];
    for (const dylib of value.dylib_command) {
      dylibs.push(dylib.name);
    }

    const titles: string[] = [];
    // Timesketch will silently complain and exclude data if we include all entitlement data :(
    // So just get the entitlement name
    for (const key in value.entitlements) {
      titles.push(key);
    }

    entry[ "segments" ] = segs;
    entry[ "sections" ] = sections;
    entry[ "cpu_type" ] = value.cpu_type;
    entry[ "cpu_subtype" ] = value.cpu_subtype;
    entry[ "dylib_commmand" ] = dylibs;
    entry[ "id" ] = value.id;
    entry[ "team_id" ] = value.team_id;
    entry[ "entitlements" ] = titles;
    entry[ "certs" ] = value.certs;
    entry[ "minos" ] = value.minos;
    entry[ "sdk" ] = value.sdk;

    break;
  }
  return entry;
}

/**
 * Function to determine if processes came from Linux
 * @param binary `PeInfo` or `MachoInfo[]` or `ElfInfo`
 * @returns true if `ElfInfo`
 */
function isElf(binary: PeInfo | MachoInfo[] | ElfInfo | null): binary is ElfInfo {
  if (Array.isArray(binary)) {
    return false;
  }

  return (binary as ElfInfo).machine_type !== undefined;
}

/**
 * Function to extract more data from ELF binaries
 * @param entry `TimesketchTimeline` value
 * @param value `ElfInfo` object
 * @returns `TimesketchTimeline`
 */
function linuxProcess(entry: TimesketchTimeline,
  value: ElfInfo): TimesketchTimeline {
  entry[ "symbols" ] = value.symbols;
  entry[ "sections" ] = value.sections;
  entry[ "machine_type" ] = value.machine_type;

  return entry;
}