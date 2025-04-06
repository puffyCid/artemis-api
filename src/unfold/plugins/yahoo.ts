import { Url } from "../../../types/http/unfold";

export class Yahoo {
    private url: Url;

    constructor (url: Url) {
        this.url = url;
    }

    /**
     * Function to extract Yahoo search queries
     * https://github.com/obsidianforensics/unfurl/blob/main/unfurl/parsers/parse_yahoo.py
     */
    public parseYahoo() {
        for (const entry of this.url.query_pairs) {
            const [ key, ...param ] = entry.split("=");
            const value = param.join("=");
            switch (key.toLowerCase()) {
                case "p": {
                    this.url[ "search_query" ] = value;
                    break;
                }
                case "fr": {
                    this.url[ "fr" ] = value;
                    break;
                }
                case "fr2": {
                    this.url[ "fr2" ] = value;
                    break;
                }
                case "fp": {
                    this.url[ "fp" ] = value;
                    break;
                }
                default: {
                    console.warn(
                        `unknown yahoo key: ${key}. Value: ${value}`,
                    );
                    this.url[ key ] = value;
                    break;
                }
            }
        }
    }
}