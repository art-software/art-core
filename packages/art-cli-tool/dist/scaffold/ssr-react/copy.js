"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const FolderName = 'service-render';
module.exports = function () {
    console.log('sssssss', this.scaffoldFrom);
    return [
        syncSSRConfigFiles.bind(this, this.scaffoldFrom, this.scaffoldTo),
        syncServiceRenderServerFiles.bind(this, this.scaffoldFrom, this.scaffoldTo, this.moduleName)
    ];
};
const syncSSRConfigFiles = (scaffoldFrom, scaffoldTo, callback) => {
    require(`./syncFolderConfigFiles.js`).call(this, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), 'configServiceRenderMapping', FolderName, callback);
};
const syncServiceRenderServerFiles = (scaffoldFrom, scaffoldTo, moduleName, callback) => __awaiter(this, void 0, void 0, function* () {
    yield require(`./syncServiceRenderServerFiles.js`).call(this, path_1.join(scaffoldFrom, FolderName, 'src'), path_1.join(scaffoldTo, FolderName, 'src'), FolderName, callback);
    yield updateServiceRenderServerFile(scaffoldTo, moduleName);
});
const updateServiceRenderServerFile = (scaffoldTo, moduleName) => {
    return require(`./updateServiceRenderServerFile.js`).bind(this)(path_1.join(scaffoldTo, FolderName, '/src'), moduleName);
};
