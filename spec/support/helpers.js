require('dotenv').config({ silent: true });

const helpers = {
  resetFirebase: client => {
    return client.delete('/');
  },
  loadLetters: client => {
    return client.put('/letters', helpers.LETTERS);
  },
  describeAlias: (client, alias, original) => {
    describe(`#${alias}`, () => {
      it(`aliases #${original}`, () => {
        expect(client[alias]).toEqual(client[original]);
      });
    });
  },
  LETTERS: { a: 1, b: 2, c: 3, d: 4, e: 5 },
  FIREBASE_URL: process.env.FIREBASE_URL,
  FIREBASE_SECRET: process.env.FIREBASE_SECRET,
  FIREBASE_PUSH_ID_PATTERN: /^[a-zA-Z0-9_-]+$/,
};

module.exports = helpers;
