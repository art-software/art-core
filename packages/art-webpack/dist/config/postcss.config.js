"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../utils/env");
module.exports = {
    plugins: {
        'cssnano': env_1.isProd() ? {} : false
    }
};
