"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fileHelper_1 = require("art-dev-utils/lib/fileHelper");
const blueimp_md5_1 = __importDefault(require("blueimp-md5"));
exports.getModuleDocToInterfaceConfig = (folderPath) => {
    const docConfig = [];
    fileHelper_1.walk(folderPath).forEach((file) => {
        if (path_1.default.extname(file) === '.md') {
            const entry = path_1.default.relative(process.cwd(), file);
            const fileConfig = {
                entry,
                output: exports.getOutputPath(entry),
                md5: blueimp_md5_1.default(fs_1.default.readFileSync(entry, 'utf8'))
            };
            docConfig.push(fileConfig);
        }
    });
    const moduleDocConfig = {
        docConfig,
        docManiFestPath: path_1.default.join(folderPath, '/doc-manifest.json')
    };
    return moduleDocConfig;
};
exports.getDocManifestInfo = (filePath) => {
    let docManifestInfo = [];
    if (fs_1.default.existsSync(filePath)) {
        docManifestInfo = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8') || '[]');
    }
    return docManifestInfo;
};
exports.getOutputPath = (entryPath) => {
    let outputPath = entryPath.replace('api-docs', 'interfaces');
    outputPath = outputPath.replace('.md', '.ts');
    return outputPath;
};
