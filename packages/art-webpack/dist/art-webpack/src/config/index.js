var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./configWebpackModules", "./webpack.config.dev"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const configWebpackModules_1 = require("./configWebpackModules");
    const webpack_config_dev_1 = __importDefault(require("./webpack.config.dev"));
    exports.getWebpackConfig = () => {
        const entry = configWebpackModules_1.attachHotDevServerScripts(configWebpackModules_1.webpackEntries(false));
        const output = configWebpackModules_1.webpackOutput();
        // if (!isProd()) {
        return new webpack_config_dev_1.default(entry, output);
        // }
    };
});
