import H5WebApi from '../h5-web-api';
export default class WebApiQnn extends H5WebApi {
    constructor() {
        super({}, { serviceName: 'qnnWeb' });
    }
}
