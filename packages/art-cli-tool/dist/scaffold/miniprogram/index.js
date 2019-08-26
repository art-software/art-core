"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArtScaffold_1 = __importDefault(require("../ArtScaffold"));
class MiniprogramScaffold extends ArtScaffold_1.default {
    constructor(scaffoldData, scaffoldType) {
        super(scaffoldData.projectName || '', scaffoldType);
        // override
        this.scaffoldsAvailable = ['miniprogram/default'];
        this.scaffoldChoosen = 'miniprogram/default';
        this.setProjectName(scaffoldData.projectName || '');
        this.setProjectDescription(scaffoldData.projectDescription || '');
        this.setProjectVirtualPath(scaffoldData.projectVirtualPath);
        this.setModuleName(scaffoldData.moduleName);
    }
}
module.exports = MiniprogramScaffold;
