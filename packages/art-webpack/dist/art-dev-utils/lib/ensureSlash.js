(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ensureSlash = (rawPath, needsSlash) => {
        rawPath = rawPath || '';
        const hasSlash = rawPath.endsWith('/');
        if (hasSlash && !needsSlash) {
            return rawPath.substr(0, rawPath.length - 1);
        }
        else if (!hasSlash && needsSlash) {
            return `${rawPath}/`;
        }
        else {
            return rawPath;
        }
    };
    exports.default = ensureSlash;
});
