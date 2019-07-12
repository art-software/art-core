"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebApi_1 = require("art-lib-common/src/core/WebApi");
const url_1 = require("art-lib-utils/dist/utils/url");
const EnvNames_1 = require("../enums/EnvNames");
class WebApiH5 extends WebApi_1.default {
    constructor(domainConfig) {
        super();
        this.domainConfig = domainConfig;
        this.setBasicRequestConfig({
            baseURL: this.getDomain()
        });
    }
    getEnvName() {
        return url_1.getQueryString('env') || EnvNames_1.EnvNames.prod;
    }
    getPort() {
        return url_1.getQueryString('port') || '';
    }
    getDomain() {
        const envName = this.getEnvName();
        const port = this.getPort();
        let domain = this.domainConfig[envName] || '';
        if (port) {
            domain = `${domain}:${port}`;
        }
        return domain || '';
    }
}
exports.default = WebApiH5;
