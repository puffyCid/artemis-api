/**
 * Experimental API to extract Defender signatures. Mainly for research/curiosity
 *
 * Defender contains thousands/millions? of signatures so this code is not not super fast
 *
 * References:
 * - https://i.blackhat.com/BH-US-23/Presentations/US-23-Tomer-Defender-Pretender-final.pdf
 * - https://github.com/commial/experiments/tree/master/windows-defender/VDM#signature-format
 *
 * Other Parsers:
 *  - maybe? https://github.com/hongson11698/defender-database-extract
 */

import { decompress_zlib } from "../../compression/decompress.ts";
import { CompressionError } from "../../compression/errors.ts";
import { extractUtf16String } from "../../encoding/strings.ts";
import { getEnvValue } from "../../environment/env.ts";
import { FileError } from "../../filesystem/errors.ts";
import { glob, readFile } from "../../filesystem/files.ts";
import { NomError } from "../../nom/error.ts";
import { nomUnsignedFourBytes } from "../../nom/helpers.ts";
import { Endian, nomUnsignedTwoBytes } from "../../nom/helpers.ts";
import { nomUnsignedOneBytes } from "../../nom/mod.ts";
import { take, takeUntil } from "../../nom/parsers.ts";
import {
  Definition,
  DefinitionRule,
  RuleType,
} from "../../../types/windows/defender/definitions.ts";
import { extractStrings } from "./sigs/hstr.ts";
import { encode } from "../../encoding/base64.ts";
import { ApplicationError } from "../errors.ts";
import { PlatformType } from "../../../mod.ts";

/**
 * Function to extract Windows Definitions. (Will take a long time if you want to extract all)
 * @param platform OS `PlatformType` to parse. Only macOS (Darwin) or Windows supported
 * @param alt_file Optional path to VDM file. Will override the `PlatformType`
 * @param limit How many Signatures to extract. Default is 30. 0 will return all
 * @returns Array of `Definition` objects or `ApplicationError`
 */
export function extractDefenderRules(
  platform: PlatformType,
  alt_file?: string,
  limit = 30,
): Definition[] | ApplicationError {
  let paths = [];
  if (alt_file != undefined) {
    paths = [alt_file];
  } else if (platform === PlatformType.Windows) {
    let drive = getEnvValue("SystemDrive");
    if (drive === "") {
      drive = "C";
    }

    const vdm_glob =
      `${drive}:\\ProgramData\\Microsoft\\Windows Defender\\Definition Updates\\{*\\*.vdm`;
    const glob_paths = glob(vdm_glob);
    if (glob_paths instanceof FileError) {
      return new ApplicationError(
        `DEFENDER`,
        `could not glob path ${vdm_glob}: ${glob_paths}`,
      );
    }

    for (const entry of glob_paths) {
      paths.push(entry.full_path);
    }
  } else if (platform === PlatformType.Darwin) {
    const vdm_glob =
      "/Library/Application Support/Microsoft/Defender/definitions.noindex/*/*.vdm";
    const glob_paths = glob(vdm_glob);
    if (glob_paths instanceof FileError) {
      return new ApplicationError(
        `DEFENDER`,
        `could not glob path ${vdm_glob}: ${glob_paths}`,
      );
    }

    for (const entry of glob_paths) {
      paths.push(entry.full_path);
    }
  }

  let rules: Definition[] = [];
  for (const entry of paths) {
    let rules_data = readVdm(entry);
    if (rules_data instanceof ApplicationError) {
      console.error(rules_data);
      continue;
    }

    let offset = 0;
    let count = 0;
    while (offset < rules_data.byteLength) {
      if (count > limit && limit != 0) {
        break;
      }
      const results = extractRules(rules_data);
      if (results instanceof ApplicationError) {
        console.error(
          `could not extract all rules from path ${entry}: ${results}`,
        );
        break;
      }

      // offset to the next signature start
      offset = results.offset;

      const definition: Definition = {
        id: results.start.id,
        name: results.start.name,
        category: results.start.category,
        action: results.start.action,
        severity: results.start.severity,
        path: entry,
        rules: results.rules,
      };

      rules = rules.concat(definition);
      rules_data = new Uint8Array(rules_data.buffer.slice(offset));
      count++;
    }
  }

  return rules;
}

/**
 * Function to read and decompress Defender rules
 * @param path Path to a VDM file
 * @returns Decompressed VDM rules data
 */
