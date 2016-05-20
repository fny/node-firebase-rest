declare function Fetch(url: any | Fetch.Request, opts?: Object): Promise<Fetch.Response>;

declare interface Fetch {
  isRedirect(code: number): boolean;
}

interface Body {
  json(): Promise<JSON>;
  text(): Promise<string>;
}

declare namespace Fetch {
  interface Headers {
    constructor(headers: Object);

    get(name: String): any;
    getAll(name: String): Array<any>;
    forEach(callback: Function, thisArg: any);

  }

  interface Response extends Body {
    url: string;
    status: number;
    statusText: string;
    headers: Headers;
    ok: boolean;

    constructor(body: any, opts?: Object);
    clone(): Response;
  }

  interface Request extends Body {
    method: string;
    redirect: string;
    headers: Headers;
    url: string;
    follow: number;
    compress: boolean;
    counter: number;
    agent: string;
    protocol: string;
    hostname: string;
    path: string;
    auth: string;

    constructor(input: string | Request, init?: Object)
    clone(): Request;
  }
}
