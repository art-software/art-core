"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("./lang");
const get_1 = require("./get");
class EnvBase {
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
        const keyValues = get_1.default(source, `${key}`, undefined);
        if (lang_1.isObject(keyValues)) {
            return get_1.default(keyValues, `${envName}`, undefined) || keyValues;
        }
        return keyValues;
    }
}
exports.default = EnvBase;
