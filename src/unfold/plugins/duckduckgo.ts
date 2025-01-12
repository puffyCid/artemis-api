import type { Url } from "../../../types/http/unfold.ts";

/**
 * Class to parse DuckDuckGo searches
 */
export class DuckDuckGo {
  private url: Url;

  constructor(url: Url) {
    this.url = url;
  }

  /**
   * Extract data from a DuckDuckGo search
   */
  public parseDuckDuckGo() {
    for (const entry of this.url.query_pairs) {
      const param = entry.split("=");
      const key = param.at(0);

      switch (key) {
        case "ia": {
          this.url["search_type"] = param.at(1);
          break;
        }
        case "t": {
          if (param.at(1) === "h_") {
            this.url["tracker"] = "homepage";
            break;
          }
          this.url["tracker"] = param.at(1);
          break;
        }
        case "q": {
          this.url["duckduckgo_query"] = param.at(1);
          break;
        }
        case "df": {
          this.url["search_period"] = param.at(1);
          break;
        }
        case "iax": {
          this.url["search_type_expanded_view"] = param.at(1);
          break;
        }
        case "iaxm": {
          this.url["search_type_expanded_view_mobile"] = param.at(1);
          break;
        }
        case "bbox": {
          this.url["bounding_box"] = param.at(1);
          break;
        }
        case "iar": {
          this.url["search_referrer"] = param.at(1);
          break;
        }
        case undefined: {
          break;
        }
        default: {
          console.warn(
            `unknown duckduckgo key: ${key}. Value: ${param.at(1)}`,
          );
          break;
        }
      }
    }
  }
}
