import { isPlainObject, isFunction } from '../utils/lang';
import merge from '../utils/merge';
const apiDefaultConfig = {};
export default class WebApi {
    constructor(baseData = {}, config = {}) {
        this.baseData = baseData;
        this.apiConfig = merge(true, {}, apiDefaultConfig, config);
    }
    request(method, url, data = {}, config = {}) {
        const inputRawData = this.adjustParameter(url, data, config);
    }
    adjustParameter(url, data = {}, config) {
        if (isPlainObject(url)) {
            config = data;
            data = url;
            url = this.getDomainApi();
        }
        let dto = (result) => {
            return result;
        };
        if (isFunction(config)) {
            dto = config;
            config = {};
        }
        else if (isPlainObject(config)) {
            if (isFunction(config.dto)) {
                dto = config.dto;
                delete config.dto;
            }
        }
        else {
            config = {};
        }
        config = merge(true, {}, this.apiConfig, config);
        return { url, data, dto, config };
    }
    getDomainApi() {
        throw new Error('please override `getDomainApi()` in your service');
    }
    preRequest(inputData) {
    }
}
