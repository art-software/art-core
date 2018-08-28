var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "url", "chalk", "address"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const url = __importStar(require("url"));
    const chalk_1 = __importDefault(require("chalk"));
    const address_1 = __importDefault(require("address"));
    function prepareUrls(protocol, host, port) {
        const formatUrl = (hostname) => url.format({
            protocol,
            hostname,
            port,
            pathname: '/',
        });
        const prettyPrintUrl = (hostname) => url.format({
            protocol,
            hostname,
            port: chalk_1.default.bold(port),
            pathname: '/',
        });
        const isUnspecifiedHost = host === '0.0.0.0' || host === '::';
        let prettyHost, lanUrlForConfig, lanUrlForTerminal;
        if (isUnspecifiedHost) {
            prettyHost = 'localhost';
            try {
                // This can only return an IPv4 address
                lanUrlForConfig = address_1.default.ip();
                if (lanUrlForConfig) {
                    // Check if the address is a private ip
                    // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
                    if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(lanUrlForConfig)) {
                        // Address is private, format it for later use
                        lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig);
                    }
                    else {
                        // Address is not private, so we will discard it
                        lanUrlForConfig = undefined;
                    }
                }
            }
            catch (error) {
                // ignored
            }
        }
        else {
            prettyHost = host;
        }
        const localUrlForTerminal = prettyPrintUrl(prettyHost);
        const localUrlForBrowser = formatUrl(prettyHost);
        return {
            lanUrlForConfig,
            lanUrlForTerminal,
            localUrlForTerminal,
            localUrlForBrowser,
        };
    }
    exports.default = prepareUrls;
});
