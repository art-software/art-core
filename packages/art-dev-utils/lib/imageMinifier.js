"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const imagemin_1 = __importDefault(require("imagemin"));
const imagemin_jpegtran_1 = __importDefault(require("imagemin-jpegtran"));
const imagemin_pngquant_1 = __importDefault(require("imagemin-pngquant"));
const chalk_1 = __importDefault(require("chalk"));
const lodash_1 = require("lodash");
const async_1 = __importDefault(require("async"));
const printCompressImagelog = (files, buildFolder) => {
    files.map((file) => {
        const fileAbsName = file.path;
        const fileBasename = path_1.basename(fileAbsName);
        const fileDirname = path_1.dirname(fileAbsName);
        const folder = path_1.relative(buildFolder, fileDirname);
        console.log(`➩ ${folder}/${chalk_1.default.cyan(fileBasename)}`);
    });
};
function compressImages(webpackStats, buildFolder) {
    const folderFiles = {};
    webpackStats.toJson()
        .assets.filter((asset) => {
        return /\.(png|jpg|git)$/.test(asset.name.split('?')[0]);
    })
        .forEach((asset) => {
        const assetName = asset.name.split('?')[0];
        const folder = path_1.dirname(assetName);
        const name = path_1.basename(assetName);
        const folderAbsPath = path_1.join(buildFolder, folder);
        if (!folderFiles[folderAbsPath]) {
            folderFiles[folderAbsPath] = [];
        }
        folderFiles[folderAbsPath].push(path_1.join(folderAbsPath, name));
    });
    const asyncQueue = [];
    const getAsyncQueue = (imagesSrc, targetDest) => {
        return (callback) => __awaiter(this, void 0, void 0, function* () {
            try {
                const files = yield imagemin_1.default(imagesSrc, targetDest, {
                    plugins: [
                        imagemin_jpegtran_1.default(),
                        imagemin_pngquant_1.default({ quality: '65-80' })
                    ]
                });
                printCompressImagelog(files, buildFolder);
                callback(null);
            }
            catch (err) {
                callback(err);
            }
        });
    };
    lodash_1.forEach(folderFiles, (imagesSrc, targetDest) => {
        asyncQueue.push(getAsyncQueue(imagesSrc, targetDest));
    });
    return new Promise((resolve, reject) => {
        if (asyncQueue.length) {
            console.log(chalk_1.default.green('Optimizing the image size...\n'));
        }
        async_1.default.parallel(asyncQueue, (err, result) => {
            if (err) {
                return reject(err);
            }
            console.log(chalk_1.default.green(`\nOptimizing the image successfully.\n`));
            return resolve(result);
        });
    });
}
exports.default = compressImages;
