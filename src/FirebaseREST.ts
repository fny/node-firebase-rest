/// <reference path="../typings/index.d.ts"/>

import Client from './FirebaseREST/Client';
import JSONClient from './FirebaseREST/JSONClient';
const fetch = require('node-fetch');

const FirebaseREST = {
  Client: Client,
  JSONClient: JSONClient,
  setPromise: function(promiseClass): void {
    fetch.Promise = promiseClass;
  }
};

export default FirebaseREST;
