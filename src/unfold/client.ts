import type { Url } from "../../types/http/unfold";
import { UnfoldError } from "./error";
import { Bing } from "./plugins/bing";
import { Discord } from "./plugins/discord";
import { Dropbox } from "./plugins/dropbox";
import { DuckDuckGo } from "./plugins/duckduckgo";
import { GithubUrl } from "./plugins/github";
import { Google } from "./plugins/google";
import { detectJsonWebToken } from "./plugins/jwt";
import { Outlook } from "./plugins/outlook";
import { ProxmoxUrl } from "./plugins/proxmox";
import { Yahoo } from "./plugins/yahoo";

/**
 * Class to extract additional metadata from a URL. Inspired by [unfurl](https://dfir.blog/introducing-unfurl/)
 */
export class Unfold {
  /**
   * Function to parse a URL string. Will attempt to extract metadata from URL strings such as Google Search, Outlook, etc
   * @returns `Url` object or `UnfoldError`
   */
  public parseUrl(url: string) {
    const data = this.extractUrl(url);
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
    } else if (info.domain.includes("dropbox.com")) {
      const drop = new Dropbox(info);
      drop.parseDropbox();
    } else if (info.domain.includes("search.yahoo.com")) {
      const yahoo = new Yahoo(info);
      yahoo.parseYahoo();
    } else if (info.domain.includes("discord.com")) {
      const disc = new Discord(info);
      disc.parseDiscord();
    } else if (info.port === 8006) {
      const prox = new ProxmoxUrl(info);
      prox.parseProxmox();
    } else if (info.domain.includes("github.com")) {
      const git = new GithubUrl(info);
      git.parseGithub();
    }

    // Check for possible JSON Web Tokens
    for (const query of info.query_pairs) {
      const [ key, ...param ] = query.split("=");
      if (key === undefined) {
        break;
      }
      const payload = param.at(0) ?? "";
      const min_size = 400;
      if (payload.length < min_size) {
        continue;
      }
      detectJsonWebToken(payload, info);
    }

    return info;
  }

  /**
   * Extract data from a URL string
   * @param url URL to parse
   * @returns `Url` object or `UnfoldError`
   */
  private extractUrl(url: string): Url | UnfoldError {
    try {
      // @ts-expect-error: Custom Artemis function
      const url_info: Url = js_url_parse(url);
      url_info.url = url;
      url_info.last_segment = url_info.segments.at(-1) ?? "";
      return url_info;
    } catch (err) {
      return new UnfoldError(
        "URL_PARSE",
        `failed to parse url file ${url}: ${err}`,
      );
    }
  }
}
