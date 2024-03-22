import { TimesketchAuth } from "../../types/timesketch/client.ts";
import { TimesketchError } from "./error.ts";
import { BodyType, FollowRedirect, Protocol, request } from "../http/client.ts";
import { HttpError } from "../http/errors.ts";
import { extractUtf8String } from "../encoding/strings.ts";
import {
  TimesketchArtifact,
  TimesketchTimeline,
} from "../../types/timesketch/timeline.ts";
import { encodeBytes } from "../encoding/bytes.ts";
import { timelineArtifact } from "./timeline.ts";

export class Timesketch {
  private timesketch_auth: TimesketchAuth;
  private token: string;
  private cookie: string;
  private timeline_name;

  /**
   * @param auth `TimesketchAuth` object used to authenticate to Timesketch
   * @param name The name that should used for the timeline. If none is provided the artifact name will be used. It is **recommended** to provide a name (ex: the hostname)
   */
  constructor(auth: TimesketchAuth, name = "") {
    this.timesketch_auth = auth;
    this.token = "";
    this.cookie = "";
    this.timeline_name = name;
  }

  /**
   * Function to timeline and upload data to Timesketch
   * @param data Artifact data to Timeline. Must be the type specified by `artifact`
   * @param artifact The the artifact type that should be timeline
   * @returns A `TimesketchError` if the data cannot be timeline or if it failed to upload to Timesketch
   */
  public async timelineAndUpload(
    data: unknown,
    artifact: TimesketchArtifact,
  ): Promise<void | TimesketchError> {
    const timeline_data = timelineArtifact(data, artifact);
    if (timeline_data instanceof TimesketchError) {
      return timeline_data;
    }

    if (timeline_data.length === 0) {
      return new TimesketchError(`ARTIFACT`, `zero values for ${artifact}`);
    }

    // If no token or cookie. We need to logon!
    if (this.token === "" || this.cookie === "") {
      const status = await this.authTimesketch();
      if (status instanceof TimesketchError) {
        return status;
      }
    }

    if (this.timesketch_auth.sketch_id === undefined) {
      console.log("TODO");
      return;
    }

    // Verify user provied a valid Sketch ID
    const id_status = await this.verifySketchId();
    if (id_status instanceof TimesketchError) {
      return id_status;
    }

    return await this.uploadTimeline(timeline_data, artifact);
  }

  private async uploadTimeline(
    data: TimesketchTimeline[],
    artifact: TimesketchArtifact,
  ): Promise<void | TimesketchError> {
    const headers = {
      "X-Csrftoken": this.token,
      "Cookie": this.cookie,
    };

    if (this.timeline_name === "") {
      this.timeline_name = artifact;
    }

    const entries_strings = [];
    // We have to convert the TimesketchTimeline object to a string :/
    for (let i = 0; i < data.length; i++) {
      entries_strings.push(JSON.stringify(data[i]));
    }

    // From: https://github.com/google/timesketch/blob/3c781e6bde4398e24cba7dd41c4f87ba4d6e5394/importer_client/python/timesketch_import_client/importer.py#L249
    const post_data = {
      "name": this.timeline_name,
      "sketch_id": this.timesketch_auth.sketch_id,
      "data_label": artifact,
      "enable_stream": false,
      "provider": "artemis",
      "events": entries_strings.join("\n"),
    };

    const bytes = encodeBytes(JSON.stringify(post_data));
    const response = await request(
      `${this.timesketch_auth.url}/api/v1/upload/`,
      Protocol.POST,
      bytes,
      headers,
      BodyType.FORM,
    );
    if (response instanceof HttpError) {
      return new TimesketchError(
        `UPLOAD`,
        `failed to upload to Timesketch ${response}`,
      );
    }

    if (response.status != 201) {
      return new TimesketchError(
        `UPLOAD`,
        `non-201 response for uploading data ${
          extractUtf8String(new Uint8Array(response.body))
        }`,
      );
    }
  }

  /**
   * Function to verify if provided Sketch ID exists
   * @returns `TimesketchError` if we cannot verify the Sketch ID
   */
  private async verifySketchId(): Promise<void | TimesketchError> {
    const headers = {
      "X-Csrftoken": this.token,
      "Cookie": this.cookie,
    };

    const response = await request(
      `${this.timesketch_auth.url}/api/v1/sketches/${this.timesketch_auth.sketch_id}/`,
      Protocol.GET,
      new Uint8Array(),
      headers,
    );
    if (response instanceof HttpError) {
      return new TimesketchError(
        `SKETCH_ID`,
        `failed to verify Sketch ID ${this.timesketch_auth.sketch_id} ${response}`,
      );
    }

    if (response.status != 200) {
      return new TimesketchError(
        `SKETCH_ID`,
        `non-200 response for verifying Sketch ID ${
          extractUtf8String(new Uint8Array(response.body))
        }`,
      );
    }
    const id_text = extractUtf8String(new Uint8Array(response.body));
    const id_info = JSON.parse(id_text);
    if (id_info["objects"].length === 0) {
      return new TimesketchError(
        `SKETCH_ID`,
        `no Sketch ID associated ${this.timesketch_auth.sketch_id}: ${id_text}`,
      );
    }
  }

  /**
   * Function to authenticate to Timesketch
   * @returns `TimesketchError` if authentication failed
   */
  private async authTimesketch(): Promise<void | TimesketchError> {
    const response = await request(
      `${this.timesketch_auth.url}/login/`,
      Protocol.GET,
    );
    if (response instanceof HttpError) {
      return new TimesketchError(
        `AUTH`,
        `failed to start auth to Timesketch ${response}`,
      );
    }

    const body_text = extractUtf8String(new Uint8Array(response.body));
    // I hope they don't change this much...
    const value_regex = /value=".*"/m;
    const value_token = body_text.match(value_regex);

    // Extract the CSRF Token
    if (typeof value_token?.[0] === "string" && value_token?.[0].length > 50) {
      this.token = value_token?.[0].replaceAll("value=", "").replaceAll(
        '"',
        "",
      );
    }

    // Also need first cookie
    this.cookie = response.headers["set-cookie"].split(";").at(0) ?? "";
    if (this.cookie === "") {
      return new TimesketchError(
        `AUTH`,
        `failed to get Cookie for logon ${response.headers}`,
      );
    }

    // We should be able to auth to Timesketch now!
    const form = {
      "username": this.timesketch_auth.username,
      "password": this.timesketch_auth.password,
      "csrf_token": this.token,
    };
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "referer": this.timesketch_auth.url,
      "Cookie": this.cookie,
    };
    const form_string = JSON.stringify(form);
    const bytes = encodeBytes(form_string);

    // Logon but do not follow the redirect. We need one more cookie
    const auth_response = await request(
      `${this.timesketch_auth.url}/login/`,
      Protocol.POST,
      bytes,
      headers,
      BodyType.FORM,
      FollowRedirect.DISABLE,
    );
    if (auth_response instanceof HttpError) {
      return new TimesketchError(
        `AUTH`,
        `failed to logon and auth to Timesketch ${auth_response}`,
      );
    }

    if (auth_response.status != 302) {
      return new TimesketchError(
        `AUTH`,
        `non-302 response for auth to Timesketch ${
          extractUtf8String(new Uint8Array(auth_response.body))
        }`,
      );
    }

    // Update the cookie so we remain authenticated
    this.cookie = auth_response.headers["set-cookie"].split(";").at(0) ?? "";
    if (this.cookie === "") {
      return new TimesketchError(
        `AUTH`,
        `failed to get last Cookie for logon ${auth_response.headers}`,
      );
    }
  }
}
