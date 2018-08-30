import WebApi from '../core/web-api';
import h5Request from './h5-request';
export default class H5WebApi extends WebApi {
    constructor(baseData, config) {
        super(baseData, config);
        this.setRequestService(h5Request());
    }
}
