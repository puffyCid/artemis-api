import type { Url } from "../../../types/http/unfold";
import { EncodingError } from "../../encoding/errors";
import { parseProtobuf } from "../../encoding/protobuf";
import { NomError } from "../../nom/error";
import { Endian, nomUnsignedFourBytes } from "../../nom/helpers";
import { unixEpochToISO } from "../../time/conversion";
import { decodeBase64Url } from "./encoding";

/**
 * Class to parse Google searches
 */
export class Google {
  private url: Url;

  constructor(url: Url) {
    this.url = url;
  }

  /**
   * Function to extract Google search query data
   * https://serpapi.com/blog/google-search-parameters/
   */
  public parseGoogle() {
    for (const entry of this.url.query_pairs) {
      const param = entry.split("=");
      const key = param.at(0);

      switch (key) {
        // https://deedpolloffice.com/blog/articles/decoding-ei-parameter
        case "ei": {
          const value = param.at(1);
          if (value === undefined) {
            break;
          }
          const bytes = decodeBase64Url(value);
          if (bytes instanceof EncodingError) {
            break;
          }
          const timestamp = nomUnsignedFourBytes(bytes, Endian.Le);
          if (timestamp instanceof NomError) {
            break;
          }
          this.url["search_time"] = unixEpochToISO(timestamp.value);

          // Remaining bytes are pseudo Protobuf data (only values no keys)
          // Mostly unknown data
          break;
        }
        case "q": {
          this.url["search_query"] = param.at(1);
          break;
        }
        case "hl": {
          this.url["host_language"] = param.at(1);
          break;
        }
        case "uact": {
          this.url[key] = param.at(1);
          break;
        }
        case "sca_esv": {
          this.url[key] = param.at(1);
          break;
        }
        case "oq": {
          this.url["original_query"] = param.at(1);
          break;
        }
        case "source": {
          if (param.at(1) === "hp") {
            this.url["source_of_search"] = "homepage";
            break;
          }
          this.url["source_of_search"] = param.at(1);
          break;
        }
        case "gs_lp": {
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
          this.url["gs_lp"] = proto_data;
          break;
        }
        // https://deedpolloffice.com/blog/articles/decoding-ved-parameter
        case "ved": {
          const value = param.at(1);
          if (value === undefined) {
            break;
          }

          // Only support encoded ved parameters
          if (value.startsWith("1")) {
            break;
          }
          const bytes = decodeBase64Url(value.substring(1));
          if (bytes instanceof EncodingError) {
            break;
          }
          const proto_data = parseProtobuf(bytes);
          if (proto_data instanceof EncodingError) {
            break;
          }
          this.url["link_tracking"] = proto_data;
          break;
        }
        case "sclient": {
          const value = param.at(1);
          switch (value) {
            case "gws-wiz-serp": {
              this.url["search_client"] =
                "Google Web Search Wizard, Search Engine Results Page";
              break;
            }
            case "gws-wiz": {
              this.url["search_client"] = "Google Web Search Wizard";
              break;
            }
            default: {
              this.url["search_client"] = value;
              break;
            }
          }
          break;
        }
        case "ie": {
          this.url["input_encoding"] = param.at(1);;
          break;
        }
        case "sourceid": {
          this.url["search_source_id"] = param.at(1);;
          break;
        }
        case "gs_lcrp": {
          const bytes = decodeBase64Url(param.at(1) ?? "");
          if (bytes instanceof EncodingError) {
            break;
          }
          const proto_data = parseProtobuf(bytes);
          if (proto_data instanceof EncodingError) {
            break;
          }
          this.url["google_search_ logging_chrome_reporting_protocol"] = proto_data;
          break;
        }
        case undefined: {
          break;
        }
        default: {
          console.warn(
            `unknown google key: ${key}. Value: ${param.at(1)}`,
          );
          this.url[key] = param.at(1);
          break;
        }
      }
    }
  }
}
