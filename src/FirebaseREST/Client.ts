import urlFor from './helpers/urlFor';

const fetch = require('node-fetch');

/**
 * Firebase Client that returns promises which resolves into a Fetch Response.
 */
export default class Client {
  /**
   * Create a new Firebase Client instance.
   *
   * @param  {string} firebaseURL   URL to the Firebase instance
   * @param  {Object} defaultParams default URL params to pass
   */
  constructor(public firebaseURL: string, public defaultParams?: Object) {}

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
  get(path: string, params?: Object): Promise<Fetch.Response> {
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
  put(path: string, payload: Object, params?: Object): Promise<Fetch.Response> {
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
  patch(path: string, payload: Object, params?: Object): Promise<Fetch.Response> {
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
  post(path: string, payload: Object, params?: Object): Promise<Fetch.Response> {
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
  delete(path: string, params?: Object): Promise<Fetch.Response> {
    return this.request('DELETE', path, params);
  }

  /**
   * Alias for `#post`.
   * @type {Function}
   */
  public push: Function = this.post;

  /**
   * Alias for `#delete`.
   * @type {Function}
   */
  public remove: Function = this.delete;

  /**
   * Alias for `#put`.
   * @type {Function}
   */
  public set: Function = this.put;

  /**
   * Alias for `#patch`.
   * @type {Function}
   */
  public update: Function = this.patch;

  private request(method: string, path: string, params?: Object, payload?: Object): Promise<any> {
    params = params || {};
    const options: any = { method: method };
    if (payload !== null) {
      options.body = JSON.stringify(payload);
    }
    const mergedParams: Object = Object.assign({}, this.defaultParams);
    Object.assign(mergedParams, params);

    return fetch(urlFor(this.firebaseURL, path, mergedParams), options);
  }
}
