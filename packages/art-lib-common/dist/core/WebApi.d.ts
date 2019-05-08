import { AxiosRequestConfig, AxiosInstance, AxiosPromise, AxiosError } from 'axios';
export default abstract class WebApi {
    protected constructor();
    private basicRequestConfig;
    getBasicRequestConfig(): AxiosRequestConfig;
    setBasicRequestConfig(basicRequestConfig: AxiosRequestConfig): AxiosRequestConfig;
    private assertion;
    getInstance(): AxiosInstance;
    requestGet(url: string, config?: AxiosRequestConfig): AxiosPromise<{}>;
    requestPost(url: string, config?: AxiosRequestConfig): AxiosPromise<{}>;
    requestPut(url: string, config?: AxiosRequestConfig): AxiosPromise<{}>;
    requestDelete(url: string, config?: AxiosRequestConfig): AxiosPromise<{}>;
    protected requestInterceptor(requestConfig: AxiosRequestConfig): AxiosRequestConfig;
    protected responseInterceptor(data: any): any;
    request<T>(requestConfig: AxiosRequestConfig): AxiosPromise<T>;
    protected errorHandler(err: AxiosError): any;
}
