/* eslint strict: 0 */
'use strict';

jasmine.getEnv().defaultTimeoutInterval = 10000;

const FirebaseREST = require('../../dist/FirebaseREST').default;
const helpers = require('../support/helpers');

function expectSuccessResponse(response) {
  expect(response.status).toEqual(200);
  expect(response.statusText).toEqual('OK');
  expect(response.headers.get('content-type')).toEqual('application/json; charset=utf-8');
  expect(response.ok).toEqual(true);
}

describe('JSONClient', () => {
  const client =
    new FirebaseREST.JSONClient(helpers.FIREBASE_URL, { auth: helpers.FIREBASE_SECRET });

  beforeAll(() => {
    client.put('/', { letters: helpers.LETTERS, greetings: null });
  });

  describe('error', () => {
    const unauthorizedClient = new FirebaseREST.JSONClient(helpers.FIREBASE_URL);
    it('fails', done => {
      unauthorizedClient.get('/').then(response => {
        expect(response.status).toEqual(401);
        expect(response.statusText).toEqual('Unauthorized');
        expect(response.headers.get('content-type')).toEqual('application/json; charset=utf-8');
        expect(response.ok).toEqual(false);
        done();
      });
    });
  });

  describe('#get', () => {
    it('returns the JSON response', done => {
      client.get('/letters').then(response => {
        expectSuccessResponse(response);
        expect(response.body).toEqual(helpers.LETTERS);
        done();
      });
    });
  });

  describe('#put', () => {
    it('returns the JSON response', done => {
      const payload = { hello: 'world' };
      client.put('/greetings', payload).then(response => {
        expectSuccessResponse(response);
        expect(response.body).toEqual(payload);
        done();
      });
    });
  });

  describe('#patch', () => {
    it('returns the JSON response', done => {
      const payload = { hello: 'moon' };
      client.patch('/greetings', payload).then(response => {
        expectSuccessResponse(response);
        expect(response.body).toEqual(payload);
        done();
      });
    });
  });

  describe('#post', () => {
    it('returns the JSON response', done => {
      client.post('/posts', 'message').then(response => {
        expectSuccessResponse(response);
        expect(response.body.name).toMatch(helpers.FIREBASE_PUSH_ID_PATTERN);
        done();
      });
    });
  });

  helpers.describeAlias(client, 'set', 'put');
  helpers.describeAlias(client, 'update', 'patch');
  helpers.describeAlias(client, 'push', 'post');
  helpers.describeAlias(client, 'remove', 'delete');
});
