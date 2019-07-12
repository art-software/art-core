"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const request_1 = __importDefault(require("request"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const isURL_1 = __importDefault(require("art-dev-utils/lib/isURL"));
const chalk_1 = __importDefault(require("chalk"));
const ensureSlash_1 = __importDefault(require("art-dev-utils/lib/ensureSlash"));
exports.httpFileUploader = (localAbsFilePath, serverRelativePath) => {
    const publicPath = appConfig_1.default.get(`art:webpack:output:${appConfig_1.default.get('BUILD_ENV')}PublicPath`);
    if (!isURL_1.default(publicPath)) {
        chalk_1.default.bold.red('please set valid publicPath in art.config.js');
        return;
    }
    if (serverRelativePath.startsWith('/')) {
        chalk_1.default.bold.red('please provide relative path string');
        return;
    }
    if (!fs.existsSync(localAbsFilePath)) {
        console.error(`file not found at ${localAbsFilePath}`);
        return;
    }
    const uploadUrl = ensureSlash_1.default(publicPath, true) + 'upload_static';
    return new Promise((resolve, reject) => {
        request_1.default(uploadUrl, {
            method: 'PUT',
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'multipart/form-data'
            },
            formData: {
                file: fs.createReadStream(localAbsFilePath),
                path: serverRelativePath
            }
        }, (error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(serverRelativePath);
            }
        });
    });
};
