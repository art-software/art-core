import { WebApiMiniProgram } from './WebApiMiniProgram';
export declare abstract class WebApiMiniProgramCommon extends WebApiMiniProgram {
    constructor(domainConfig: object);
    private domainConfig;
    private getEnvName;
    private getPort;
    protected getDomain(): any;
    protected preRequest(requestConfig: wx.RequestOption): Promise<wx.RequestOption>;
}
