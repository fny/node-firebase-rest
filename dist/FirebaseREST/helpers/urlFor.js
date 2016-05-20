"use strict";
const objectToParamString_1 = require('./objectToParamString');
/**
 * Returns the full URL for the given string and params merged with any
 * supplied default params.
 *
 * @param  {string} firebaseURL Firebase DB URL
 * @param  {string} path        Firebase path
 * @param  {Object} params      additional query params (optional)
 * @return {string}             URL to make the request from
 */
function urlFor(firebaseURL, path, params) {
    params = params || {};
    // Strips out multiple `/` as a convenience
    let url = '';
    url += firebaseURL.replace(/\/$/, '');
    url += '/';
    url += path.replace(/^\//, '');
    url += '.json';
    url += objectToParamString_1.default(params);
    return url;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = urlFor;
//# sourceMappingURL=urlFor.js.map