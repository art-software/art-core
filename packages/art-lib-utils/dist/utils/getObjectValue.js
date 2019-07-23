"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("./lang");
function getValue(source, [head, ...tail]) {
    source = source[head];
    return tail.length && source ? getValue(source, tail) : source;
}
exports.getObjectValue = (source = {}, path, defaultValue) => {
    const result = getValue(source, path.split('.'));
    return lang_1.isUndefined(result) ? defaultValue : result;
};
