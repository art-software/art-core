import WebApi from 'art-lib-common/src/core/WebApi';
import { AxiosRequestConfig } from 'axios';
export default abstract class WebApiH5 extends WebApi {
    constructor(basicRequestConfig: AxiosRequestConfig, domainConfig: object);
    private domainConfig;
    private getEnvName;
    private getPort;
    protected getDomain(): any;
    protected requestInterceptor(requestConfig: AxiosRequestConfig): AxiosRequestConfig;
}
