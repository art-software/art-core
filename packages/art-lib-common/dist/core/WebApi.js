"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("art-lib-utils/dist/utils/lang");
const merge_1 = require("art-lib-utils/dist/utils/merge");
const axios_1 = require("axios");
const HttpMethods_1 = require("art-lib-common/dist/enums/HttpMethods");
class WebApi {
    constructor() {
        this.basicRequestConfig = {};
        this.axios = axios_1.default.create();
        this.axios.interceptors.request.use(this.requestInterceptor.bind(this));
        this.axios.interceptors.response.use(this.responseInterceptor.bind(this));
    }
    getBasicRequestConfig() {
        return this.basicRequestConfig;
    }
    setBasicRequestConfig(basicRequestConfig) {
        this.basicRequestConfig = merge_1.default(true, {}, this.basicRequestConfig, basicRequestConfig);
        return this.basicRequestConfig;
    }
    assertion(target, message, checker) {
        let checkValue = target;
        if (lang_1.isFunction(checker)) {
            checkValue = checker(target);
        }
        if (checkValue === false) {
            throw new Error(message);
        }
    }
    getAxiosInstance() {
        return this.axios;
    }
    requestGet(url, config = {}) {
        config = merge_1.default(true, {}, config, { method: HttpMethods_1.HttpMethods.get, url });
        return this.request(config);
    }
    requestPost(url, config = {}) {
        config = merge_1.default(true, {}, config, { method: HttpMethods_1.HttpMethods.post, url });
        return this.request(config);
    }
    requestPut(url, config = {}) {
        config = merge_1.default(true, {}, config, { method: HttpMethods_1.HttpMethods.put, url });
        return this.request(config);
    }
    requestDelete(url, config = {}) {
        config = merge_1.default(true, {}, config, { method: HttpMethods_1.HttpMethods.delete, url });
        return this.request(config);
    }
    requestInterceptor(requestConfig) {
        return requestConfig;
    }
    responseInterceptor(response) {
        return response;
    }
    request(requestConfig) {
        const finalRequestConfig = merge_1.default(true, {}, this.basicRequestConfig, requestConfig);
        const urlCheck = (checkData) => lang_1.isObject(checkData) && lang_1.isString(checkData.url);
        this.assertion(finalRequestConfig, 'request() http `requestConfig.url` must be providered!', urlCheck);
        return this.axios.request(finalRequestConfig)
            .then((response) => {
            return response;
        })
            .catch(this.requestErrorHandler);
    }
    requestErrorHandler(err) {
        // Do something handling error
    }
}
exports.default = WebApi;
