import { AxiosRequestConfig, AxiosInstance, AxiosError, AxiosResponse } from 'axios';
export default abstract class WebApi {
    protected constructor();
    private basicRequestConfig;
    getBasicRequestConfig(): AxiosRequestConfig;
    setBasicRequestConfig(basicRequestConfig: AxiosRequestConfig): AxiosRequestConfig;
    private assertion;
    getAxiosInstance(): AxiosInstance;
    requestGet(url: string, config?: AxiosRequestConfig): Promise<any>;
    requestPost(url: string, config?: AxiosRequestConfig): Promise<any>;
    requestPut(url: string, config?: AxiosRequestConfig): Promise<any>;
    requestDelete(url: string, config?: AxiosRequestConfig): Promise<any>;
    protected requestInterceptor(requestConfig: AxiosRequestConfig): AxiosRequestConfig;
    protected responseInterceptor(data: any): any;
    request(requestConfig: AxiosRequestConfig): Promise<any>;
    protected preRequest(requestConfig: AxiosRequestConfig): Promise<{}>;
    protected preRequestErrorHandler(requestConfig: AxiosRequestConfig): AxiosRequestConfig;
    protected afterRequestResolve(res: AxiosResponse): Promise<{}>;
    protected errorHandler(err: AxiosError): any;
}
