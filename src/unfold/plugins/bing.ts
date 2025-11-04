import type { Url } from "../../../types/http/unfold";
import { EncodingError } from "../../encoding/errors";
import { extractUtf8String } from "../../encoding/mod";
import { parseProtobuf } from "../../encoding/protobuf";
import { NomError } from "../../nom/error";
import { takeUntil } from "../../nom/mod";
import { decodeBase64Url, extractUUID } from "./encoding";

/**
 * Class to parse Bing searches
 */
export class Bing {
  private url: Url;

  constructor(url: Url) {
    this.url = url;
  }

  /**
   * Function to extract Bing search query data
   * https://github.com/obsidianforensics/unfurl/blob/main/unfurl/parsers/parse_bing.py
   */
  public parseBing() {
    for (const entry of this.url.query_pairs) {
      const [key, ...param] = entry.split("=");
      if (key === undefined) {
        continue;
      }
      const value = param.join("=");
      switch (key.toLowerCase()) {
        case "form": {
          if (value === "") {
            break;
          }

          this.url[key] = value;
          break;
        }
        case "sk": {
          if (value === "") {
            break;
          }

          this.url[key] = value;
          break;
        }
        case "ghpl": {
          if (value === "") {
            break;
          }

          this.url[key] = value;
          break;
        }
        case "q": {
          this.url["search_query"] = value;
          break;
        }
        case "sp": {
          this.url["suggested_position"] = value;
          break;
        }
        case "lq": {
          this.url[key] = value;
          break;
        }
        case "pq": {
          this.url["partial_query"] = value;
          break;
        }
        case "sc": {
          this.url["suggestion_count"] = value;
          break;
        }
        case "qs": {
          this.url["suggestion_type"] = value;
          break;
        }
        case "ghc": {
          this.url[key] = value;
          break;
        }
        case "cvid": {
          const uuid = value;
          if (uuid.length !== 32) {
            this.url["conversation_id"] = value;
            break;
          }
          this.url["conversation_id"] = extractUUID(uuid);
          break;
        }
        case "ghacc": {
          this.url[key] = value;
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

          this.url[key] = extractUtf8String(data).split("!");

          // Remove quotes from second part of filter
          const remaining = (filter_value.remaining as string)
            .replaceAll('"', "").trim();
          const values = remaining.split(" ");
          for (const entry of values) {
            const filter_values = entry.split(":");
            this.url[`filters_${filter_values.at(0) ?? ""}`] = filter_values.at(
              1,
            );
          }
          break;
        }
        case "ghsh": {
          this.url[key] = value;
          break;
        }
        case "pglt": {
          // Could be page generation or load timing
          // According to Copilot
          // Always seems have value 2083
          this.url[key] = value;
          break;
        }
        case "pc": {
          // Always seems have value U531
          this.url[key] = value;
          break;
        }
        case "ver": {
          this.url["version"] = value;
          break;
        }
        case "ptn": {
          this.url[key] = value;
          break;
        }
        case "hsh": {
          this.url[key] = value;
          break;
        }
        case "psq": {
          // Seems to contain a shorter search query term
          // Compilot refers to this as a "compact query"
          this.url['compact_search_query'] = value;
          break;
        }
        case "ntb": {
          this.url[key] = value;
          break;
        }
        case "!": break;
        case "p": {
          // Needs to be combined with "u" query to fully base64 decode?
          // Seems to contain a timestamp at the end
          this.url[key] = value;
          break;
        }
        case "u": {
          // Have to combine with the "p" query in order to decode
          // Contains URL
          this.url[key] = value;
          break;
        }
        case "fclid": {
          // Probably somekind of click identifier?
          // gclid - Google Click idnetifier
          // fbclid - Facebook Click identifier
          this.url[key] = value;
          break;
        }
        case "gs_lcrp": {
          // Similar to Google "gs_lp"?
          const value = param.at(1);
          if (value === undefined) {
            break;
          }
          const bytes = decodeBase64Url(value);
          if (bytes instanceof EncodingError) {
            break;
          }
          const proto_data = parseProtobuf(bytes);
          if (proto_data instanceof EncodingError) {
            break;
          }
          this.url[key] = proto_data;
          break;
        }
        case undefined: {
          break;
        }
        default: {
          console.warn(
            `unknown bing key: ${key}. Value: ${value}`,
          );
          this.url[key] = value;
          break;
        }
      }
    }
  }
}
