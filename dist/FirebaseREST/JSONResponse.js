"use strict";
class JSONResponse {
    constructor(response, body) {
        this.url = response.url;
        this.status = response.status;
        this.statusText = response.statusText;
        this.ok = response.ok;
        this.headers = response.headers;
        this.body = body;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JSONResponse;
//# sourceMappingURL=JSONResponse.js.map