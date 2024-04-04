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
import { WindowsError } from "../errors.ts";
import {
  DefinitionRule,
  RuleType,
} from "../../../types/windows/defender/definitions.ts";
import { extractStrings } from "./sigs/hstr.ts";
import { encode } from "../../encoding/base64.ts";

/**
 * Very complex! :)
 *
 * TODO:
 * 1. use a record/map at signature_type instead of switch?
 *
 * See https://i.blackhat.com/BH-US-23/Presentations/US-23-Tomer-Defender-Pretender-final.pdf
 *
 * Issues:
 * There are alot of signature types (https://github.com/commial/experiments/tree/master/windows-defender/VDM#signature-format)
 *  - Not feasible to check all of them?
 *  - Some seem to be similar (ex: *HSTR*)
 */

/**
 * Function to extract Windows Definitions
 * @param alt_file Optional path to VDM file
 * @returns Array of `Definition` objects or `WindowsError`
 */
export function extractDefenderRules(alt_file?: string): void | WindowsError {
  let paths = [];
  if (alt_file != undefined) {
    paths = [alt_file];
  } else {
    let drive = getEnvValue("SystemDrive");
    if (drive === "") {
      drive = "C";
    }

    const vdm_glob =
      `${drive}:\\ProgramData\\Microsoft\\Windows Defender\\Definition Updates\\{*\\*.vmd`;
    const glob_paths = glob(vdm_glob);
    if (glob_paths instanceof FileError) {
      return new WindowsError(
        `DEFENDER`,
        `could not glob path ${vdm_glob}: ${glob_paths}`,
      );
    }

    for (const entry of glob_paths) {
      paths.push(entry.full_path);
    }
  }

  for (const entry of paths) {
    let rules_data = readVdm(entry);
    if (rules_data instanceof WindowsError) {
      console.error(rules_data);
      continue;
    }

    let offset = 0;
    while (offset < rules_data.byteLength) {
      const results = extractRules(rules_data);
      if (results instanceof WindowsError) {
        console.error(
          `could not extract all rules from path ${entry}: ${results}`,
        );
        break;
      }
      // offset to the next signature start
      offset = results.offset;
      rules_data = new Uint8Array(rules_data.buffer.slice(offset));
    }

    break;
  }
}

/**
 * Function to read and decompress Defender rules
 * @param path Path to a VDM file
 * @returns Decompressed VDM rules data
 */
function readVdm(path: string): Uint8Array | WindowsError {
  const bytes = readFile(path);
  if (bytes instanceof FileError) {
    return new WindowsError(
      `DEFENDER`,
      `could not read file ${path}: ${bytes}`,
    );
  }

  // search for RMDX signature
  const sig = new Uint8Array([82, 77, 68, 88]);
  const sig_start = takeUntil(bytes, sig);
  if (sig_start instanceof NomError) {
    return new WindowsError(
      `DEFENDER`,
      `could not find sig for ${path}: ${sig_start}`,
    );
  }

  const min_size = 32;
  if (sig_start.remaining.length < min_size) {
    return new WindowsError(`DEFENDER`, `defender data too small`);
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
    return new WindowsError(
      `DEFENDER`,
      `could decompress ${path}: ${decom_data}`,
    );
  }

  if (decom_data.byteLength != decom_size) {
    return new WindowsError(
      `DEFENDER`,
      `incorrect decompressed size, expected ${decom_size} got: ${decom_data.byteLength}`,
    );
  }

  return decom_data;
}

interface RulesAndNextOffset {
  rules: DefinitionRule[];
  offset: number;
}

