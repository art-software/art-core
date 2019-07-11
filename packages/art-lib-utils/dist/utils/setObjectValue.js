"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("./lang");
function setValue(source = {}, [head, ...tail], value) {
    source = source[head] = tail.length ? source[head] || {} : value;
    if (tail.length) {
        if (lang_1.isObject) {
            if (lang_1.isObject(source) && !lang_1.isArray(source)) {
                setValue(source, tail, value);
            }
            else {
                throw new Error(`path node ['.${head}'] must be plain object {}!`);
            }
        }
    }
}
exports.setObjectValue = (source = {}, path, value) => {
    setValue(source, path.split('.'), value);
    return source;
};
