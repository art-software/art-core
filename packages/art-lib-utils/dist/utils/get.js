"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("./lang");
function get(source, [head, ...tail]) {
    source = source[head];
    return tail.length && source ? get(source, tail) : source;
}
exports.default = (source, path, defaultValue) => {
    const result = get(source || {}, path.split('.'));
    return lang_1.isUndefined(result) ? defaultValue : result;
};
