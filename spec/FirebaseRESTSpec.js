/* eslint strict: 0 */
'use strict';

const FirebaseREST = require('../dist/FirebaseREST.js').default;

describe('FirebaseREST', () => {
  it('has two callable modules', () => {
    expect(FirebaseREST.Client).toBeDefined();
    expect(FirebaseREST.JSONClient).toBeDefined();
  });
});
