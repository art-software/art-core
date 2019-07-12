"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TOSTRING = Object.prototype.toString;
const TYPES = {
    boolean: 'boolean',
    undefined: 'undefined',
    number: 'number',
    string: 'string',
    '[object Function]': 'function',
    '[object RegExp]': 'regexp',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object Error]': 'error'
};
exports.type = (o) => {
    return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
};
exports.isFunction = (o) => {
    return exports.type(o) === 'function';
};
exports.isNull = (o) => {
    return o === null;
};
exports.isNumber = (o) => {
    return exports.type(o) === 'number' && isFinite(o);
};
exports.isBoolean = (o) => {
    return exports.type(o) === 'boolean';
};
exports.isObject = (o, failfn = false) => {
    const t = typeof o;
    return (o && (t === 'object' ||
        (!failfn && (t === 'function' || exports.isFunction(o))))) || false;
};
exports.isPlainObject = (o) => {
    return exports.isObject(o, true);
};
exports.isString = (o) => {
    return exports.type(o) === 'string';
};
exports.isUndefined = (o) => {
    return exports.type(o) === 'undefined';
};
exports.isArray = Array.isArray || ((o) => exports.type(o) === 'array');
exports.now = Date.now || (() => new Date().getTime());
exports.fromJson = (json) => {
    return exports.isString(json) ? JSON.parse(json) : json;
};
exports.toJson = (obj, pretty) => {
    if (exports.isUndefined(obj)) {
        return undefined;
    }
    if (!exports.isNumber(pretty)) {
        pretty = pretty ? 2 : null;
    }
    return JSON.stringify(obj, (key, value) => value, pretty);
};
exports.noop = () => {
    console.log('noop');
};
exports.isEmptyObject = (obj) => {
    return Object.keys(obj).length <= 0;
};
