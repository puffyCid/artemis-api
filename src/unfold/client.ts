import type { Url } from "../../types/http/unfold.ts";
import { UnfoldError } from "./error.ts";
import { Bing } from "./plugins/bing.ts";
import { DuckDuckGo } from "./plugins/duckduckgo.ts";
import { Google } from "./plugins/google.ts";
import { Outlook } from "./plugins/outlook.ts";

/**
 * Class to extract additional metadata from a URL. Inspired by [unfurl](https://dfir.blog/introducing-unfurl/)
 */
export class Unfold {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  /**
   * Function to parse a URL string. Will attempt to extract metadata from URL strings such as Google Search, Outlook, etc
   * @returns `Url` object or `UnfoldError`
   */
  public parseUrl() {
    const data = this.extractUrl();
    if (data instanceof UnfoldError) {
      return data;
    }
    return this.extractData(data);
  }

  /**
   * Function to attempt to extract additional data from URL parameters
   * @param info `Url` object
   * @returns Updated `Url` object or `UnfoldError`
   */
  private extractData(info: Url): Url | UnfoldError {
    if (info.domain.includes("duckduckgo.com")) {
      const duck = new DuckDuckGo(info);
      duck.parseDuckDuckGo();
    } else if (info.domain.includes("google.com")) {
      const goog = new Google(info);
      goog.parseGoogle();
    } else if (info.domain.includes("outlook.live.com")) {
      const out = new Outlook(info);
      out.parseOutlook();
    } else if (info.domain.includes("bing.com")) {
      const bing = new Bing(info);
      bing.parseBing();
    }

    return info;
  }

  /**
   * Extract data from a URL string
   * @returns `Url` object or `UnfoldError`
   */
  private extractUrl(): Url | UnfoldError {
    try {
      //@ts-ignore: Custom Artemis function
      const url_info: Url = js_url_parse(this.url);
      url_info.url = this.url;
      url_info.last_segment = url_info.segments.at(-1) ?? "";
      return url_info;
    } catch (err) {
      return new UnfoldError(
        "URL_PARSE",
        `failed to parse url file ${this.url}: ${err}`,
      );
    }
  }
}
