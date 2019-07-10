"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebApi_1 = require("../core/WebApi");
const merge_1 = require("art-lib-utils/dist/utils/merge");
class WebApiServer extends WebApi_1.default {
    constructor(config) {
        super();
        this.setBasicRequestConfig(merge_1.default(true, {}, config));
    }
}
exports.default = WebApiServer;
