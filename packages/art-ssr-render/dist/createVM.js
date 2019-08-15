"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lru_cache_1 = __importDefault(require("lru-cache"));
const crypto_1 = __importDefault(require("crypto"));
const Module_1 = __importDefault(require("./Module"));
function defaultGetKey(name, code) {
    const hash = crypto_1.default.createHash('sha1').update(code).digest('hex');
    return `${name}::${hash}`;
}
exports.default = (options = {}) => {
    // This is to cache the entry point of all bundles which makes running on a vm blazing fast.
    // Everyone gets their own sandbox to play with and nothing is leaked between requests.
    // We're caching with `code` as the key to ensure that if the code changes we break the cache.
    const exportsCache = new lru_cache_1.default({
        max: options.cacheSize
    });
    const getKey = options.getKey || defaultGetKey;
    return {
        exportsCache,
        run(name, code) {
            const key = getKey(name, code);
            if (exportsCache.has(key)) {
                return exportsCache.get(key);
            }
            const environment = options.environment && options.environment(name);
            const module = new Module_1.default(name, environment);
            module.load(name);
            module._compile(code, name);
            exportsCache.set(key, module.exports);
            return module.exports;
        }
    };
};
