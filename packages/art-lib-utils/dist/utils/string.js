"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trim = (value) => {
    return value && value.replace(/^\s+|\s+$/g, '') || '';
};
