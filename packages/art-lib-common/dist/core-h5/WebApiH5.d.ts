import WebApi from 'art-lib-common/src/core/WebApi';
export default abstract class WebApiH5 extends WebApi {
    constructor(domainConfig: object);
    private domainConfig;
    protected getEnvName(): string;
    protected getPort(): string;
    protected getDomain(): any;
}
