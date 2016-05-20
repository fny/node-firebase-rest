/// <reference path="../typings/index.d.ts" />
import Client from './FirebaseREST/Client';
import JSONClient from './FirebaseREST/JSONClient';
declare const FirebaseREST: {
    Client: typeof Client;
    JSONClient: typeof JSONClient;
    setPromise: (promiseClass: any) => void;
};
export default FirebaseREST;
