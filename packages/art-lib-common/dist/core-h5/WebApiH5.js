import WebApi from 'art-lib-common/src/core/WebApi';
import { getQueryString } from 'art-lib-utils/dist/utils/url';
import { EnvNames } from '../enums/EnvNames';
export default class WebApiH5 extends WebApi {
    constructor(domainConfig) {
        super();
        this.domainConfig = domainConfig;
        this.setBasicRequestConfig({
            baseURL: this.getDomain()
        });
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
}
