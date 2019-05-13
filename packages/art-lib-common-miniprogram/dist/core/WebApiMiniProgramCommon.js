import { WebApiMiniProgram } from './WebApiMiniProgram';
import { getQueryString } from 'art-lib-utils-wx/dist/utils/urlWxMiniprogram';
import { EnvNames } from '../enums/EnvNames';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
export class WebApiMiniProgramCommon extends WebApiMiniProgram {
    constructor(domainConfig) {
        super();
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
        if (port) {
            domain = `${domain}:${port}`;
        }
        return domain || '';
    }
    preRequest(requestConfig) {
        return new Promise((resolve) => {
            const urlPath = ensureSlash(requestConfig.url, false);
            const domain = ensureSlash(this.getDomain(), false);
            requestConfig.url = domain + urlPath;
            resolve(requestConfig);
        });
    }
}
