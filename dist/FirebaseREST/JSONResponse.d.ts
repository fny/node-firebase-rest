export default class JSONResponse {
    /**
     * Contains the URL of the response.
     * @type {string}
     */
    url: string;
    /**
     * Contains the status code of the response (e.g., 200 for a success).
     * @type {number}
     */
    status: number;
    /**
     * Contains the status message corresponding to the status code
     * (e.g., OK for 200).
     * @type {string}
     */
    statusText: string;
    /**
     * Contains a boolean stating whether the response was successful (status in
     * the range 200-299) or not.
     * @type {boolean}
     */
    ok: boolean;
    /**
     * Contains the Headers object associated with the response.
     * @type {Fetch.Headers}
     */
    headers: Fetch.Headers;
    /**
     * Parsed response body.
     * @type {JSON}
     */
    body: JSON;
    constructor(response: Fetch.Response, body: JSON);
}
