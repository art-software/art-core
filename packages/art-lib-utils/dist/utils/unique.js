"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// We can't create an unique seed instance.
exports.uniqueFactory = (prefix = 'unique', start = 1) => {
    // start with 1
    const uniqueMap = { unique: start };
    return () => {
        if (!uniqueMap[prefix]) {
            uniqueMap[prefix] = start;
        }
        return `${prefix}${uniqueMap[prefix]++}`;
    };
};
// global shared one seed instance.
exports.default = exports.uniqueFactory();
