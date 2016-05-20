/**
 * Returns the full URL for the given string and params merged with any
 * supplied default params.
 *
 * @param  {string} firebaseURL Firebase DB URL
 * @param  {string} path        Firebase path
 * @param  {Object} params      additional query params (optional)
 * @return {string}             URL to make the request from
 */
export default function urlFor(firebaseURL: string, path: string, params?: Object): string;
