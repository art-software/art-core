"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("./merge");
const axios_1 = require("axios");
exports.request = function (method = 'get') {
    return function (url, data = {}, config = {}) {
        const axiosConfig = merge_1.default(true, {}, { url, method, data }, config);
        return axios_1.default.request(axiosConfig);
    };
};
function default_1() {
    const GET = exports.request('get');
    const POST = exports.request('post');
    const PUT = exports.request('put');
    const DELETE = exports.request('delete');
    return { GET, POST, PUT, DELETE };
}
exports.default = default_1;