function extractRules(data: Uint8Array): RulesAndNextOffset | WindowsError {
  const threat_start = getStart(data);
  if (threat_start instanceof WindowsError) {
    return threat_start;
  }
  console.log(threat_start);
  let rule_type = RuleType.SIGNATURE_TYPE_THREAT_BEGIN;
  const size_offset = 4;
  let offset = threat_start.size + size_offset;

  const definition_rules: DefinitionRule[] = [];
  while (
    rule_type != RuleType.SIGNATURE_TYPE_THREAT_END &&
    rule_type != RuleType.SIGNATURE_TYPE_UNKNOWN
  ) {
    const sig_buffer = new Uint8Array(data.buffer.slice(offset));
    const meta = getSigMeta(sig_buffer);
    if (meta instanceof WindowsError) {
      return meta;
    }
    //console.log(meta.sig);

    rule_type = meta.sig;
    offset += meta.size + size_offset;

    const definition: DefinitionRule = {
      type: meta.sig,
      signatures: [],
    };

    const rules = getSigValues(meta.bytes, meta.sig);
    if (rules instanceof WindowsError) {
      definition.signatures.push(encode(meta.bytes));
      definition_rules.push(definition);
      continue;
    }

    definition.signatures = rules;
    definition_rules.push(definition);
  }

  const rules_offset: RulesAndNextOffset = {
    rules: definition_rules,
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

function getStart(data: Uint8Array): ThreatStart | WindowsError {
  const threat_start = RuleType.SIGNATURE_TYPE_THREAT_BEGIN;
  const start_sig = getSigMeta(data);
  if (start_sig instanceof WindowsError || start_sig.sig != threat_start) {
    return new WindowsError(
      `DEFENDER`,
      `failed to get start sig: ${start_sig}`,
    );
  }

  const start_bytes = new Uint8Array(data.buffer.slice(4, start_sig.size + 1));
  const id = nomUnsignedFourBytes(start_bytes, Endian.Le);
  if (id instanceof NomError) {
    return new WindowsError(`DEFENDER`, `failed to get start id: ${id}`);
  }

  const unknown = nomUnsignedTwoBytes(id.remaining, Endian.Le);
  if (unknown instanceof NomError) {
    return new WindowsError(
      `DEFENDER`,
      `failed to get start unknown: ${unknown}`,
    );
  }

  const counter = nomUnsignedTwoBytes(unknown.remaining, Endian.Le);
  if (counter instanceof NomError) {
    return new WindowsError(
      `DEFENDER`,
      `failed to get start counter: ${counter}`,
    );
  }

  const category = nomUnsignedTwoBytes(counter.remaining, Endian.Le);
  if (category instanceof NomError) {
    return new WindowsError(
      `DEFENDER`,
      `failed to get start category: ${category}`,
    );
  }

  const name_size = nomUnsignedTwoBytes(category.remaining, Endian.Le);
  if (name_size instanceof NomError) {
    return new WindowsError(
      `DEFENDER`,
      `failed to get start name size: ${name_size}`,
    );
  }

  const name = take(name_size.remaining, name_size.value);
  if (name instanceof NomError) {
    return new WindowsError(`DEFENDER`, `failed to get name: ${name_size}`);
  }

  const unknown2 = nomUnsignedTwoBytes(name.remaining as Uint8Array, Endian.Le);
  if (unknown2 instanceof NomError) {
    return new WindowsError(
      `DEFENDER`,
      `failed to get start unknown2: ${unknown}`,
    );
  }

  const resources = take(unknown2.remaining, counter.value * 2);
  if (resources instanceof NomError) {
    return new WindowsError(
      `DEFENDER`,
      `failed to get start resources: ${unknown}`,
    );
  }

  const severity = nomUnsignedOneBytes(
    resources.remaining as Uint8Array,
    Endian.Le,
  );
  if (severity instanceof NomError) {
    return new WindowsError(
      `DEFENDER`,
      `failed to get start severity: ${unknown}`,
    );
  }

  const action = nomUnsignedOneBytes(
    severity.remaining as Uint8Array,
    Endian.Le,
  );
  if (action instanceof NomError) {
    return new WindowsError(
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

function getSigMeta(data: Uint8Array): SigMeta | WindowsError {
  if (data.at(0) === undefined) {
    return new WindowsError(`DEFENDER`, `bad sig`);
  }

  const size_low = data.buffer.slice(1, 3);
  const size_high = data.buffer.slice(2, 4);

  const size = new DataView(size_low).getUint8(0) |
    (new DataView(size_high).getUint16(0, true) << 8);

  const bytes = new Uint8Array(data.buffer.slice(4, size + 1));

  const sig: SigMeta = {
    sig: signature_type(data[0]),
    size,
    bytes,
  };

  return sig;
}

function signature_type(sig: number): RuleType {
  switch (sig) {
    case 1:
      return RuleType.SIGNATURE_TYPE_RESERVED;
    case 2:
      return RuleType.SIGNATURE_TYPE_VOLATILE_THREAT_INFO;
    case 3:
      return RuleType.SIGNATURE_TYPE_VOLATILE_THREAT_ID;
    case 17:
      return RuleType.SIGNATURE_TYPE_CKOLDREC;
    case 32:
      return RuleType.SIGNATURE_TYPE_KVIR32;
    case 33:
      return RuleType.SIGNATURE_TYPE_POLYVIR32;
    case 39:
      return RuleType.SIGNATURE_TYPE_NSCRIPT_NORMAL;
    case 40:
      return RuleType.SIGNATURE_TYPE_NSCRIPT_SP;
    case 41:
      return RuleType.SIGNATURE_TYPE_NSCRIPT_BRUTE;
    case 44:
      return RuleType.SIGNATURE_TYPE_NSCRIPT_CURE;
    case 48:
      return RuleType.SIGNATURE_TYPE_TITANFLT;
    case 61:
      return RuleType.SIGNATURE_TYPE_PEFILE_CURE;
    case 62:
      return RuleType.SIGNATURE_TYPE_MAC_CURE;
    case 64:
      return RuleType.SIGNATURE_TYPE_SIGTREE;
    case 65:
      return RuleType.SIGNATURE_TYPE_SIGTREE_EXT;
    case 66:
      return RuleType.SIGNATURE_TYPE_MACRO_PCODE;
    case 67:
      return RuleType.SIGNATURE_TYPE_MACRO_SOURCE;
    case 68:
      return RuleType.SIGNATURE_TYPE_BOOT;
    case 73:
      return RuleType.SIGNATURE_TYPE_CLEANSCRIPT;
    case 74:
      return RuleType.SIGNATURE_TYPE_TARGET_SCRIPT;
    case 80:
      return RuleType.SIGNATURE_TYPE_CKSIMPLEREC;
    case 81:
      return RuleType.SIGNATURE_TYPE_PATTMATCH;
    case 83:
      return RuleType.SIGNATURE_TYPE_RPFROUTINE;
    case 85:
      return RuleType.SIGNATURE_TYPE_NID;
    case 86:
      return RuleType.SIGNATURE_TYPE_GENSFX;
    case 87:
      return RuleType.SIGNATURE_TYPE_UNPLIB;
    case 88:
      return RuleType.SIGNATURE_TYPE_DEFAULTS;
    case 91:
      return RuleType.SIGNATURE_TYPE_DBVAR;
    case 92:
      return RuleType.SIGNATURE_TYPE_THREAT_BEGIN;
    case 93:
      return RuleType.SIGNATURE_TYPE_THREAT_END;
    case 94:
      return RuleType.SIGNATURE_TYPE_FILENAME;
    case 95:
      return RuleType.SIGNATURE_TYPE_FILEPATH;
    case 96:
      return RuleType.SIGNATURE_TYPE_FOLDERNAME;
    case 97:
      return RuleType.SIGNATURE_TYPE_PEHSTR;
    case 98:
      return RuleType.SIGNATURE_TYPE_LOCALHASH;
    case 99:
      return RuleType.SIGNATURE_TYPE_REGKEY;
    case 100:
      return RuleType.SIGNATURE_TYPE_HOSTSENTRY;
    case 103:
      return RuleType.SIGNATURE_TYPE_STATIC;
    case 105:
      return RuleType.SIGNATURE_TYPE_LATENT_THREAT;
    case 106:
      return RuleType.SIGNATURE_TYPE_REMOVAL_POLICY;
    case 107:
      return RuleType.SIGNATURE_TYPE_WVT_EXCEPTION;
    case 108:
      return RuleType.SIGNATURE_TYPE_REVOKED_CERTIFICATE;
    case 112:
      return RuleType.SIGNATURE_TYPE_TRUSTED_PUBLISHER;
    case 113:
      return RuleType.SIGNATURE_TYPE_ASEP_FILEPATH;
    case 115:
      return RuleType.SIGNATURE_TYPE_DELTA_BLOB;
    case 116:
      return RuleType.SIGNATURE_TYPE_DELTA_BLOB_RECINFO;
    case 117:
      return RuleType.SIGNATURE_TYPE_ASEP_FOLDERNAME;
    case 119:
      return RuleType.SIGNATURE_TYPE_PATTMATCH_V2;
    case 120:
      return RuleType.SIGNATURE_TYPE_PEHSTR_EXT;
    case 121:
      return RuleType.SIGNATURE_TYPE_VDLL_X86;
    case 122:
      return RuleType.SIGNATURE_TYPE_VERSIONCHECK;
    case 123:
      return RuleType.SIGNATURE_TYPE_SAMPLE_REQUEST;
    case 124:
      return RuleType.SIGNATURE_TYPE_VDLL_X64;
    case 126:
      return RuleType.SIGNATURE_TYPE_SNID;
    case 127:
      return RuleType.SIGNATURE_TYPE_FOP;
    case 128:
      return RuleType.SIGNATURE_TYPE_KCRCE;
    case 131:
      return RuleType.SIGNATURE_TYPE_VFILE;
    case 132:
      return RuleType.SIGNATURE_TYPE_SIGFLAGS;
    case 133:
      return RuleType.SIGNATURE_TYPE_PEHSTR_EXT2;
    case 134:
      return RuleType.SIGNATURE_TYPE_PEMAIN_LOCATOR;
    case 135:
      return RuleType.SIGNATURE_TYPE_PESTATIC;
    case 136:
      return RuleType.SIGNATURE_TYPE_UFSP_DISABLE;
    case 137:
      return RuleType.SIGNATURE_TYPE_FOPEX;
    case 138:
      return RuleType.SIGNATURE_TYPE_PEPCODE;
    case 139:
      return RuleType.SIGNATURE_TYPE_IL_PATTERN;
    case 140:
      return RuleType.SIGNATURE_TYPE_ELFHSTR_EXT;
    case 141:
      return RuleType.SIGNATURE_TYPE_MACHOHSTR_EXT;
    case 142:
      return RuleType.SIGNATURE_TYPE_DOSHSTR_EXT;
    case 143:
      return RuleType.SIGNATURE_TYPE_MACROHSTR_EXT;
    case 144:
      return RuleType.SIGNATURE_TYPE_TARGET_SCRIPT_PCODE;
    case 145:
      return RuleType.SIGNATURE_TYPE_VDLL_IA64;
    case 149:
      return RuleType.SIGNATURE_TYPE_PEBMPAT;
    case 150:
      return RuleType.SIGNATURE_TYPE_AAGGREGATOR;
    case 151:
      return RuleType.SIGNATURE_TYPE_SAMPLE_REQUEST_BY_NAME;
    case 152:
      return RuleType.SIGNATURE_TYPE_REMOVAL_POLICY_BY_NAME;
    case 153:
      return RuleType.SIGNATURE_TYPE_TUNNEL_X86;
    case 154:
      return RuleType.SIGNATURE_TYPE_TUNNEL_X64;
    case 155:
      return RuleType.SIGNATURE_TYPE_TUNNEL_IA64;
    case 156:
      return RuleType.SIGNATURE_TYPE_VDLL_ARM;
    case 157:
      return RuleType.SIGNATURE_TYPE_THREAD_X86;
    case 158:
      return RuleType.SIGNATURE_TYPE_THREAD_X64;
    case 159:
      return RuleType.SIGNATURE_TYPE_THREAD_IA64;
    case 160:
      return RuleType.SIGNATURE_TYPE_FRIENDLYFILE_SHA256;
    case 161:
      return RuleType.SIGNATURE_TYPE_FRIENDLYFILE_SHA512;
    case 162:
      return RuleType.SIGNATURE_TYPE_SHARED_THREAT;
    case 163:
      return RuleType.SIGNATURE_TYPE_VDM_METADATA;
    case 164:
      return RuleType.SIGNATURE_TYPE_VSTORE;
    case 165:
      return RuleType.SIGNATURE_TYPE_VDLL_SYMINFO;
    case 166:
      return RuleType.SIGNATURE_TYPE_IL2_PATTERN;
    case 167:
      return RuleType.SIGNATURE_TYPE_BM_STATIC;
    case 168:
      return RuleType.SIGNATURE_TYPE_BM_INFO;
    case 169:
      return RuleType.SIGNATURE_TYPE_NDAT;
    case 170:
      return RuleType.SIGNATURE_TYPE_FASTPATH_DATA;
    case 171:
      return RuleType.SIGNATURE_TYPE_FASTPATH_SDN;
    case 172:
      return RuleType.SIGNATURE_TYPE_DATABASE_CERT;
    case 173:
      return RuleType.SIGNATURE_TYPE_SOURCE_INFO;
    case 174:
      return RuleType.SIGNATURE_TYPE_HIDDEN_FILE;
    case 175:
      return RuleType.SIGNATURE_TYPE_COMMON_CODE;
    case 176:
      return RuleType.SIGNATURE_TYPE_VREG;
    case 177:
      return RuleType.SIGNATURE_TYPE_NISBLOB;
    case 178:
      return RuleType.SIGNATURE_TYPE_VFILEEX;
    case 179:
      return RuleType.SIGNATURE_TYPE_SIGTREE_BM;
    case 180:
      return RuleType.SIGNATURE_TYPE_VBFOP;
    case 181:
      return RuleType.SIGNATURE_TYPE_VDLL_META;
    case 182:
      return RuleType.SIGNATURE_TYPE_TUNNEL_ARM;
    case 183:
      return RuleType.SIGNATURE_TYPE_THREAD_ARM;
    case 184:
      return RuleType.SIGNATURE_TYPE_PCODEVALIDATOR;
    case 186:
      return RuleType.SIGNATURE_TYPE_MSILFOP;
    case 187:
      return RuleType.SIGNATURE_TYPE_KPAT;
    case 188:
      return RuleType.SIGNATURE_TYPE_KPATEX;
    case 189:
      return RuleType.SIGNATURE_TYPE_LUASTANDALONE;
    case 190:
      return RuleType.SIGNATURE_TYPE_DEXHSTR_EXT;
    case 191:
      return RuleType.SIGNATURE_TYPE_JAVAHSTR_EXT;
    case 192:
      return RuleType.SIGNATURE_TYPE_MAGICCODE;
    case 193:
      return RuleType.SIGNATURE_TYPE_CLEANSTORE_RULE;
    case 194:
      return RuleType.SIGNATURE_TYPE_VDLL_CHECKSUM;
    case 195:
      return RuleType.SIGNATURE_TYPE_THREAT_UPDATE_STATUS;
    case 196:
      return RuleType.SIGNATURE_TYPE_VDLL_MSIL;
    case 197:
      return RuleType.SIGNATURE_TYPE_ARHSTR_EXT;
    case 198:
      return RuleType.SIGNATURE_TYPE_MSILFOPEX;
    case 199:
      return RuleType.SIGNATURE_TYPE_VBFOPEX;
    case 200:
      return RuleType.SIGNATURE_TYPE_FOP64;
    case 201:
      return RuleType.SIGNATURE_TYPE_FOPEX64;
    case 202:
      return RuleType.SIGNATURE_TYPE_JSINIT;
    case 203:
      return RuleType.SIGNATURE_TYPE_PESTATICEX;
    case 204:
      return RuleType.SIGNATURE_TYPE_KCRCEX;
    case 205:
      return RuleType.SIGNATURE_TYPE_FTRIE_POS;
    case 206:
      return RuleType.SIGNATURE_TYPE_NID64;
    case 207:
      return RuleType.SIGNATURE_TYPE_MACRO_PCODE64;
    case 208:
      return RuleType.SIGNATURE_TYPE_BRUTE;
    case 209:
      return RuleType.SIGNATURE_TYPE_SWFHSTR_EXT;
    case 210:
      return RuleType.SIGNATURE_TYPE_REWSIGS;
    case 211:
      return RuleType.SIGNATURE_TYPE_AUTOITHSTR_EXT;
    case 212:
      return RuleType.SIGNATURE_TYPE_INNOHSTR_EXT;
    case 213:
      return RuleType.SIGNATURE_TYPE_ROOTCERTSTORE;
    case 214:
      return RuleType.SIGNATURE_TYPE_EXPLICITRESOURCE;
    case 215:
      return RuleType.SIGNATURE_TYPE_CMDHSTR_EXT;
    case 216:
      return RuleType.SIGNATURE_TYPE_FASTPATH_TDN;
    case 217:
      return RuleType.SIGNATURE_TYPE_EXPLICITRESOURCEHASH;
    case 218:
      return RuleType.SIGNATURE_TYPE_FASTPATH_SDN_EX;
    case 219:
      return RuleType.SIGNATURE_TYPE_BLOOM_FILTER;
    case 220:
      return RuleType.SIGNATURE_TYPE_RESEARCH_TAG;
    case 222:
      return RuleType.SIGNATURE_TYPE_ENVELOPE;
    case 223:
      return RuleType.SIGNATURE_TYPE_REMOVAL_POLICY64;
    case 224:
      return RuleType.SIGNATURE_TYPE_REMOVAL_POLICY64_BY_NAME;
    case 225:
      return RuleType.SIGNATURE_TYPE_VDLL_X64;
    case 226:
      return RuleType.SIGNATURE_TYPE_VDLL_META_ARM;
    case 227:
      return RuleType.SIGNATURE_TYPE_VDLL_META_MSIL;
    case 228:
      return RuleType.SIGNATURE_TYPE_MDBHSTR_EXT;
    case 229:
      return RuleType.SIGNATURE_TYPE_SNIDEX;
    case 230:
      return RuleType.SIGNATURE_TYPE_SNIDEX2;
    case 231:
      return RuleType.SIGNATURE_TYPE_AAGGREGATOREX;
    case 232:
      return RuleType.SIGNATURE_TYPE_PUA_APPMAP;
    case 233:
      return RuleType.SIGNATURE_TYPE_PROPERTY_BAG;
    case 234:
      return RuleType.SIGNATURE_TYPE_DMGHSTR_EXT;
    case 235:
      return RuleType.SIGNATURE_TYPE_DATABASE_CATALOG;
    default:
      return RuleType.SIGNATURE_TYPE_UNKNOWN;
  }
}

function getSigValues(
  data: Uint8Array,
  rule: RuleType,
): string[] | WindowsError {
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

  return new WindowsError(`DEFENDER`, `unknown RuleType ${rule}`);
}
