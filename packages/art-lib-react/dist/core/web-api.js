var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import { isPlainObject, isFunction, isObject, isString } from '../utils/lang';
import merge from '../utils/merge';
import promisify from '../utils/promisify';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
import { appendUrlParameter } from '../utils/url';
const apiDefaultConfig = {
    // https://github.com/mzabriskie/axios
    // `headers` are custom headers to be sent
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
};
export default class WebApi {
    constructor(baseData = {}, config = {}) {
        // public monitorService() {
        // }
        this.interceptorExceptionDto = (_a, err) => {
            var { resolve } = _a, options = __rest(_a, ["resolve"]);
            // if (isObject(this.monitorService) && isFunction(this.monitorService.interceptorException)) {
            //   this.monitorService.interceptorException.call(this, options, err);
            // }
            resolve(err);
        };
        /**
         * api response拦截器，可以在子类中overwrite
         */
        this.interceptorDto = (_a, result) => {
            var { resolve } = _a, options = __rest(_a, ["resolve"]);
            // if (isObject(this.monitorService) && isFunction(this.monitorService.interceptorException)) {
            //   this.monitorService.interceptorException.call(this, options, err);
            // }
            resolve(result.data);
        };
        this.baseData = baseData;
        this.apiConfig = merge(true, {}, apiDefaultConfig, config);
    }
    /**
     * override it in inherited class
     * @param requestService
     */
    setRequestService(requestService) {
        this.requestService = requestService;
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
    requestPost(url, config = {}) {
        return this.request('POST', url, config);
    }
    requestGet(url, config = {}) {
        return this.request('GET', url, config);
    }
    request(method, url, config = {}) {
        const inputRawData = this.adjustParameter(url, config);
        return this.preRequest(inputRawData).then((inputData) => {
            this.assertion(inputData, 'request() http `inputData.url` must be providered!', (checkData) => isObject(checkData) && isString(checkData.url));
            return this.requestService[method](inputData.url, inputData.data, inputData.config).then((result) => {
                return promisify(this.interceptorDto)({ requestData: inputData }, result)
                    .then((newResult) => {
                    // 业务代码中定义的dto
                    return inputData.dto.call(this, newResult);
                });
            });
        }).catch(this.requestErrorHandler(inputRawData));
    }
    getReqData(data) {
    }
    requestErrorHandler(inputData) {
        return (catchErr) => {
            return promisify(this.interceptorExceptionDto)({ requestData: inputData }, catchErr)
                .then((err) => { throw err; });
        };
    }
    adjustParameter(url = '', config = {}) {
        let dto = (result) => {
            return result;
        };
        let data = {};
        if (isPlainObject(config.data)) {
            data = config.data || {};
            delete config.data;
        }
        if (isFunction(config.dto)) {
            dto = config.dto || dto;
            delete config.dto;
        }
        url = ensureSlash(this.getDomainApi(), false) + ensureSlash(url, false);
        if (isPlainObject(config.query)) {
            const query = config.query;
            for (const prop in query) {
                url = appendUrlParameter(prop, query[prop], url);
            }
        }
        config = merge(true, {}, this.apiConfig, config);
        return { url, data, dto, config };
    }
    getDomainApi() {
        throw new Error('please override `getDomainApi()` in your service');
    }
    preRequest(inputData) {
        return this.promiseResult(inputData);
    }
    promiseResult(data) {
        return promisify(({ resolve }) => resolve(data))({}, []);
    }
}
