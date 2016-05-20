export default class JSONResponse {
  /**
   * Contains the URL of the response.
   * @type {string}
   */
  public url: string;

  /**
   * Contains the status code of the response (e.g., 200 for a success).
   * @type {number}
   */
  public status: number;

  /**
   * Contains the status message corresponding to the status code
   * (e.g., OK for 200).
   * @type {string}
   */
  public statusText: string;

  /**
   * Contains a boolean stating whether the response was successful (status in
   * the range 200-299) or not.
   * @type {boolean}
   */
  public ok: boolean;

  /**
   * Contains the Headers object associated with the response.
   * @type {Fetch.Headers}
   */
  public headers: Fetch.Headers;

  /**
   * Parsed response body.
   * @type {JSON}
   */
  public body: JSON;

  constructor(response: Fetch.Response, body: JSON) {
    this.url = response.url;
    this.status = response.status;
    this.statusText = response.statusText;
    this.ok = response.ok
    this.headers = response.headers
    this.body = body;
  }
}
