import WebApi from 'art-lib-common/src/core/WebApi';
import { getQueryString } from 'art-lib-utils/dist/utils/url';
import { EnvNames } from '../enums/EnvNames';
export default class WebApiH5 extends WebApi {
    constructor(basicRequestConfig, domainConfig) {
        super(basicRequestConfig);
        this.domainConfig = domainConfig;
    }
    getEnvName() {
        return getQueryString('env') || EnvNames.prod;
    }
    getPort() {
        return getQueryString('port') || '';
    }
    getDomain() {
        const envName = this.getEnvName();
        const port = this.getPort();
        let domain = this.domainConfig[envName] || '';
        if (port && envName !== EnvNames.local) {
            domain = `${domain}:${port}`;
        }
        return domain || '';
    }
    requestInterceptor(requestConfig) {
        requestConfig.baseURL = this.getDomain();
        return requestConfig;
    }
}