function readVdm(path: string): Uint8Array | ApplicationError {
  const bytes = readFile(path);
  if (bytes instanceof FileError) {
    return new ApplicationError(
      `DEFENDER`,
      `could not read file ${path}: ${bytes}`,
    );
  }

  // search for RMDX signature
  const sig = new Uint8Array([82, 77, 68, 88]);
  const sig_start = takeUntil(bytes, sig);
  if (sig_start instanceof NomError) {
    return new ApplicationError(
      `DEFENDER`,
      `could not find sig for ${path}: ${sig_start}`,
    );
  }

  const min_size = 32;
  if (sig_start.remaining.length < min_size) {
    return new ApplicationError(`DEFENDER`, `defender data too small`);
  }

  const byte_size = 4;
  const size_start = 24;
  const decom_size_start = 28;

  const zlib_data = (sig_start.remaining as Uint8Array).buffer.slice(
    size_start,
    size_start + byte_size + 1,
  );
  const zlib_offset = new DataView(zlib_data).getUint32(0, true);
  const decom_size_data = (sig_start.remaining as Uint8Array).buffer.slice(
    decom_size_start,
    decom_size_start + byte_size + 1,
  );
  const decom_size = new DataView(decom_size_data).getUint32(0, true);

  const compressed_data = (sig_start.remaining as Uint8Array).buffer.slice(
    zlib_offset + 8,
  );
  const wbits = 15;
  const decom_data = decompress_zlib(new Uint8Array(compressed_data), wbits);
  if (decom_data instanceof CompressionError) {
    return new ApplicationError(
      `DEFENDER`,
      `could decompress ${path}: ${decom_data}`,
    );
  }

  if (decom_data.byteLength != decom_size) {
    return new ApplicationError(
      `DEFENDER`,
      `incorrect decompressed size, expected ${decom_size} got: ${decom_data.byteLength}`,
    );
  }

  return decom_data;
}

interface RulesAndNextOffset {
  rules: DefinitionRule[];
  start: ThreatStart;
  offset: number;
}

/**
 * Function to extract Defender signatures
 * @param data Bytes associated with the Defender Signature
 * @returns `RulesAndNextOffset` object which contains rules and offset to next rule
 */
function extractRules(data: Uint8Array): RulesAndNextOffset | ApplicationError {
  const threat_start = getStart(data);
  if (threat_start instanceof ApplicationError) {
    return threat_start;
  }
  let rule_type = RuleType.SIGNATURE_TYPE_THREAT_BEGIN;
  const size_offset = 4;
  let offset = threat_start.size + size_offset;

  const definition_rules: DefinitionRule[] = [];
  while (
    rule_type != RuleType.SIGNATURE_TYPE_UNKNOWN &&
    rule_type != RuleType.SIGNATURE_TYPE_THREAT_END
  ) {
    const sig_buffer = new Uint8Array(data.buffer.slice(offset));
    const meta = getSigMeta(sig_buffer);
    if (meta instanceof ApplicationError) {
      return meta;
    }

    rule_type = meta.sig;
    offset += meta.size + size_offset;

    const definition: DefinitionRule = {
      type: meta.sig,
      signatures: [],
    };

    const rules = getSigValues(meta.bytes, meta.sig);
    if (rules instanceof ApplicationError) {
      if (definition.type != RuleType.SIGNATURE_TYPE_THREAT_END) {
        definition.signatures.push(encode(meta.bytes));
        definition_rules.push(definition);
      }

      continue;
    }

    if (definition.type != RuleType.SIGNATURE_TYPE_THREAT_END) {
      definition.signatures = rules;
      definition_rules.push(definition);
    }
  }

  const rules_offset: RulesAndNextOffset = {
    rules: definition_rules,
    start: threat_start,
    offset,
  };
  return rules_offset;
}

interface ThreatStart {
  id: number;
  counter: number;
  category: number;
  size: number;
  name: string;
  severity: number;
  action: number;
}

/**
 * Function to extract `SIGNATURE_TYPE_THREAT_BEGIN` data
 * @param data Bytes associated with the `SIGNATURE_TYPE_THREAT_BEGIN` signature
 * @returns `ThreatStart` object or `ApplicationError`
 */
