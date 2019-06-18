import merge from 'art-lib-utils/dist/utils/merge';
import { isFunction, isObject, isString } from 'art-lib-utils/dist/utils/lang';
import { HttpMethods } from '../enums/HttpMethods';
export class WebApiMiniProgram {
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
    requestGet(url, config) {
        const newConfig = merge(true, {}, config, { url, method: HttpMethods.GET });
        return this.request(newConfig);
    }
    requestPost(url, config) {
        const newConfig = merge(true, {}, config, { url, method: HttpMethods.POST });
        return this.request(newConfig);
    }
    requestPut(url, config) {
        const newConfig = merge(true, {}, config, { url, method: HttpMethods.PUT });
        return this.request(newConfig);
    }
    requestDelete(url, config) {
        const newConfig = merge(true, {}, config, { url, method: HttpMethods.DELETE });
        return this.request(newConfig);
    }
    request(requestConfig) {
        const mergedRequestConfig = merge(true, {}, this.basicRequestConfig, requestConfig);
        const urlCheck = (checkData) => isObject(checkData) && isString(checkData.url);
        this.assertion(mergedRequestConfig, 'request() http `requestConfig.url` must be providered!', urlCheck);
        return this.preRequest(mergedRequestConfig)
            .then((config) => {
            const { dto } = config;
            return this.requestPromise(config)
                .then((res) => {
                return this.afterRequestResolve(res).then(dto);
            })
                .catch(this.requestErrorHandler);
        })
            .catch(this.preRequestErrorHandler);
    }
    requestPromise(requestConfig) {
        return new Promise((resolve, reject) => {
            requestConfig = merge(true, {}, {
                success: (res) => {
                    resolve(res);
                },
                fail: (res) => {
                    reject(res);
                }
            }, requestConfig);
            delete requestConfig.dto;
            delete requestConfig.query;
            wx.request(requestConfig);
        });
    }
    preRequest(requestConfig) {
        return new Promise((resolve) => {
            resolve(requestConfig);
        });
    }
    preRequestErrorHandler(err) {
        return err;
    }
    afterRequestResolve(res) {
        return new Promise((resolve) => {
            return resolve(res);
        });
    }
    requestErrorHandler(err) {
        return err;
    }
}
