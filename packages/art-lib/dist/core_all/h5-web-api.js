import WebApi from '../core/web-api';
import h5Request from './h5-request';
import merge from '../utils/merge';
import { ApiEnvConfig } from './services/apiEnvConfig';
export default class H5WebApi extends WebApi {
    constructor(baseData = {}, config = { serviceName: '' }) {
        super(baseData, config);
        this.setRequestService(h5Request());
    }
    getDomainApi() {
        const { serviceName = '' } = this.apiConfig;
        const apiEnvConfig = new ApiEnvConfig();
        const customServiceConfig = this.getYourCustomServiceConfig();
        merge(true, apiEnvConfig.serviceApi, customServiceConfig);
        const domainApi = apiEnvConfig.get(`serviceApi.${serviceName}.${apiEnvConfig.getEnvName()}`);
        return domainApi || '';
    }
    /**
     * overwrite it when necessary
     */
    getYourCustomServiceConfig() {
        return {};
    }
}