function getStart(data: Uint8Array): ThreatStart | ApplicationError {
  const threat_start = RuleType.SIGNATURE_TYPE_THREAT_BEGIN;
  const start_sig = getSigMeta(data);
  if (start_sig instanceof ApplicationError || start_sig.sig != threat_start) {
    return new ApplicationError(
      `DEFENDER`,
      `failed to get start sig: ${start_sig}`,
    );
  }

  const start_bytes = new Uint8Array(data.buffer.slice(4, start_sig.size + 1));
  const id = nomUnsignedFourBytes(start_bytes, Endian.Le);
  if (id instanceof NomError) {
    return new ApplicationError(`DEFENDER`, `failed to get start id: ${id}`);
  }

  const unknown = nomUnsignedTwoBytes(id.remaining, Endian.Le);
  if (unknown instanceof NomError) {
    return new ApplicationError(
      `DEFENDER`,
      `failed to get start unknown: ${unknown}`,
    );
  }

  const counter = nomUnsignedTwoBytes(unknown.remaining, Endian.Le);
  if (counter instanceof NomError) {
    return new ApplicationError(
      `DEFENDER`,
      `failed to get start counter: ${counter}`,
    );
  }

  const category = nomUnsignedTwoBytes(counter.remaining, Endian.Le);
  if (category instanceof NomError) {
    return new ApplicationError(
      `DEFENDER`,
      `failed to get start category: ${category}`,
    );
  }

  const name_size = nomUnsignedTwoBytes(category.remaining, Endian.Le);
  if (name_size instanceof NomError) {
    return new ApplicationError(
      `DEFENDER`,
      `failed to get start name size: ${name_size}`,
    );
  }

  const name = take(name_size.remaining, name_size.value);
  if (name instanceof NomError) {
    return new ApplicationError(`DEFENDER`, `failed to get name: ${name_size}`);
  }

  const unknown2 = nomUnsignedTwoBytes(name.remaining as Uint8Array, Endian.Le);
  if (unknown2 instanceof NomError) {
    return new ApplicationError(
      `DEFENDER`,
      `failed to get start unknown2: ${unknown}`,
    );
  }

  const resources = take(unknown2.remaining, counter.value * 2);
  if (resources instanceof NomError) {
    return new ApplicationError(
      `DEFENDER`,
      `failed to get start resources: ${unknown}`,
    );
  }

  const severity = nomUnsignedOneBytes(
    resources.remaining as Uint8Array,
    Endian.Le,
  );
  if (severity instanceof NomError) {
    return new ApplicationError(
      `DEFENDER`,
      `failed to get start severity: ${unknown}`,
    );
  }

  const action = nomUnsignedOneBytes(
    severity.remaining as Uint8Array,
    Endian.Le,
  );
  if (action instanceof NomError) {
    return new ApplicationError(
      `DEFENDER`,
      `failed to get start action: ${unknown}`,
    );
  }

  const _unknown3 = nomUnsignedFourBytes(
    action.remaining as Uint8Array,
    Endian.Le,
  );

  const start: ThreatStart = {
    id: id.value,
    counter: counter.value,
    category: category.value,
    size: start_sig.size,
    name: extractUtf16String(name.nommed as Uint8Array),
    severity: severity.value,
    action: action.value,
  };

  return start;
}

interface SigMeta {
  sig: RuleType;
  size: number;
  bytes: Uint8Array;
}

/**
 * Function to extract Signature metadata
 * @param data Bytes associated with Defender Signature
 * @returns `SigMeta` object or `ApplicationError`
 */
function getSigMeta(data: Uint8Array): SigMeta | ApplicationError {
  if (data.at(0) === undefined) {
    return new ApplicationError(`DEFENDER`, `bad sig`);
  }

  const size_low = data.buffer.slice(1, 3);
  const size_high = data.buffer.slice(2, 4);

  const size = new DataView(size_low).getUint8(0) |
    (new DataView(size_high).getUint16(0, true) << 8);

  const bytes = new Uint8Array(data.buffer.slice(4, size + 1));

  const sig: SigMeta = {
    sig: signatureType(data[0]),
    size,
    bytes,
  };

  return sig;
}

/**
 * Function to determine the Signature type
 * @param sig Defender Signature value
 * @returns `RuleType` enum
 */
