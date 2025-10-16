import { EncodingError } from "./errors";

/**
 * Read a XML file into a JSON object. Supports either UTF8 or UTF16 encoded XML files
 * @param path Path to XML file to read
 * @returns Array of JSON objects representing the XML file or Error
 */
export function readXml(path: string): Record<string, unknown> | EncodingError {
  try {
    // @ts-expect-error: Custom Artemis function
    const result = js_read_xml(path);
    return result;
  } catch (err) {
    return new EncodingError("XML", `failed to read XML ${path}: ${err}`);
  }
}
