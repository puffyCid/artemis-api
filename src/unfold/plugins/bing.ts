import type { Url } from "../../../types/http/unfold";
import { EncodingError } from "../../encoding/errors";
import { extractUtf8String } from "../../encoding/mod";
import { NomError } from "../../nom/error";
import { takeUntil } from "../../nom/mod";
import { decodeBase64Url, extractUUID } from "./encoding";

/**
 * Class to parse Bing searches
 */
export class Bing {
  private url: Url;

  constructor (url: Url) {
    this.url = url;
  }

  /**
   * Function to extract Bing search query data
   * https://github.com/obsidianforensics/unfurl/blob/main/unfurl/parsers/parse_bing.py
   */
  public parseBing() {
    for (const entry of this.url.query_pairs) {
      const [ key, ...param ] = entry.split("=");
      const value = param.join("=");
      switch (key.toLowerCase()) {
        case "form": {
          if (value === "") {
            break;
          }

          this.url[ key ] = value;
          break;
        }
        case "sk": {
          if (value === "") {
            break;
          }

          this.url[ key ] = value;
          break;
        }
        case "ghpl": {
          if (value === "") {
            break;
          }

          this.url[ key ] = value;
          break;
        }
        case "q": {
          this.url[ "search_query" ] = value;
          break;
        }
        case "sp": {
          this.url[ "suggested_position" ] = value;
          break;
        }
        case "lq": {
          this.url[ key ] = value;
          break;
        }
        case "pq": {
          this.url[ "partial_query" ] = value;
          break;
        }
        case "sc": {
          this.url[ "suggestion_count" ] = value;
          break;
        }
        case "qs": {
          this.url[ "suggestion_type" ] = value;
          break;
        }
        case "ghc": {
          this.url[ key ] = value;
          break;
        }
        case "cvid": {
          const uuid = value;
          if (uuid.length !== 32) {
            this.url[ "conversation_id" ] = value;
            break;
          }
          this.url[ "conversation_id" ] = extractUUID(uuid);
          break;
        }
        case "ghacc": {
          this.url[ key ] = value;
          break;
        }
        // A little complex
        case "filters": {
          // First part of filter contains base64 data
          const start = takeUntil(value, '"');
          if (start instanceof NomError) {
            break;
          }
          const filter_value = takeUntil(
            start.remaining.slice(1),
            '"',
          );
          if (filter_value instanceof NomError) {
            break;
          }

          const data = decodeBase64Url(filter_value.nommed as string);
          if (data instanceof EncodingError) {
            break;
          }

          this.url[ key ] = extractUtf8String(data).split("!");

          // Remove quotes from second part of filter
          const remaining = (filter_value.remaining as string)
            .replaceAll('"', "").trim();
          const values = remaining.split(" ");
          for (const entry of values) {
            const filter_values = entry.split(":");
            this.url[ `filters_${filter_values.at(0) ?? ""}` ] = filter_values.at(
              1,
            );
          }
          break;
        }
        case "ghsh": {
          this.url[ key ] = value;
          break;
        }
        case undefined: {
          break;
        }
        default: {
          console.warn(
            `unknown bing key: ${key}. Value: ${value}`,
          );
          this.url[ key ] = value;
          break;
        }
      }
    }
  }
}