function signatureType(sig: number): RuleType {
  const sigs: Record<number, RuleType> = {
    1: RuleType.SIGNATURE_TYPE_RESERVED,
    2: RuleType.SIGNATURE_TYPE_VOLATILE_THREAT_INFO,
    3: RuleType.SIGNATURE_TYPE_VOLATILE_THREAT_ID,
    17: RuleType.SIGNATURE_TYPE_CKOLDREC,
    32: RuleType.SIGNATURE_TYPE_KVIR32,
    33: RuleType.SIGNATURE_TYPE_POLYVIR32,
    39: RuleType.SIGNATURE_TYPE_NSCRIPT_NORMAL,
    40: RuleType.SIGNATURE_TYPE_NSCRIPT_SP,
    41: RuleType.SIGNATURE_TYPE_NSCRIPT_BRUTE,
    44: RuleType.SIGNATURE_TYPE_NSCRIPT_CURE,
    48: RuleType.SIGNATURE_TYPE_TITANFLT,
    61: RuleType.SIGNATURE_TYPE_PEFILE_CURE,
    62: RuleType.SIGNATURE_TYPE_MAC_CURE,
    64: RuleType.SIGNATURE_TYPE_SIGTREE,
    65: RuleType.SIGNATURE_TYPE_SIGTREE_EXT,
    66: RuleType.SIGNATURE_TYPE_MACRO_PCODE,
    67: RuleType.SIGNATURE_TYPE_MACRO_SOURCE,
    68: RuleType.SIGNATURE_TYPE_BOOT,
    73: RuleType.SIGNATURE_TYPE_CLEANSCRIPT,
    74: RuleType.SIGNATURE_TYPE_TARGET_SCRIPT,
    80: RuleType.SIGNATURE_TYPE_CKSIMPLEREC,
    81: RuleType.SIGNATURE_TYPE_PATTMATCH,
    83: RuleType.SIGNATURE_TYPE_RPFROUTINE,
    85: RuleType.SIGNATURE_TYPE_NID,
    86: RuleType.SIGNATURE_TYPE_GENSFX,
    87: RuleType.SIGNATURE_TYPE_UNPLIB,
    88: RuleType.SIGNATURE_TYPE_DEFAULTS,
    91: RuleType.SIGNATURE_TYPE_DBVAR,
    92: RuleType.SIGNATURE_TYPE_THREAT_BEGIN,
    93: RuleType.SIGNATURE_TYPE_THREAT_END,
    94: RuleType.SIGNATURE_TYPE_FILENAME,
    95: RuleType.SIGNATURE_TYPE_FILEPATH,
    96: RuleType.SIGNATURE_TYPE_FOLDERNAME,
    97: RuleType.SIGNATURE_TYPE_PEHSTR,
    98: RuleType.SIGNATURE_TYPE_LOCALHASH,
    99: RuleType.SIGNATURE_TYPE_REGKEY,
    100: RuleType.SIGNATURE_TYPE_HOSTSENTRY,
    103: RuleType.SIGNATURE_TYPE_STATIC,
    105: RuleType.SIGNATURE_TYPE_LATENT_THREAT,
    106: RuleType.SIGNATURE_TYPE_REMOVAL_POLICY,
    107: RuleType.SIGNATURE_TYPE_WVT_EXCEPTION,
    108: RuleType.SIGNATURE_TYPE_REVOKED_CERTIFICATE,
    112: RuleType.SIGNATURE_TYPE_TRUSTED_PUBLISHER,
    113: RuleType.SIGNATURE_TYPE_ASEP_FILEPATH,
    115: RuleType.SIGNATURE_TYPE_DELTA_BLOB,
    116: RuleType.SIGNATURE_TYPE_DELTA_BLOB_RECINFO,
    117: RuleType.SIGNATURE_TYPE_ASEP_FOLDERNAME,
    119: RuleType.SIGNATURE_TYPE_PATTMATCH_V2,
    120: RuleType.SIGNATURE_TYPE_PEHSTR_EXT,
    121: RuleType.SIGNATURE_TYPE_VDLL_X86,
    122: RuleType.SIGNATURE_TYPE_VERSIONCHECK,
    123: RuleType.SIGNATURE_TYPE_SAMPLE_REQUEST,
    124: RuleType.SIGNATURE_TYPE_VDLL_X64,
    126: RuleType.SIGNATURE_TYPE_SNID,
    127: RuleType.SIGNATURE_TYPE_FOP,
    128: RuleType.SIGNATURE_TYPE_KCRCE,
    131: RuleType.SIGNATURE_TYPE_VFILE,
    132: RuleType.SIGNATURE_TYPE_SIGFLAGS,
    133: RuleType.SIGNATURE_TYPE_PEHSTR_EXT2,
    134: RuleType.SIGNATURE_TYPE_PEMAIN_LOCATOR,
    135: RuleType.SIGNATURE_TYPE_PESTATIC,
    136: RuleType.SIGNATURE_TYPE_UFSP_DISABLE,
    137: RuleType.SIGNATURE_TYPE_FOPEX,
    138: RuleType.SIGNATURE_TYPE_PEPCODE,
    139: RuleType.SIGNATURE_TYPE_IL_PATTERN,
    140: RuleType.SIGNATURE_TYPE_ELFHSTR_EXT,
    141: RuleType.SIGNATURE_TYPE_MACHOHSTR_EXT,
    142: RuleType.SIGNATURE_TYPE_DOSHSTR_EXT,
    143: RuleType.SIGNATURE_TYPE_MACROHSTR_EXT,
    144: RuleType.SIGNATURE_TYPE_TARGET_SCRIPT_PCODE,
    145: RuleType.SIGNATURE_TYPE_VDLL_IA64,
    149: RuleType.SIGNATURE_TYPE_PEBMPAT,
    150: RuleType.SIGNATURE_TYPE_AAGGREGATOR,
    151: RuleType.SIGNATURE_TYPE_SAMPLE_REQUEST_BY_NAME,
    152: RuleType.SIGNATURE_TYPE_REMOVAL_POLICY_BY_NAME,
    153: RuleType.SIGNATURE_TYPE_TUNNEL_X86,
    154: RuleType.SIGNATURE_TYPE_TUNNEL_X64,
    155: RuleType.SIGNATURE_TYPE_TUNNEL_IA64,
    156: RuleType.SIGNATURE_TYPE_VDLL_ARM,
    157: RuleType.SIGNATURE_TYPE_THREAD_X86,
    158: RuleType.SIGNATURE_TYPE_THREAD_X64,
    159: RuleType.SIGNATURE_TYPE_THREAD_IA64,
    160: RuleType.SIGNATURE_TYPE_FRIENDLYFILE_SHA256,
    161: RuleType.SIGNATURE_TYPE_FRIENDLYFILE_SHA512,
    162: RuleType.SIGNATURE_TYPE_SHARED_THREAT,
    163: RuleType.SIGNATURE_TYPE_VDM_METADATA,
    164: RuleType.SIGNATURE_TYPE_VSTORE,
    165: RuleType.SIGNATURE_TYPE_VDLL_SYMINFO,
    166: RuleType.SIGNATURE_TYPE_IL2_PATTERN,
    167: RuleType.SIGNATURE_TYPE_BM_STATIC,
    168: RuleType.SIGNATURE_TYPE_BM_INFO,
    169: RuleType.SIGNATURE_TYPE_NDAT,
    170: RuleType.SIGNATURE_TYPE_FASTPATH_DATA,
    171: RuleType.SIGNATURE_TYPE_FASTPATH_SDN,
    172: RuleType.SIGNATURE_TYPE_DATABASE_CERT,
    173: RuleType.SIGNATURE_TYPE_SOURCE_INFO,
    174: RuleType.SIGNATURE_TYPE_HIDDEN_FILE,
    175: RuleType.SIGNATURE_TYPE_COMMON_CODE,
    176: RuleType.SIGNATURE_TYPE_VREG,
    177: RuleType.SIGNATURE_TYPE_NISBLOB,
    178: RuleType.SIGNATURE_TYPE_VFILEEX,
    179: RuleType.SIGNATURE_TYPE_SIGTREE_BM,
    180: RuleType.SIGNATURE_TYPE_VBFOP,
    181: RuleType.SIGNATURE_TYPE_VDLL_META,
    182: RuleType.SIGNATURE_TYPE_TUNNEL_ARM,
    183: RuleType.SIGNATURE_TYPE_THREAD_ARM,
    184: RuleType.SIGNATURE_TYPE_PCODEVALIDATOR,
    186: RuleType.SIGNATURE_TYPE_MSILFOP,
    187: RuleType.SIGNATURE_TYPE_KPAT,
    188: RuleType.SIGNATURE_TYPE_KPATEX,
    189: RuleType.SIGNATURE_TYPE_LUASTANDALONE,
    190: RuleType.SIGNATURE_TYPE_DEXHSTR_EXT,
    191: RuleType.SIGNATURE_TYPE_JAVAHSTR_EXT,
    192: RuleType.SIGNATURE_TYPE_MAGICCODE,
    193: RuleType.SIGNATURE_TYPE_CLEANSTORE_RULE,
    194: RuleType.SIGNATURE_TYPE_VDLL_CHECKSUM,
    195: RuleType.SIGNATURE_TYPE_THREAT_UPDATE_STATUS,
    196: RuleType.SIGNATURE_TYPE_VDLL_MSIL,
    197: RuleType.SIGNATURE_TYPE_ARHSTR_EXT,
    198: RuleType.SIGNATURE_TYPE_MSILFOPEX,
    199: RuleType.SIGNATURE_TYPE_VBFOPEX,
    200: RuleType.SIGNATURE_TYPE_FOP64,
    201: RuleType.SIGNATURE_TYPE_FOPEX64,
    202: RuleType.SIGNATURE_TYPE_JSINIT,
    203: RuleType.SIGNATURE_TYPE_PESTATICEX,
    204: RuleType.SIGNATURE_TYPE_KCRCEX,
    205: RuleType.SIGNATURE_TYPE_FTRIE_POS,
    206: RuleType.SIGNATURE_TYPE_NID64,
    207: RuleType.SIGNATURE_TYPE_MACRO_PCODE64,
    208: RuleType.SIGNATURE_TYPE_BRUTE,
    209: RuleType.SIGNATURE_TYPE_SWFHSTR_EXT,
    210: RuleType.SIGNATURE_TYPE_REWSIGS,
    211: RuleType.SIGNATURE_TYPE_AUTOITHSTR_EXT,
    212: RuleType.SIGNATURE_TYPE_INNOHSTR_EXT,
    213: RuleType.SIGNATURE_TYPE_ROOTCERTSTORE,
    214: RuleType.SIGNATURE_TYPE_EXPLICITRESOURCE,
    215: RuleType.SIGNATURE_TYPE_CMDHSTR_EXT,
    216: RuleType.SIGNATURE_TYPE_FASTPATH_TDN,
    217: RuleType.SIGNATURE_TYPE_EXPLICITRESOURCEHASH,
    218: RuleType.SIGNATURE_TYPE_FASTPATH_SDN_EX,
    219: RuleType.SIGNATURE_TYPE_BLOOM_FILTER,
    220: RuleType.SIGNATURE_TYPE_RESEARCH_TAG,
    222: RuleType.SIGNATURE_TYPE_ENVELOPE,
    223: RuleType.SIGNATURE_TYPE_REMOVAL_POLICY64,
    224: RuleType.SIGNATURE_TYPE_REMOVAL_POLICY64_BY_NAME,
    225: RuleType.SIGNATURE_TYPE_VDLL_META_X64,
    226: RuleType.SIGNATURE_TYPE_VDLL_META_ARM,
    227: RuleType.SIGNATURE_TYPE_VDLL_META_MSIL,
    228: RuleType.SIGNATURE_TYPE_MDBHSTR_EXT,
    229: RuleType.SIGNATURE_TYPE_SNIDEX,
    230: RuleType.SIGNATURE_TYPE_SNIDEX2,
    231: RuleType.SIGNATURE_TYPE_AAGGREGATOREX,
    232: RuleType.SIGNATURE_TYPE_PUA_APPMAP,
    233: RuleType.SIGNATURE_TYPE_PROPERTY_BAG,
    234: RuleType.SIGNATURE_TYPE_DMGHSTR_EXT,
    235: RuleType.SIGNATURE_TYPE_DATABASE_CATALOG,
  };

  const value = sigs[sig];
  if (value === undefined) {
    return RuleType.SIGNATURE_TYPE_UNKNOWN;
  }
  return value;
}

