declare type PartialRequestOption = Partial<wx.RequestOption>;
interface BasicRequestOption extends PartialRequestOption {
    dto?: (result: any) => any;
    query?: {
        [key: string]: string;
    };
}
export declare abstract class WebApiMiniProgram {
    private basicRequestConfig;
    getBasicRequestConfig(): BasicRequestOption;
    setBasicRequestConfig(basicRequestConfig: BasicRequestOption): BasicRequestOption;
    private assertion;
    requestGet(url: string, config: BasicRequestOption): Promise<any>;
    requestPost(url: string, config: BasicRequestOption): Promise<any>;
    requestPut(url: string, config: BasicRequestOption): Promise<any>;
    requestDelete(url: string, config: BasicRequestOption): Promise<any>;
    request(requestConfig: BasicRequestOption): Promise<any>;
    protected requestPromise(requestConfig: BasicRequestOption): Promise<any>;
    protected preRequest(requestConfig: BasicRequestOption): Promise<BasicRequestOption>;
    protected preRequestErrorHandler(err: any): any;
    protected afterRequestResolve(res: wx.RequestSuccessCallbackResult): Promise<wx.RequestSuccessCallbackResult>;
    protected requestErrorHandler(err: any): any;
}
export {};
