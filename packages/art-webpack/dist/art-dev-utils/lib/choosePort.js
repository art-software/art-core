var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "detect-port", "./chalkColors", "is-root"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const detect_port_1 = __importDefault(require("detect-port"));
    const chalkColors_1 = require("./chalkColors");
    const is_root_1 = __importDefault(require("is-root"));
    const isInteractive = process.stdout.isTTY;
    const choosePort = (host, defaultPort) => {
        return detect_port_1.default(defaultPort)
            .then((port) => {
            if (port === defaultPort) {
                return defaultPort;
            }
            const message = process.platform !== 'win32' && defaultPort < 1024 && !is_root_1.default()
                ? `Admin permissions are required to run a server on a port below 1024.`
                : `Something is already running on port ${defaultPort}.`;
            if (isInteractive) {
                // clearConsole();
                return port;
            }
            else {
                console.log(chalkColors_1.redText(message));
                return null;
            }
        })
            .catch((error) => {
            throw new Error(chalkColors_1.warningText(`Could not find an open port at ${host}.\n
        Network error message: ${error.message}`));
        });
    };
    exports.default = choosePort;
});