/**
 * Function to get Signature values
 * @param data Bytes associated with Defender Signature
 * @param rule `RuleType` enum to determine how to extract Signature data
 * @returns Array of strings or `ApplicationError`
 */
function getSigValues(
  data: Uint8Array,
  rule: RuleType,
): string[] | ApplicationError {
  switch (rule) {
    case RuleType.SIGNATURE_TYPE_PEHSTR:
    case RuleType.SIGNATURE_TYPE_PEHSTR_EXT:
    case RuleType.SIGNATURE_TYPE_PEHSTR_EXT2:
    case RuleType.SIGNATURE_TYPE_ELFHSTR_EXT:
    case RuleType.SIGNATURE_TYPE_MACHOHSTR_EXT:
    case RuleType.SIGNATURE_TYPE_DOSHSTR_EXT:
    case RuleType.SIGNATURE_TYPE_MACROHSTR_EXT:
    case RuleType.SIGNATURE_TYPE_DEXHSTR_EXT:
    case RuleType.SIGNATURE_TYPE_JAVAHSTR_EXT:
    case RuleType.SIGNATURE_TYPE_ARHSTR_EXT:
    case RuleType.SIGNATURE_TYPE_SWFHSTR_EXT:
    case RuleType.SIGNATURE_TYPE_AUTOITHSTR_EXT:
    case RuleType.SIGNATURE_TYPE_INNOHSTR_EXT:
    case RuleType.SIGNATURE_TYPE_CMDHSTR_EXT:
    case RuleType.SIGNATURE_TYPE_DMGHSTR_EXT:
    case RuleType.SIGNATURE_TYPE_MDBHSTR_EXT:
      return extractStrings(data);
    case RuleType.SIGNATURE_TYPE_RESERVED:
    case RuleType.SIGNATURE_TYPE_VOLATILE_THREAT_INFO:
    case RuleType.SIGNATURE_TYPE_VOLATILE_THREAT_ID:
    case RuleType.SIGNATURE_TYPE_CKOLDREC:
    case RuleType.SIGNATURE_TYPE_KVIR32:
    case RuleType.SIGNATURE_TYPE_POLYVIR32:
    case RuleType.SIGNATURE_TYPE_NSCRIPT_NORMAL:
    case RuleType.SIGNATURE_TYPE_NSCRIPT_SP:
    case RuleType.SIGNATURE_TYPE_NSCRIPT_BRUTE:
    case RuleType.SIGNATURE_TYPE_NSCRIPT_CURE:
    case RuleType.SIGNATURE_TYPE_TITANFLT:
    case RuleType.SIGNATURE_TYPE_PEFILE_CURE:
    case RuleType.SIGNATURE_TYPE_MAC_CURE:
    case RuleType.SIGNATURE_TYPE_SIGTREE:
    case RuleType.SIGNATURE_TYPE_SIGTREE_EXT:
    case RuleType.SIGNATURE_TYPE_MACRO_PCODE:
    case RuleType.SIGNATURE_TYPE_MACRO_SOURCE:
    case RuleType.SIGNATURE_TYPE_BOOT:
    case RuleType.SIGNATURE_TYPE_CLEANSCRIPT:
    case RuleType.SIGNATURE_TYPE_TARGET_SCRIPT:
    case RuleType.SIGNATURE_TYPE_CKSIMPLEREC:
    case RuleType.SIGNATURE_TYPE_PATTMATCH:
    case RuleType.SIGNATURE_TYPE_RPFROUTINE:
    case RuleType.SIGNATURE_TYPE_NID:
    case RuleType.SIGNATURE_TYPE_GENSFX:
    case RuleType.SIGNATURE_TYPE_UNPLIB:
    case RuleType.SIGNATURE_TYPE_DEFAULTS:
    case RuleType.SIGNATURE_TYPE_DBVAR:
    case RuleType.SIGNATURE_TYPE_THREAT_BEGIN:
    case RuleType.SIGNATURE_TYPE_THREAT_END:
    case RuleType.SIGNATURE_TYPE_FILENAME:
    case RuleType.SIGNATURE_TYPE_FILEPATH:
    case RuleType.SIGNATURE_TYPE_FOLDERNAME:
    case RuleType.SIGNATURE_TYPE_LOCALHASH:
    case RuleType.SIGNATURE_TYPE_REWSIGS:
    case RuleType.SIGNATURE_TYPE_REGKEY:
    case RuleType.SIGNATURE_TYPE_HOSTSENTRY:
    case RuleType.SIGNATURE_TYPE_STATIC:
    case RuleType.SIGNATURE_TYPE_LATENT_THREAT:
    case RuleType.SIGNATURE_TYPE_REMOVAL_POLICY:
    case RuleType.SIGNATURE_TYPE_WVT_EXCEPTION:
    case RuleType.SIGNATURE_TYPE_REVOKED_CERTIFICATE:
    case RuleType.SIGNATURE_TYPE_TRUSTED_PUBLISHER:
    case RuleType.SIGNATURE_TYPE_ASEP_FILEPATH:
    case RuleType.SIGNATURE_TYPE_DELTA_BLOB:
    case RuleType.SIGNATURE_TYPE_DELTA_BLOB_RECINFO:
    case RuleType.SIGNATURE_TYPE_ASEP_FOLDERNAME:
    case RuleType.SIGNATURE_TYPE_PATTMATCH_V2:
    case RuleType.SIGNATURE_TYPE_VDLL_X86:
    case RuleType.SIGNATURE_TYPE_VERSIONCHECK:
    case RuleType.SIGNATURE_TYPE_SAMPLE_REQUEST:
    case RuleType.SIGNATURE_TYPE_VDLL_X64:
    case RuleType.SIGNATURE_TYPE_SNID:
    case RuleType.SIGNATURE_TYPE_FOP:
    case RuleType.SIGNATURE_TYPE_KCRCE:
    case RuleType.SIGNATURE_TYPE_VFILE:
    case RuleType.SIGNATURE_TYPE_SIGFLAGS:
    case RuleType.SIGNATURE_TYPE_PEMAIN_LOCATOR:
    case RuleType.SIGNATURE_TYPE_PESTATIC:
    case RuleType.SIGNATURE_TYPE_UFSP_DISABLE:
    case RuleType.SIGNATURE_TYPE_FOPEX:
    case RuleType.SIGNATURE_TYPE_PEPCODE:
    case RuleType.SIGNATURE_TYPE_IL_PATTERN:
    case RuleType.SIGNATURE_TYPE_TARGET_SCRIPT_PCODE:
    case RuleType.SIGNATURE_TYPE_VDLL_IA64:
    case RuleType.SIGNATURE_TYPE_PEBMPAT:
    case RuleType.SIGNATURE_TYPE_AAGGREGATOR:
    case RuleType.SIGNATURE_TYPE_SAMPLE_REQUEST_BY_NAME:
    case RuleType.SIGNATURE_TYPE_REMOVAL_POLICY_BY_NAME:
    case RuleType.SIGNATURE_TYPE_TUNNEL_X86:
    case RuleType.SIGNATURE_TYPE_TUNNEL_X64:
    case RuleType.SIGNATURE_TYPE_TUNNEL_IA64:
    case RuleType.SIGNATURE_TYPE_VDLL_ARM:
    case RuleType.SIGNATURE_TYPE_THREAD_X86:
    case RuleType.SIGNATURE_TYPE_THREAD_X64:
    case RuleType.SIGNATURE_TYPE_THREAD_IA64:
    case RuleType.SIGNATURE_TYPE_FRIENDLYFILE_SHA256:
    case RuleType.SIGNATURE_TYPE_FRIENDLYFILE_SHA512:
    case RuleType.SIGNATURE_TYPE_SHARED_THREAT:
    case RuleType.SIGNATURE_TYPE_VDM_METADATA:
    case RuleType.SIGNATURE_TYPE_VSTORE:
    case RuleType.SIGNATURE_TYPE_VDLL_SYMINFO:
    case RuleType.SIGNATURE_TYPE_IL2_PATTERN:
    case RuleType.SIGNATURE_TYPE_BM_STATIC:
    case RuleType.SIGNATURE_TYPE_BM_INFO:
    case RuleType.SIGNATURE_TYPE_NDAT:
    case RuleType.SIGNATURE_TYPE_FASTPATH_DATA:
    case RuleType.SIGNATURE_TYPE_FASTPATH_SDN:
    case RuleType.SIGNATURE_TYPE_SOURCE_INFO:
    case RuleType.SIGNATURE_TYPE_HIDDEN_FILE:
    case RuleType.SIGNATURE_TYPE_COMMON_CODE:
    case RuleType.SIGNATURE_TYPE_VREG:
    case RuleType.SIGNATURE_TYPE_NISBLOB:
    case RuleType.SIGNATURE_TYPE_VFILEEX:
    case RuleType.SIGNATURE_TYPE_SIGTREE_BM:
    case RuleType.SIGNATURE_TYPE_VBFOP:
    case RuleType.SIGNATURE_TYPE_VDLL_META:
    case RuleType.SIGNATURE_TYPE_TUNNEL_ARM:
    case RuleType.SIGNATURE_TYPE_THREAD_ARM:
    case RuleType.SIGNATURE_TYPE_PCODEVALIDATOR:
    case RuleType.SIGNATURE_TYPE_MSILFOP:
    case RuleType.SIGNATURE_TYPE_KPAT:
    case RuleType.SIGNATURE_TYPE_KPATEX:
    case RuleType.SIGNATURE_TYPE_LUASTANDALONE:
    case RuleType.SIGNATURE_TYPE_MAGICCODE:
    case RuleType.SIGNATURE_TYPE_CLEANSTORE_RULE:
    case RuleType.SIGNATURE_TYPE_VDLL_CHECKSUM:
    case RuleType.SIGNATURE_TYPE_THREAT_UPDATE_STATUS:
    case RuleType.SIGNATURE_TYPE_VDLL_MSIL:
    case RuleType.SIGNATURE_TYPE_MSILFOPEX:
    case RuleType.SIGNATURE_TYPE_VBFOPEX:
    case RuleType.SIGNATURE_TYPE_FOP64:
    case RuleType.SIGNATURE_TYPE_FOPEX64:
    case RuleType.SIGNATURE_TYPE_JSINIT:
    case RuleType.SIGNATURE_TYPE_PESTATICEX:
    case RuleType.SIGNATURE_TYPE_KCRCEX:
    case RuleType.SIGNATURE_TYPE_FTRIE_POS:
    case RuleType.SIGNATURE_TYPE_NID64:
    case RuleType.SIGNATURE_TYPE_MACRO_PCODE64:
    case RuleType.SIGNATURE_TYPE_BRUTE:
    case RuleType.SIGNATURE_TYPE_ROOTCERTSTORE:
    case RuleType.SIGNATURE_TYPE_EXPLICITRESOURCE:
    case RuleType.SIGNATURE_TYPE_FASTPATH_TDN:
    case RuleType.SIGNATURE_TYPE_EXPLICITRESOURCEHASH:
    case RuleType.SIGNATURE_TYPE_FASTPATH_SDN_EX:
    case RuleType.SIGNATURE_TYPE_BLOOM_FILTER:
    case RuleType.SIGNATURE_TYPE_RESEARCH_TAG:
    case RuleType.SIGNATURE_TYPE_ENVELOPE:
    case RuleType.SIGNATURE_TYPE_REMOVAL_POLICY64:
    case RuleType.SIGNATURE_TYPE_REMOVAL_POLICY64_BY_NAME:
    case RuleType.SIGNATURE_TYPE_VDLL_META_X64:
    case RuleType.SIGNATURE_TYPE_VDLL_META_ARM:
    case RuleType.SIGNATURE_TYPE_VDLL_META_MSIL:
    case RuleType.SIGNATURE_TYPE_SNIDEX:
    case RuleType.SIGNATURE_TYPE_SNIDEX2:
    case RuleType.SIGNATURE_TYPE_AAGGREGATOREX:
    case RuleType.SIGNATURE_TYPE_PUA_APPMAP:
    case RuleType.SIGNATURE_TYPE_PROPERTY_BAG:
    case RuleType.SIGNATURE_TYPE_DATABASE_CATALOG:
    case RuleType.SIGNATURE_TYPE_UNKNOWN:
  }

  return new ApplicationError(`DEFENDER`, `unknown RuleType ${rule}`);
}
