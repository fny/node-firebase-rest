/**
 * Firebase Client that returns promises which resolves into a Fetch Response.
 */
export default class Client {
    firebaseURL: string;
    defaultParams: Object;
    /**
     * Create a new Firebase Client instance.
     *
     * @param  {string} firebaseURL   URL to the Firebase instance
     * @param  {Object} defaultParams default URL params to pass
     */
    constructor(firebaseURL: string, defaultParams?: Object);
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
    get(path: string, params?: Object): Promise<Fetch.Response>;
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
    put(path: string, payload: Object, params?: Object): Promise<Fetch.Response>;
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
    patch(path: string, payload: Object, params?: Object): Promise<Fetch.Response>;
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
    post(path: string, payload: Object, params?: Object): Promise<Fetch.Response>;
    /**
     * Delete data from Firebase at the supplied path. A successful DELETE request
     * will be indicated by a 200 OK HTTP status code with a response containing
     * JSON null.
     *
     * @param  {string}                  path    Firebase path
     * @param  {Object}                  params  additional query params (optional)
     * @return {Promise<Fetch.Response>}         Promise with the HTTP response
     */
    delete(path: string, params?: Object): Promise<Fetch.Response>;
    /**
     * Alias for `#post`.
     * @type {Function}
     */
    push: Function;
    /**
     * Alias for `#delete`.
     * @type {Function}
     */
    remove: Function;
    /**
     * Alias for `#put`.
     * @type {Function}
     */
    set: Function;
    /**
     * Alias for `#patch`.
     * @type {Function}
     */
    update: Function;
    private request(method, path, params?, payload?);
}
