import { AxiosRequestConfig, AxiosInstance, AxiosError, AxiosResponse } from 'axios';
export default abstract class WebApi {
    protected constructor();
    private basicRequestConfig;
    private axios;
    getBasicRequestConfig(): AxiosRequestConfig;
    setBasicRequestConfig(basicRequestConfig: AxiosRequestConfig): AxiosRequestConfig;
    private assertion;
    getAxiosInstance(): AxiosInstance;
    requestGet(url: string, config?: AxiosRequestConfig): Promise<any>;
    requestPost(url: string, config?: AxiosRequestConfig): Promise<any>;
    requestPut(url: string, config?: AxiosRequestConfig): Promise<any>;
    requestDelete(url: string, config?: AxiosRequestConfig): Promise<any>;
    protected requestInterceptor(requestConfig: AxiosRequestConfig): AxiosRequestConfig;
    protected responseInterceptor(response: AxiosResponse): any;
    request(requestConfig: AxiosRequestConfig): Promise<any>;
    protected requestErrorHandler(err: AxiosError): any;
}
