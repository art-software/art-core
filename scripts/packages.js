"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const PACKAGE_ROOT = path.join(__dirname, '../packages');
exports.PACKAGE_ROOT = PACKAGE_ROOT;
const PACKAGES = [
    // 'art-cli-tool',
    // 'art-compiler-ssr',
    // 'art-dev-utils',
    // 'art-lib-common',
    // 'art-lib-common-miniprogram',
    // 'art-lib-react',
    // 'art-lib-utils',
    // 'art-lib-utils-wx',
    // 'art-server-mock',
    // 'art-server-mock-miniprogram',
    // 'art-ssr',
    // 'art-ssr-aggregator-node',
    // 'art-ssr-react',
    'art-ssr-react-router',
];
exports.PACKAGES = PACKAGES;
const PACKAGES_PATH = PACKAGES.map((packageName) => {
    return path.join(PACKAGE_ROOT, packageName);
});
exports.PACKAGES_PATH = PACKAGES_PATH;
