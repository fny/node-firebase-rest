"use strict";
const Client_1 = require('./Client');
const JSONResponse_1 = require('./JSONResponse');
/**
 * Firebase Client that returns promises which resolves into a JSONResponse.
 */
class JSONClient {
    /**
     * Create a new Firebase Client instance.
     *
     * @param  {string} firebaseURL   URL to the Firebase instance
     * @param  {Object} defaultParams default URL params to pass
     */
    constructor(firebaseURL, defaultParams) {
        this.firebaseURL = firebaseURL;
        this.defaultParams = defaultParams;
        /**
         * Alias for `#post`.
         * @type {Function}
         */
        this.push = this.post;
        /**
         * Alias for `#delete`.
         * @type {Function}
         */
        this.remove = this.delete;
        /**
         * Alias for `#put`.
         * @type {Function}
         */
        this.set = this.put;
        /**
         * Alias for `#patch`.
         * @type {Function}
         */
        this.update = this.patch;
        this.client = new Client_1.default(firebaseURL, defaultParams);
    }
    /**
     * Read data from Firebase as an HTTP Response by issuing a GET request.
     *
     * A successful request will be indicated by a 200 OK HTTP status code.
     * The response body will contain the data being retrieved.
     *
     * @param  {string}                  path   Firebase path
     * @param  {Object}                  params additional query params (optional)
     * @return {Promise<JSONResponse>}          Promise with the JSON response
     */
    get(path, params) {
        return asJSONResponsePromise(this.client.get(path, params));
    }
    /**
     * Write data to Firebase. Note this will overwrite everything at the supplied
     * path.
     *
     * A successful request will be indicated by a 200 OK HTTP status code. The
     * response will contain the data written.
     *
     * @param  {string}                  path    Firebase path
     * @param  {JSON}                    payload Data to write
     * @param  {Object}                  params  additional query params (optional)
     * @return {Promise<JSONResponse>}           Promise with the JSON response
     */
    put(path, payload, params) {
        return asJSONResponsePromise(this.client.put(path, payload, params));
    }
    /**
     * Update data in Firebase. We can update specific children at a location
     * without overwriting existing data using a PATCH request. Named children in
     * the data being written with PATCH will be overwritten, but omitted children
     * will not be deleted. This is equivalent to the JavaScript `update()`
     * function.
     *
     * A successful request will be indicated by a 200 OK HTTP status code. The
     * response will contain the data written.
     *
     * @param  {string}                  path    Firebase path
     * @param  {JSON}                    payload Data to write
     * @param  {Object}                  params  additional query params (optional)
     * @return {Promise<JSONResponse>}           Promise with the JSON response
     */
    patch(path, payload, params) {
        return asJSONResponsePromise(this.client.patch(path, payload, params));
    }
    /**
     * Push data to Firebase. This accomplishes the equivalent of the JavaScript
     * `push()` method which adds to a list of data. Every time you call `push()`,
     * Firebase generates a unique ID.
     *
     * A successful request will be indicated by a 200 OK HTTP status code. The
     * response will contain the child name of the new data that was added.
     *
     * @param  {string}                  path    Firebase path
     * @param  {JSON}                    payload Data to write
     * @param  {Object}                  params  additional query params (optional)
     * @return {Promise<JSONResponse>}           Promise with the JSON response
     */
    post(path, payload, params) {
        return asJSONResponsePromise(this.client.post(path, payload, params));
    }
    /**
     * Delete data from Firebase at the supplied path. A successful DELETE request
     * will be indicated by a 200 OK HTTP status code with a response containing
     * JSON null.
     *
     * @param  {string}                  path    Firebase path
     * @param  {Object}                  params  additional query params (optional)
     * @return {Promise<JSONResponse>}           Promise with the JSON response
     */
    delete(path, params) {
        return asJSONResponsePromise(this.client.delete(path, params));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JSONClient;
function asJSONResponsePromise(responsePromise) {
    var origninalResponse;
    return responsePromise
        .then(res => {
        origninalResponse = res;
        return origninalResponse;
    })
        .then(res => res.json())
        .then(json => new JSONResponse_1.default(origninalResponse, json));
}
//# sourceMappingURL=JSONClient.js.map