import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import {
  LuluAction,
  Rule,
} from "../../../types/macos/plist/lulu";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { MacosError } from "../errors";
import { getPlist } from "../plist";

/**
 * Function to extract Lulu firewall rules.
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional path to Lulu `rules.plist` file
 * @returns `LuluRules` object or `MacosError`
 */
export function luluRules(protocol = AccessorProtocol.Host, alt_path?: string): Rule[] | MacosError {
  const path = alt_path ?? "/Library/Objective-See/LuLu/rules.plist";
  const accessor = new Accessor();

  const matches = accessor.globfs(path, protocol);
  if (matches instanceof FileError) {
    return new MacosError(`LULU`, `failed to glob for ${path}: ${matches}`);
  }

  const rules: Rule[] = [];
  for (const entry of matches) {
    if (entry.meta.kind !== EntryKind.File) {
      continue;
    }

    const bytes = accessor.readFileHandle(entry.handle as FileHandle);
    if (bytes instanceof FileError) {
      console.warn(`Failed to read ${entry.meta.display_path}: ${bytes}`);
      continue;
    }

    const plist_data = getPlist(bytes);
    if (plist_data instanceof MacosError) {
      console.warn(`Failed to parse ${entry.meta.display_path}: ${plist_data}`);
      continue;
    }

    // Rules format at: https://github.com/objective-see/LuLu/blob/master/LuLu/Extension/Rules.m#L33
    const objects = plist_data as Record<string, unknown[]>;

    const object_data = objects[ "$objects" ];
    if (object_data === undefined) {
      console.warn(`Got undefined for LuLu FW objects`);
      continue;
    }

    for (const value of object_data) {
      if (typeof value !== "object") {
        continue;
      }

      // We are looking for entries that have same object interface as `Rule`
      const rule_value = value as unknown as Record<string, number | boolean>;
      if (rule_value[ "uuid" ] === undefined) {
        continue;
      }

      const rule: Rule = {
        file: object_data[ rule_value[ "name" ] as number ] as string,
        uuid: object_data[ rule_value[ "uuid" ] as number ] as string,
        endpoint_addr:
          object_data[ rule_value[ "endpointAddr" ] as number ] as string,
        is_regex: rule_value[ "isEndpointAddrRegex" ] as boolean,
        scope: object_data[ rule_value[ "scope" ] as number ] as string,
        type: object_data[ rule_value[ "type" ] as number ] as string,
        key: object_data[ rule_value[ "key" ] as number ] as string,
        action: getAction(object_data[ rule_value[ "action" ] as number ] as number),
        endpoint_host:
          object_data[ rule_value[ "endpointHost" ] as number ] as string,
        code_signing_info: getCodeSigning(
          object_data[ rule_value[ "csInfo" ] as number ] as LuluSigning | string,
          object_data,
        ),
        pid: object_data[ rule_value[ "pid" ] as number ] as number,
        endpoint_port:
          object_data[ rule_value[ "endpointPort" ] as number ] as number,
        evidence: entry.meta.display_path,
      };

      rules.push(rule);
    }
  }

  return rules;
}

/**
 * Function to determin the action LuLu will take
 * @param data Action value from Lulu data
 * @returns `LuluAction` value
 */
function getAction(data: number): LuluAction {
  if (data) {
    return LuluAction.ALLOW;
  }

  return LuluAction.BLOCK;
}

interface LuluSigning {
  "NS.keys": number[];
  "NS.objects": number[];
  "$class": string | number;
}

/**
 * Function to extract signing info related to Lulu entries
 * @param data Code signing info associated with Lulu entry
 * @param objects plist objects array
 * @returns `Record<string, string | string[]>` entries
 */
