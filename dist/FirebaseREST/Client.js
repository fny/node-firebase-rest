"use strict";
const urlFor_1 = require('./helpers/urlFor');
const fetch = require('node-fetch');
/**
 * Firebase Client that returns promises which resolves into a Fetch Response.
 */
class Client {
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
    }
    /**
     * Read data from Firebase as an HTTP Response by issuing a GET request.
     *
     * A successful request will be indicated by a 200 OK HTTP status code.
     * The response body will contain the data being retrieved.
     *
     * @param  {string}                  path   Firebase path
     * @param  {Object}                  params additional query params (optional)
     * @return {Promise<Fetch.Response>}        Promise with the HTTP response
     */
    get(path, params) {
        return this.request('GET', path, params);
    }
    /**
     * Write data to Firebase. Note this will overwrite everything at the supplied
     * path.
     *
     * A successful request will be indicated by a 200 OK HTTP status code. The
     * response will contain the data written.
     *
     * @param  {string}                  path    Firebase path
     * @param  {Object}                  payload Data to write
     * @param  {Object}                  params  additional query params (optional)
     * @return {Promise<Fetch.Response>}         Promise with the HTTP response
     */
    put(path, payload, params) {
        return this.request('PUT', path, params, payload);
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
     * @param  {Object}                  payload Data to write
     * @param  {Object}                  params  additional query params (optional)
     * @return {Promise<Fetch.Response>}         Promise with the HTTP response
     */
    patch(path, payload, params) {
        return this.request('PATCH', path, params, payload);
    }
    /**
     * Push data to Firebase. This accomplishes the equivalent of the JavaScript
     * `push()` method wich adds to a list of data. Every time you call `push()`,
     * Firebase generates a unique ID.
     *
     * A successful request will be indicated by a 200 OK HTTP status code. The
     * response will contain the child name of the new data that was added.
     *
     * @param  {string}                  path    Firebase path
     * @param  {Object}                  payload Data to write
     * @param  {Object}                  params  additional query params (optional)
     * @return {Promise<Fetch.Response>}         Promise with the HTTP response
     */
    post(path, payload, params) {
        return this.request('POST', path, params, payload);
    }
    /**
     * Delete data from Firebase at the supplied path. A successful DELETE request
     * will be indicated by a 200 OK HTTP status code with a response containing
     * JSON null.
     *
     * @param  {string}                  path    Firebase path
     * @param  {Object}                  params  additional query params (optional)
     * @return {Promise<Fetch.Response>}         Promise with the HTTP response
     */
    delete(path, params) {
        return this.request('DELETE', path, params);
    }
    request(method, path, params, payload) {
        params = params || {};
        const options = { method: method };
        if (payload !== null) {
            options.body = JSON.stringify(payload);
        }
        const mergedParams = Object.assign({}, this.defaultParams);
        Object.assign(mergedParams, params);
        return fetch(urlFor_1.default(this.firebaseURL, path, mergedParams), options);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Client;
//# sourceMappingURL=Client.js.map