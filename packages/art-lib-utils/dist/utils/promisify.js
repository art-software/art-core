"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("./merge");
exports.default = (api) => {
    return (options, ...params) => {
        return new Promise((resolve, reject) => {
            api(merge_1.default(true, {}, options, { resolve, reject }), ...params);
        });
    };
};
