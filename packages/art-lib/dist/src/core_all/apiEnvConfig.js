import EnvBase from '../utils/env-base';
import { getQueryString } from '../utils/url';
export class ApiEnvConfig extends EnvBase {
    getEnvName() {
        return getQueryString('env') || 'prod';
    }
}
