/// <reference path="../typings/index.d.ts"/>
"use strict";
const Client_1 = require('./FirebaseREST/Client');
const JSONClient_1 = require('./FirebaseREST/JSONClient');
const fetch = require('node-fetch');
const FirebaseREST = {
    Client: Client_1.default,
    JSONClient: JSONClient_1.default,
    setPromise: function (promiseClass) {
        fetch.Promise = promiseClass;
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FirebaseREST;
//# sourceMappingURL=FirebaseREST.js.map