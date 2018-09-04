import EnvBase from '../../utils/env-base';
import { getQueryString } from '../../utils/url';
import serviceApi from './_servicesApi';
export class ApiEnvConfig extends EnvBase {
    constructor() {
        super(...arguments);
        this.serviceApi = {
            qnnWeb: serviceApi.qnnWeb
        };
    }
    getEnvName() {
        return getQueryString('env') || 'prod';
    }
    getPort() {
        return getQueryString('port') || '';
    }
}
