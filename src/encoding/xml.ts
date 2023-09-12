/**
 * Read a XML file into a JSON object. Supports either UTF8 or UTF16 encoded XML files
 * @param path Path to XML file to read
 * @returns JSON representation of XML file or Error
 */
export function readXml(path: string): Record<string, unknown> | Error {
  //@ts-ignore: Custom Artemis function
  const result = encoding.read_xml(path);
  if (result instanceof Error) {
    return result;
  }

  const value: Record<string, unknown> = JSON.parse(result);
  return value;
}
