/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./launchEditor", "./launchEditorEndpoint"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const launchEditor_1 = __importDefault(require("./launchEditor"));
    const launchEditorEndpoint_1 = __importDefault(require("./launchEditorEndpoint"));
    function createLaunchEditorMiddleware() {
        return function launchEditorMiddleware(req, res, next) {
            if (req.url.startsWith(launchEditorEndpoint_1.default)) {
                const lineNumber = parseInt(req.query.lineNumber, 10) || 1;
                const colNumber = parseInt(req.query.colNumber, 10) || 1;
                launchEditor_1.default(req.query.fileName, lineNumber, colNumber);
                res.end();
            }
            else {
                next();
            }
        };
    }
    exports.default = createLaunchEditorMiddleware;
});
