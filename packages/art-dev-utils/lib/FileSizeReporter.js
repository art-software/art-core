"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recursive_readdir_1 = __importDefault(require("recursive-readdir"));
const gzip_size_1 = require("gzip-size");
const fs_1 = require("fs");
const path_1 = require("path");
const filesize_1 = __importDefault(require("filesize"));
const chalk_1 = __importDefault(require("chalk"));
const strip_ansi_1 = __importDefault(require("strip-ansi"));
function removeFileNameHash(buildFolder, fileName) {
    return fileName
        .replace(buildFolder, '')
        .replace(/\/?(.*)(\.\w+)(\.js|\.css)/, (match, p1, p2, p3) => p1 + p3);
}
// Input: 1024, 2048
// Output: "(+1 KB)"
function getDifferenceLabel(currentSize, previousSize) {
    const FIFTY_KILOBYTES = 1024 * 50;
    const difference = currentSize - previousSize;
    const fileSize = !Number.isNaN(difference) ? filesize_1.default(difference) : 0;
    if (difference >= FIFTY_KILOBYTES) {
        return chalk_1.default.red('+' + fileSize);
    }
    else if (difference < FIFTY_KILOBYTES && difference > 0) {
        return chalk_1.default.yellow('+' + fileSize);
    }
    else if (difference < 0) {
        return chalk_1.default.green(fileSize || '0');
    }
    else {
        return '';
    }
}
function measureFileSizesBeforeBuild(buildFolder) {
    return new Promise((resolve) => {
        recursive_readdir_1.default(buildFolder, (error, files) => {
            let size;
            if (!error && files.length) {
                size = files.filter((file) => /\.(js|css)$/.test(file))
                    .reduce((prev, file) => {
                    const contents = fs_1.readFileSync(file);
                    const key = removeFileNameHash(buildFolder, file);
                    prev[key] = gzip_size_1.sync(contents);
                    return prev;
                }, {});
            }
            resolve({
                root: buildFolder,
                size: size || {}
            });
        });
    });
}
exports.measureFileSizesBeforeBuild = measureFileSizesBeforeBuild;
function printFileSizesAfterBuild(webpackStats, previousSizeMap, buildFolder, maxBundleGzipSize, maxChunkGzipSize) {
    const root = previousSizeMap.root;
    const prevSize = previousSizeMap.size;
    const assets = (webpackStats
        .toJson()
        .assets || []).filter((asset) => /\.(js|css|png|jpg|gif)$/.test(asset.name.split('?')[0]))
        .map((asset) => {
        const assetName = asset.name.split('?')[0];
        const fileContents = fs_1.readFileSync(path_1.join(root, assetName));
        const contentSize = gzip_size_1.sync(fileContents);
        const previousSize = prevSize[removeFileNameHash(root, assetName)];
        const difference = getDifferenceLabel(contentSize, previousSize);
        return {
            folder: path_1.join(path_1.basename(buildFolder), path_1.dirname(assetName)),
            name: path_1.basename(assetName),
            size: contentSize,
            sizeLabel: filesize_1.default(contentSize) + (difference ? ' (' + difference + ')' : ''),
        };
    });
    assets.sort((a, b) => b.size - a.size);
    const longestSizeLabelLength = Math.max.apply(null, assets.map((a) => strip_ansi_1.default(a.sizeLabel).length));
    let suggestBundleSplitting = false;
    assets.forEach((asset) => {
        let sizeLabel = asset.sizeLabel;
        const sizeLength = strip_ansi_1.default(sizeLabel).length;
        if (sizeLength < longestSizeLabelLength) {
            const rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
            sizeLabel += rightPadding;
        }
        const isMainBundle = asset.name.indexOf('main.') === 0;
        const maxRecommendedSize = isMainBundle
            ? maxBundleGzipSize
            : maxChunkGzipSize;
        const isLarge = maxRecommendedSize && asset.size > maxRecommendedSize;
        if (isLarge && path_1.extname(asset.name) === '.js') {
            suggestBundleSplitting = true;
        }
        console.log('➩ '
            + (isLarge ? chalk_1.default.yellow(sizeLabel) : sizeLabel) + '  '
            + chalk_1.default.dim(asset.folder + path_1.sep)
            + chalk_1.default.cyan(asset.name));
    });
    if (suggestBundleSplitting) {
        console.log();
        console.log(chalk_1.default.yellow('The bundle size is significantly larger than recommended.'));
        console.log(chalk_1.default.yellow('Consider reducing it with code splitting: https://goo.gl/9VhYWB'));
        console.log(chalk_1.default.yellow('You can also analyze the project dependencies: https://goo.gl/LeUzfb'));
    }
}
exports.printFileSizesAfterBuild = printFileSizesAfterBuild;
