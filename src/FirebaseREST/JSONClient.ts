import Client from './Client';
import JSONResponse from './JSONResponse';

/**
 * Firebase Client that returns promises which resolves into a JSONResponse.
 */
export default class JSONClient {
  private client: Client;
  /**
   * Create a new Firebase Client instance.
   *
   * @param  {string} firebaseURL   URL to the Firebase instance
   * @param  {Object} defaultParams default URL params to pass
   */
  constructor(public firebaseURL: string, public defaultParams?: Object) {
    this.client = new Client(firebaseURL, defaultParams);
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
  get(path: string, params?: Object): Promise<JSONResponse> {
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
  put(path: string, payload: JSON, params?: Object): Promise<JSONResponse> {
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
  patch(path: string, payload: JSON, params?: Object): Promise<JSONResponse> {
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
  post(path: string, payload: JSON, params?: Object): Promise<JSONResponse> {
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
  delete(path: string, params?: Object): Promise<JSONResponse> {
    return asJSONResponsePromise(this.client.delete(path, params));
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
}

function asJSONResponsePromise(responsePromise: Promise<Fetch.Response>): Promise<JSONResponse> {
  var origninalResponse;
  return responsePromise
    .then(res => {
      origninalResponse = res;
      return origninalResponse;
    })
    .then(res => res.json())
    .then(json => new JSONResponse(origninalResponse, json));
}
