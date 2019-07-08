"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../utils/env");
class WebpackBaseConfig {
    constructor(entry, output) {
        this.stats = 'errors-only';
        this.mode = env_1.isProd() ? 'production' : 'development';
        this.entry = entry;
        this.output = output;
    }
}
exports.WebpackBaseConfig = WebpackBaseConfig;
