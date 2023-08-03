/**
 * Read a XML file into a JSON object. Supports either UTF8 or UTF16 encoded XML files
 * @param path Path to XML file to read
 * @returns JSON representation of XML file or Error
 */
export function readXml(path: string): Record<string, unknown> | Error {
  //@ts-ignore: Custom Artemis function
  const result: string = encoding.read_xml(path);

  const value: Record<string, unknown> | Error = JSON.parse(result);
  return value;
}
