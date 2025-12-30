import { Url } from "../../../types/http/unfold";

/**
 * Class to parse some Github URL info
 */
export class GithubUrl {
    private url: Url;

    constructor (url: Url) {
        this.url = url;
    }

    /**
     * Function attempt to extract Github username and repositories from URL
     * May produce false positives
     */
    public parseGithub() {
        if (this.url.segments.length !== 2 || this.url.query !== "") {
            return;
        }

        const username = this.url.segments.at(0) ?? "";
        // Some common URIs in Github that cannot be usernames
        const github_uris = [ "security", "features", "resources", "enterprise", "solutions", "sponsors", "readme", "partners" ];
        if (github_uris.includes(username)) {
            return;
        }
        this.url[ "username" ] = this.url.segments.at(0) ?? "";
        this.url[ "repository" ] = this.url.segments.at(1) ?? "";

    }
}