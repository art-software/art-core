"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
const { combine, timestamp, prettyPrint } = winston_1.format;
const defaultOptions = {
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new winston_1.default.transports.Console()
    ]
};
class Logger {
    static init(config, loggerInstance) {
        if (!!Logger.loggerInstance) {
            return Logger.loggerInstance;
        }
        if (loggerInstance) {
            Logger.loggerInstance = loggerInstance;
        }
        else {
            const options = { ...defaultOptions, ...config };
            Logger.loggerInstance = winston_1.default.createLogger(options);
        }
    }
    static getLogger() {
        return Logger.loggerInstance;
    }
    static error(message, meta) {
        return Logger.loggerInstance.log('error', message, meta);
    }
    static info(message, meta) {
        return Logger.loggerInstance.log('info', message, meta);
    }
}
Logger.init();
exports.default = Logger;
