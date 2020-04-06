"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packages_1 = require("./packages");
const rimraf = require("rimraf");
const path = require("path");
const throat_1 = require("throat");
const child_process_1 = require("child_process");
const utils_1 = require("./utils");
const chalk_1 = require("chalk");
// Building d.ts
console.log(chalk_1.default.inverse(' Building TypeScript definition files '));
try {
    const tscPath = path.join(__dirname, '../node_modules/.bin/tsc');
    const command = [
        tscPath,
        '-b',
        ...packages_1.PACKAGES_PATH
    ];
    child_process_1.execSync(command.join(' '), {
        stdio: 'inherit',
    });
    console.log(chalk_1.default.inverse.green(' Successfully built TypeScript definition files '));
}
catch (err) {
    console.error(chalk_1.default.inverse.red(' Unable to build TypeScript definition files '));
    console.error(err.stack);
    process.exitCode = 1;
}
// Checking
packages_1.PACKAGES_PATH.forEach((packagePath) => {
    const pkg = require(packagePath + '/package.json');
    if (!pkg.typesVersions) {
        throw new Error(`Package ${pkg.name} is missing \`typesVersions\` field`);
    }
});
// Downleveling
console.log(chalk_1.default.inverse(' Downleveling TypeScript definition files '));
const downLevelPath = path.join(__dirname, '../node_modules/.bin/downlevel-dts');
const downLevelArgs = [
    'dist',
    'dist/ts3.4'
];
Promise.all(packages_1.PACKAGES_PATH.map(throat_1.default(utils_1.maxCpu, (packagePath) => {
    rimraf.sync(path.join(packagePath, 'dist/ts3.4'));
    return new Promise((resolve, reject) => {
        const downLevel = child_process_1.spawn(downLevelPath, downLevelArgs, {
            cwd: packagePath,
            stdio: 'inherit'
        });
        downLevel.on('close', (code) => { resolve(code); });
        downLevel.on('error', (err) => { reject(err); });
    });
}))).then(() => {
    console.log(chalk_1.default.inverse.green(' Successfully downleveled TypeScript definition files '));
}).catch((err) => {
    console.error(chalk_1.default.inverse.red(' Unable to downlevel TypeScript definition files '));
    console.error(err.stack);
    process.exitCode = 1;
});
