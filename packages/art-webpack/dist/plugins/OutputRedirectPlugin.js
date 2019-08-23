"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ensureSlash_1 = __importDefault(require("art-dev-utils/lib/ensureSlash"));
class OutputRedirectPlugin {
    constructor(outputOptions) {
        this.options = outputOptions;
    }
    apply(compiler) {
        const { match, path, filename } = this.options;
        compiler.hooks.thisCompilation.tap('OutputRedirectPlugin', (compilation) => {
            compilation.hooks.beforeChunkIds.tap('OutputRedirectPlugin', (chunks) => {
                chunks.forEach((chunk) => {
                    if (chunk.name === match) {
                        if (chunk.id === null) {
                            chunk.id = ensureSlash_1.default(path, true) + (filename || chunk.name);
                        }
                        else {
                            throw new Error('This chunk\'s id has been assigned, can not reassign.');
                        }
                    }
                });
            });
        });
    }
}
exports.default = OutputRedirectPlugin;
