"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
class DynamicChunkNamePlugin {
    constructor(moduleEntry) {
        this.moduleEntry = moduleEntry;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('DynamicChunkNamePlugin', (compilation) => {
            compilation.hooks.beforeChunkIds.tap('DynamicChunkNamePlugin', (chunks) => {
                chunks.forEach((chunk) => {
                    if (chunk.name) {
                        return;
                    }
                    const moduleEntries = chunk.getModules();
                    const nodeModulesRegex = /node_modules/;
                    for (const entry in this.moduleEntry) {
                        const entryRegex = this.getEntryRegex(this.moduleEntry[entry][0]);
                        const commonFolderRegex = this.getCommonFolderRegex();
                        if (!(this.getModulesGroup(moduleEntries, entryRegex) ||
                            this.getModulesGroup(moduleEntries, commonFolderRegex) ||
                            this.getModulesGroup(moduleEntries, nodeModulesRegex))) {
                            continue;
                        }
                        for (const mod of moduleEntries) {
                            if (mod.context && (entryRegex.test(mod.context) ||
                                nodeModulesRegex.test(mod.context) ||
                                mod.context === null)) {
                                const newChunkName = entry + '/chunks';
                                // TODO
                                // @ts-ignore
                                chunk.id = `${newChunkName}/${this.getRandomString()}`;
                            }
                        }
                    }
                });
            });
        });
    }
    getEntryRegex(entry) {
        let entryDir = path_1.dirname(entry);
        if (entryDir.startsWith('./')) {
            entryDir = entryDir.slice(2);
        }
        return new RegExp(`${entryDir}`);
    }
    getCommonFolderRegex() {
        const entryDir = path_1.join(process.cwd(), './client');
        return new RegExp(`${entryDir}`);
    }
    getModulesGroup(modules, regex) {
        for (let i = 0; i < modules.length; i++) {
            const context = (modules[i].issuer || {}).context;
            if (modules[i].issuer === null || regex.test(context)) {
                return true;
            }
        }
        return false;
    }
    getRandomString() {
        return Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }
}
exports.default = DynamicChunkNamePlugin;
