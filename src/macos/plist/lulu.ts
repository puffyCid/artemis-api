import {
  LuluAction,
  LuluRules,
  Rule,
} from "../../../types/macos/plist/lulu";
import { MacosError } from "../errors";
import { getPlist } from "../plist";

/**
 * Function to extract Lulu firewall rules.
 * @param alt_file Optional path to Lulu `rules.plist` file
 * @returns `LuluRules` object or `MacosError`
 */
export function luluRules(alt_file?: string): LuluRules | MacosError {
  let file = "/Library/Objective-See/LuLu/rules.plist";
  if (alt_file != undefined) {
    file = alt_file;
  }

  const plist_data = getPlist(file);
  if (plist_data instanceof MacosError) {
    return new MacosError(
      `LULU`,
      `failed to parse rules plist ${file}: ${plist_data}`,
    );
  }

  // Rules format at: https://github.com/objective-see/LuLu/blob/master/LuLu/Extension/Rules.m#L33
  const objects = plist_data as Record<string, unknown[]>;
  const rules: LuluRules = {
    path: file,
    rules: [],
  };

  const object_data = objects["$objects"];
  for (const entry of object_data) {
    if (typeof entry != "object") {
      continue;
    }

    // We are looking for entries that have same object interface as `Rule`
    const rule_value = entry as unknown as Record<string, number | boolean>;
    if (rule_value["uuid"] === undefined) {
      continue;
    }

    const rule: Rule = {
      file: object_data[rule_value["name"] as number] as string,
      uuid: object_data[rule_value["uuid"] as number] as string,
      endpoint_addr:
        object_data[rule_value["endpointAddr"] as number] as string,
      is_regex: rule_value["isEndpointAddrRegex"] as boolean,
      scope: object_data[rule_value["scope"] as number] as string,
      type: object_data[rule_value["type"] as number] as string,
      key: object_data[rule_value["key"] as number] as string,
      action: getAction(object_data[rule_value["action"] as number] as number),
      endpoint_host:
        object_data[rule_value["endpointHost"] as number] as string,
      code_signing_info: getCodeSigning(
        object_data[rule_value["csInfo"] as number] as LuluSigning | string,
        object_data,
      ),
      pid: object_data[rule_value["pid"] as number] as number,
      endpoint_port:
        object_data[rule_value["endpointPort"] as number] as number,
    };

    rules.rules.push(rule);
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
  "$class": string;
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

  for (let i = 0; i < data["NS.keys"].length; i++) {
    const key = objects.at(data["NS.keys"][i]) as string ?? `${i}`;

    const value_key = data["NS.objects"].at(i);
    if (value_key === undefined) {
      cs_info[key] = `objects value too small`;
      continue;
    }

    const value = objects.at(value_key as number) as
      | string
      | Record<string, number[]>
      | number;
    if (typeof value === "string" || typeof value === "number") {
      if (key === "signatureSigner") {
        cs_info[key] = getSignStatus(Number(value));
        continue;
      }

      cs_info[key] = value as string;
      continue;
    }

    const entries: string[] = [];
    // more NS.Objects
    for (const entry of value["NS.objects"]) {
      const lulu_value = objects.at(entry) as string ?? `${entry}`;
      entries.push(lulu_value);
    }
    cs_info[key] = entries;
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
