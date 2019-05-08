import { isFunction, isObject, isString } from 'art-lib-utils/dist/utils/lang';
import merge from 'art-lib-utils/dist/utils/merge';
import axios from 'axios';
import { HttpMethods } from 'art-lib-common/src/enums/HttpMethods';
export default class WebApi {
    constructor() {
        this.basicRequestConfig = {};
    }
    getBasicRequestConfig() {
        return this.basicRequestConfig;
    }
    setBasicRequestConfig(basicRequestConfig) {
        this.basicRequestConfig = merge(true, {}, this.basicRequestConfig, basicRequestConfig);
        return this.basicRequestConfig;
    }
    assertion(target, message, checker) {
        let checkValue = target;
        if (isFunction(checker)) {
            checkValue = checker(target);
        }
        if (checkValue === false) {
            throw new Error(message);
        }
    }
    getInstance() {
        return axios;
    }
    requestGet(url, config = {}) {
        config = merge(true, {}, config, { method: HttpMethods.post, url });
        return this.request(config);
    }
    requestPost(url, config = {}) {
        config = merge(true, {}, config, { method: HttpMethods.get, url });
        return this.request(config);
    }
    requestPut(url, config = {}) {
        config = merge(true, {}, config, { method: HttpMethods.put, url });
        return this.request(config);
    }
    requestDelete(url, config = {}) {
        config = merge(true, {}, config, { method: HttpMethods.delete, url });
        return this.request(config);
    }
    requestInterceptor(requestConfig) {
        return requestConfig;
    }
    responseInterceptor(data) {
        return data;
    }
    request(requestConfig) {
        const finalRequestConfig = merge(true, {}, this.basicRequestConfig, requestConfig);
        const urlCheck = (checkData) => isObject(checkData) && isString(checkData.url);
        this.assertion(finalRequestConfig, 'request() http `requestConfig.url` must be providered!', urlCheck);
        axios.interceptors.request.use(this.requestInterceptor);
        axios.interceptors.response.use(this.responseInterceptor);
        return axios.request(finalRequestConfig)
            .then((response) => {
            return response;
        })
            .catch(this.errorHandler);
    }
    errorHandler(err) {
        // Do something handling error
    }
}
