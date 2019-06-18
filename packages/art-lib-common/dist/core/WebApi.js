import { isFunction, isObject, isString } from 'art-lib-utils/dist/utils/lang';
import merge from 'art-lib-utils/dist/utils/merge';
import axios from 'axios';
import { HttpMethods } from 'art-lib-common/src/enums/HttpMethods';
export default class WebApi {
    constructor() {
        this.basicRequestConfig = {};
        this.axios = axios.create();
        this.axios.interceptors.request.use(this.requestInterceptor.bind(this));
        this.axios.interceptors.response.use(this.responseInterceptor.bind(this));
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
    getAxiosInstance() {
        return this.axios;
    }
    requestGet(url, config = {}) {
        config = merge(true, {}, config, { method: HttpMethods.get, url });
        return this.request(config);
    }
    requestPost(url, config = {}) {
        config = merge(true, {}, config, { method: HttpMethods.post, url });
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
    responseInterceptor(response) {
        return response;
    }
    request(requestConfig) {
        const finalRequestConfig = merge(true, {}, this.basicRequestConfig, requestConfig);
        const urlCheck = (checkData) => isObject(checkData) && isString(checkData.url);
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
