/**
 * Firebase params that need to be JSON encoded
 * @type {[String]}
 */
const FIREBASE_JSON_PARAMS =
  ['orderBy', 'startAt', 'endAt', 'equalTo'];

export default function objectToParamString(object : Object): string {
  const joinedParams =
    Object.keys(object).map(key => {
      if (FIREBASE_JSON_PARAMS.indexOf(key) > -1) {
        return `${key}=${JSON.stringify(object[key])}`
      } else {
        return `${key}=${object[key]}`
      }
    }).join('&');
  return joinedParams === '' ? '' : `?${joinedParams}`;
}
