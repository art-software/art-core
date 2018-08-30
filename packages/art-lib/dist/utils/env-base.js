import { isObject } from './lang';
import get from './get';
export default class EnvBase {
    getEnvName() {
        return undefined;
    }
    get(key, envName) {
        return this.getFromSource(this, key, envName);
    }
    getFromSource(source, key, envName) {
        envName = envName || this.getEnvName() || 'prod';
        if (!key) {
            throw new Error('the `key` is required!');
        }
        const keyValues = get(source, `${key}`, undefined);
        if (isObject(keyValues)) {
            return get(keyValues, `${envName}`, undefined) || keyValues;
        }
        return keyValues;
    }
}
