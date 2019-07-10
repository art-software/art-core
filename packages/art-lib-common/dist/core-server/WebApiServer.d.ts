import WebApi from '../core/WebApi';
import { AxiosRequestConfig } from 'axios';
export default abstract class WebApiServer extends WebApi {
    constructor(config: AxiosRequestConfig);
}
