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
                    for (const mod of moduleEntries) {
                        for (const entry in this.moduleEntry) {
                            const entryRegex = this.getEntryRegex(this.moduleEntry[entry][0]);
                            if (entryRegex.test(mod.context) || nodeModulesRegex.test(mod.context)) {
                                const newChunkName = entry + '/chunks';
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
    getRandomString() {
        return Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }
}
exports.default = DynamicChunkNamePlugin;
