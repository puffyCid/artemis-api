import { WindowsError } from "./errors";
import { ClassInfo, IndexBody, Namespace, WmiPersist } from "../../types/windows/wmi";

/**
 * Function to parse WMI repository and extract persistence entries
 * @param path Optional path to folder containing WMI repo data. Should contain MAPPING*.MAP, OBJECTS.DATA, INDEX.BTR
 * @returns Array of `WmiPersist` entries or `WindowsError`
 */
export function getWmiPersist(path?: string): WmiPersist[] | WindowsError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_wmipersist(path);

    return data;
  } catch (err) {
    return new WindowsError("WMIPERSIST", `failed to parse WMI repo: ${err}`);
  }
}

/**
 * Function to list namespaces to a provided namespace. The top WMI namespace is `ROOT`
 * @param namespace Namespace to target. Default is `root`
 * @param indexes Array of `IndexBody`
 * @param object_data `OBJECT.DATA` bytes
 * @param pages Array pages
 * @returns Array of `Namespace` or `WindowsError`
 */
export function listNamespaces(namespace = "root", indexes: IndexBody[], object_data: Uint8Array, pages: number[]): Namespace[] | WindowsError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_list_namespaces_classes(namespace, indexes, object_data, pages, false);

    return data;
  } catch (err) {
    return new WindowsError("WMIPERSIST", `failed to list namespaces: ${err}`);
  }
}

/**
 * Function to list namespaces to a provided namespace. The top WMI namespace is `ROOT`
 * @param namespace Namespace to target. Default is `root`
 * @param indexes Array of `IndexBody`
 * @param object_data `OBJECT.DATA` bytes
 * @param pages Array pages
 * @returns Array of `Record<string, ClassInfo>` or `WindowsError`
 */
export function listClasses(namespace = "root", indexes: IndexBody[], object_data: Uint8Array, pages: number[]): Record<string, ClassInfo>[] | WindowsError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_list_namespaces_classes(namespace, indexes, object_data, pages, true);

    return data;
  } catch (err) {
    return new WindowsError("WMIPERSIST", `failed to list classes: ${err}`);
  }
}

/**
 * Function to get detailed description of a class
 * @param namespace Namespace to target
 * @param locale Windows locale number. Obtained from `list_classes`
 * @param class_name Class name to target
 * @param indexes Array of `IndexBody`
 * @param object_data `OBJECT.DATA` bytes
 * @param pages Array pages
 * @returns `ClassInfo` object or `WindowsError`
 */
export function classDescriptions(namespace: string, locale: number, class_name: string, indexes: IndexBody[], object_data: Uint8Array, pages: number[]): ClassInfo | WindowsError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_class_description(namespace, locale, class_name, indexes, object_data, pages);

    return data;
  } catch (err) {
    return new WindowsError("WMIPERSIST", `failed to get class description: ${err}`);
  }
}

/**
 * Function to return WMI pages
 * @param map_glob Glob to WMI map files
 * @returns Array of pages or `WindowsError`
 */
export function getWmiPages(map_glob: string): number[] | WindowsError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_get_wmi_pages(map_glob);

    return data;
  } catch (err) {
    return new WindowsError("WMIPERSIST", `failed to get wmi pages: ${err}`);
  }
}

/**
 * Function to extract WMI indexes
 * @param indexes `INDEX.BTR` bytes
 * @returns Array of `IndexBody` or `WindowsError`
 */
export function getWmiIndexes(indexes: Uint8Array): IndexBody[] | WindowsError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_get_wmi_indexes(indexes);

    return data;
  } catch (err) {
    return new WindowsError("WMIPERSIST", `failed to get wmi indexes: ${err}`);
  }
}