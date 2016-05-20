# Firebase REST Client for Node :fire:

[![Build Status](https://travis-ci.org/fny/node-firebase-rest.svg?branch=master)](https://travis-ci.org/fny/node-firebase-rest) [![npm version](https://badge.fury.io/js/firebase-rest.svg)](http://badge.fury.io/js/firebase-rest) [![Dependencies](https://david-dm.org/fny/node-firebase-rest.svg)](https://david-dm.org/fny/node-firebase-rest)

 - We make requests with the [HTTP Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) via [node-fetch](https://www.npmjs.com/package/node-fetch)
 - You can bring your own Promise library by calling `FirebaseREST.setPromise(Promise)`

## Installation

```
npm install firebase-rest --save
```

## Usage

```javascript
// Don't forget `.default` at the end! (We use ES6 modules from the future.)
const FirebaseREST = require('firebase-rest').default;
```

Instantiate a either the `FirebaseREST.JSONClient` or the `FirebaseREST.Client`, and start making calls. What's the difference?

 - `JSONClient` promises an HTTP fetch response where the `#body` is parsed JSON
 - `Client` promises a raw HTTP fetch response according to the standard

Confused yet? This `#get` example should make the difference clear:

```javascript
var standardClient =
  new FirebaseREST.Client('https://app.firebaseio.com', { auth: 'SECRET' });
var jsonClient =
  new FirebaseREST.JSONClient('https://app.firebaseio.com', { auth: 'SECRET' });

standardClient.get('/')
  .then(res => res.json())
  .then(json => /* do something with the json */)

jsonClient.get('/')
  .then(res => /* do something with the res.body */)
```

If you're still confused, see "`Client` vs `JSONClient`" below for a deep dive.

You make the following requests with either client:

```javascript
// Reading data (GET)
client.get('/path');
client.get('/path', additionalQueryParams);

// Writing data (PUT)
client.put('/path', payload);
client.put('/path', payload, additionalQueryParams);

// Updating data (PATCH)
client.patch('/path', payload);
client.patch('/path', payload, additionalQueryParams);

// Pushing data (POST)
client.post('/path', payload);
client.post('/path', payload, additionalQueryParams);

// Removing data (DELETE)
client.delete('/path');
client.delete('/path', additionalQueryParams);
```

 - `additionalQueryParams`: Additional URL params to merge with the default params provided (e.g. `{ orderBy: '$value', limitToFirst: 2 }`, `{ shallow: true }`.)
 - `'/path'`: Path to a part your DB, no `/` required.
 - `payload`: Object to write to Firebase

`FirebaseREST` also provides aliases to match the semantics of the official Firebase JavaScript library:

```javascript
client.set === client.put;       // =>  true
client.update === client.patch;  // =>  true
client.push === client.post;     // =>  true
client.remove === client.delete; // =>  true
```

## `Client` vs `JSONClient`

You can see the differences when comparing two GET requests. TLDR, you probably want to use `JSONClient`: it's supremely convenient.

```javascript
//
// Standard Client
//

var responsePromise = client.get('/').then(res).then(console.log)
// => Body {
//   url: 'https://app.firebaseio.com/.json?auth=SECRET',
//   status: 200,
//   statusText: 'OK',
//   headers: Headers { ... },
//   ok: true,
//   body: PassThrough { ... },
//   ... }
responsePromise.then(res => res.json()).then(console.log)
// => { db: 'contents' }

//
// JSON Client
//

jsonClient.get('/').then(console.log)
// => JSONResponse {
//   url: 'https://app.firebaseio.com/.json?auth=SECRET',
//   status: 200,
//   statusText: 'OK',
//   headers: Headers { ... },
//   ok: true
//   body:
//    { db: 'contents' }
```

## More Documentation and Examples

See the source and the specs. There be hidden treasure.
