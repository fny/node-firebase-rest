import JSONResponse from './JSONResponse';
/**
 * Firebase Client that returns promises which resolves into a JSONResponse.
 */
export default class JSONClient {
    firebaseURL: string;
    defaultParams: Object;
    private client;
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
     * @return {Promise<JSONResponse>}          Promise with the JSON response
     */
    get(path: string, params?: Object): Promise<JSONResponse>;
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
    put(path: string, payload: JSON, params?: Object): Promise<JSONResponse>;
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
    patch(path: string, payload: JSON, params?: Object): Promise<JSONResponse>;
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
    post(path: string, payload: JSON, params?: Object): Promise<JSONResponse>;
    /**
     * Delete data from Firebase at the supplied path. A successful DELETE request
     * will be indicated by a 200 OK HTTP status code with a response containing
     * JSON null.
     *
     * @param  {string}                  path    Firebase path
     * @param  {Object}                  params  additional query params (optional)
     * @return {Promise<JSONResponse>}           Promise with the JSON response
     */
    delete(path: string, params?: Object): Promise<JSONResponse>;
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
}
