/* eslint strict: 0 */
'use strict';

jasmine.getEnv().defaultTimeoutInterval = 10000;

const FirebaseREST = require('../../dist/FirebaseREST').default;
const helpers = require('../support/helpers');

const client = new FirebaseREST.Client(helpers.FIREBASE_URL, { auth: helpers.FIREBASE_SECRET });

describe('FirebaseREST.Client', () => {
  describe('#get', () => {
    it('returns a Fetch.Response', done => {
      client.put('/hello', 'world')
        .then(() => client.get('/hello'))
        .then(res => {
          expect(res.headers.get('content-type')).toEqual('application/json; charset=utf-8');
          expect(res.status).toEqual(200);
          return res.json();
        })
        .then(json => {
          expect(json).toEqual('world');
        })
        .then(done);
    });

    it('works with query parameters that need to be JSON encoded', done => {
      helpers.loadLetters(client)
        .then(() => client.get('/letters', { orderBy: '$value', limitToFirst: 2 }))
        .then(res => res.json())
        .then((json) => {
          expect(json).toEqual({ a: 1, b: 2 });
        })
        .then(done);
    });
  });

  describe('#put', () => {
    it('writes over any existing data', done => {
      helpers.loadLetters(client)
        .then(() => client.put('/letters', { f: 6 }))
        .then(() => client.get('/letters'))
        .then(res => res.json())
        .then(json => {
          expect(json).toEqual({ f: 6 });
        })
        .then(done);
    });
  });

  describe('#patch', () => {
    it('updates any existing data', done => {
      helpers.loadLetters(client)
        .then(() => client.patch('/letters', { f: 6 }))
        .then(() => client.get('/letters'))
        .then(res => res.json())
        .then(json => {
          expect(json).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 });
        })
        .then(done);
    });
  });

  describe('#post', () => {
    it('works', done => {
      helpers.resetFirebase(client)
        .then(() => client.post('/posts', 1))
        .then(() => client.post('/posts', 2))
        .then(() => client.get('/posts'))
        .then(res => res.json())
        .then(json => {
          const keys = Object.keys(json);
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            expect(json[key]).toEqual(i + 1);
            expect(key).toMatch(helpers.FIREBASE_PUSH_ID_PATTERN);
          }
        })
        .then(done);
    });
  });

  helpers.describeAlias(client, 'set', 'put');
  helpers.describeAlias(client, 'update', 'patch');
  helpers.describeAlias(client, 'push', 'post');
  helpers.describeAlias(client, 'remove', 'delete');
});