function getCodeSigning(
  data: LuluSigning | string,
  objects: unknown[],
): Record<string, string | string[]> {
  const cs_info: Record<string, string | string[]> = {};
  if (typeof data === "string") {
    return cs_info;
  }

  for (let i = 0; i < data[ "NS.keys" ].length; i++) {
    const ns_value = data[ "NS.keys" ][ i ];
    if (ns_value === undefined) {
      continue;
    }
    const key = objects.at(ns_value) as string ?? `${i}`;

    const value_key = data[ "NS.objects" ].at(i);
    if (value_key === undefined) {
      cs_info[ key ] = `objects value too small`;
      continue;
    }

    const value = objects.at(value_key as number) as
      | string
      | Record<string, number[]>
      | number
      | undefined;
    if (value === undefined) {
      continue;
    }
    if (typeof value === "string" || typeof value === "number") {
      if (key === "signatureSigner") {
        cs_info[ key ] = getSignStatus(Number(value));
        continue;
      }

      cs_info[ key ] = value as string;
      continue;
    }

    const entries: string[] = [];
    const object_values = value[ "NS.objects" ];
    if (object_values === undefined) {
      continue;
    }
    // more NS.Objects
    for (const entry of object_values) {
      const lulu_value = objects.at(entry) as string ?? `${entry}`;
      entries.push(lulu_value);
    }
    cs_info[ key ] = entries;
  }

  return cs_info;
}

enum Signer {
  APPLE = "APPLE",
  APPSTORE = "APPSTORE",
  iOSSTORE = "iOSSTORE",
  DEVID = "DEVID",
  UNKNOWN = "UNKNOWN",
}

/**
 * Function to get Signer value
 * @param status `signatureSigner` value
 * @returns `Signer` value for signatureSigner
 */
function getSignStatus(status: number): Signer {
  // From: https://github.com/objective-see/LuLu/blob/master/LuLu/Shared/signing.m#L213
  switch (status) {
    case 1:
      return Signer.APPLE;
    case 2:
      return Signer.APPSTORE;
    case 3:
      return Signer.iOSSTORE;
    case 4:
      return Signer.DEVID;
    default:
      return Signer.UNKNOWN;
  }
}

/**
 * Function to test Lulu parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Lulu parsing
 */
export function testLuluRules(): void {
  const lulu_test = "../../test_data/macos/lulu/rules.plist";
  const results = luluRules(AccessorProtocol.Host, lulu_test);
  if (results instanceof MacosError) {
    throw console.log(results);
  }


  if (results.length !== 253) {
    throw `Got ${results.length} wanted "253".......luluRules ❌`;
  }

  if (results[ 3 ]?.file !== "storekitagent") {
    throw `Got ${results[ 3 ]?.file} wanted "storekitagent".......luluRules ❌`;
  }

  if (results[ 123 ]?.file !== "Precize") {
    throw `Got ${results[ 123 ]?.file} wanted "Precize".......luluRules ❌`;
  }

  console.info(`  Function luluRules ✅`);

  if (getAction(1) !== LuluAction.ALLOW) {
    throw `Got ${LuluAction.BLOCK} wanted "${LuluAction.ALLOW}".......getAction ❌`;
  }

  if (getAction(0) !== LuluAction.BLOCK) {
    throw `Got ${LuluAction.ALLOW} wanted "${LuluAction.BLOCK}".......getAction ❌`;
  }

  console.info(`  Function getAction ✅`);

  const test_data: LuluSigning = { "NS.keys": [ 542, 543, 544, 545 ], "NS.objects": [ 22, 272, 273, 546 ], "$class": 279 };
  const results_code = getCodeSigning(test_data, []);
  if (Object.keys(results_code).length !== 0) {
    throw `Got ${Object.keys(results_code).length} wanted "0".......getCodeSigning ❌`;
  }

  console.info(`  Function getCodeSigning ✅`);

  const test_status = [ 1, 2, 3, 4 ];
  for (const entry of test_status) {
    if (getSignStatus(entry) === Signer.UNKNOWN) {
      throw `Got ${getSignStatus(entry)} wanted "${Signer.UNKNOWN}".......getSignStatus ❌`;
    }
  }
  console.info(`  Function getSignStatus ✅`);
}