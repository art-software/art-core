"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = __importDefault(require("qs"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = require("path");
const fs_1 = require("fs");
const async_1 = require("async");
class ArtScaffold {
    /**
     * constructor
     * @param {String} solutionName e.g react-activity
     * @param {String} scaffoldType react | vue
     */
    constructor(projectName, scaffoldType) {
        this.projectName = projectName;
        this.scaffoldType = scaffoldType;
        this.projectDescription = '';
        // Give all supported scaffold types.
        this.scaffoldsAvailable = [];
        // Which scaffold current we choosen.
        this.scaffoldChoosen = '';
        this.scaffoldFrom = '';
        this.scaffoldTo = process.cwd();
        // Project information.
        this.moduleName = '';
    }
    setScaffoldType(scaffoldType) {
        if (scaffoldType) {
            this.scaffoldType = scaffoldType;
        }
    }
    setProjectName(solutionName) {
        this.projectName = solutionName;
    }
    setScaffoldFrom(scaffoldFrom) {
        this.scaffoldFrom = scaffoldFrom;
    }
    setProjectDescription(description) {
        this.projectDescription = description;
    }
    setProjectVirtualPath(projectVirtualPath) {
        this.projectVirtualPath = projectVirtualPath || '';
    }
    setScaffoldChoosen(scaffoldChoosen) {
        this.scaffoldChoosen = scaffoldChoosen || '';
    }
    setModuleName(moduleName) {
        this.moduleName = moduleName || '';
    }
    setQueryString(query) {
        this.query = query || {};
    }
    getScaffoldsAvailable() {
        return this.scaffoldsAvailable || [];
    }
    getQueryString() {
        const queryStr = qs_1.default.stringify(this.query);
        return queryStr ? '?' + queryStr : '';
    }
    getToken() {
        return {
            scaffoldType: this.scaffoldType,
            projectDescription: this.projectDescription || '',
            projectVirtualPath: this.projectVirtualPath || '',
            projectName: this.projectName,
            moduleName: this.moduleName,
            scaffoldsAvailable: this.scaffoldsAvailable,
            queryString: this.getQueryString()
        };
    }
    createScaffoldProject() {
        console.log(chalk_1.default.cyan(`create scaffold [${this.scaffoldType}] project starting...`));
        if (this.inArtWorkspace()) {
            return console.log(chalk_1.default.red('The directory contains files that could conflict.'), chalk_1.default.red('\nTry using a new directory and exec art create project -s="scaffold".'));
        }
        if (!this.scaffoldType) {
            return console.log(chalk_1.default.red('the property [scaffoldType] is required!'));
        }
        this.setScaffoldFrom(this.scaffoldFromCwd(this.scaffoldType));
        const asyncQueue = [
            this.syncConfigFiles.bind(this),
            this.syncArtConfig.bind(this),
            this.syncServerFiles.bind(this),
            this.syncClientFiles.bind(this)
        ];
        return new Promise((resolve, reject) => {
            async_1.series(asyncQueue, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    createScaffoldModule() {
        console.log(chalk_1.default.cyan(`create scaffold [${this.scaffoldType}] module starting...`));
        if (!this.inArtWorkspace()) {
            return console.log(chalk_1.default.red('You must run `art create module -s=""` within existed art workspace'));
        }
        if (!this.scaffoldType) {
            return console.log(chalk_1.default.red('the property [scaffoldType] is required!'));
        }
        this.setScaffoldFrom(this.scaffoldFromCwd(this.scaffoldType));
        const asyncQueue = [
            this.syncClientFiles.bind(this),
            this.syncArtConfig.bind(this)
        ];
        return new Promise((resolve, reject) => {
            async_1.series(asyncQueue, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    inArtWorkspace() {
        return fs_1.existsSync(path_1.join(this.scaffoldTo, 'art.config.js'));
    }
    scaffoldFromCwd(scaffoldType) {
        return path_1.join(__dirname, '../../templates/', scaffoldType);
    }
    syncConfigFiles(callback) {
        require(`./${this.scaffoldType}/syncConfigFiles.js`).call(this, this.scaffoldFrom, this.scaffoldTo, callback);
    }
    syncArtConfig(callback) {
        require(`./${this.scaffoldType}/syncArtConfig.js`).call(this, this.scaffoldFrom, this.scaffoldTo, callback);
    }
    syncServerFiles(callback) {
        require(`./${this.scaffoldType}/syncServerFiles.js`).call(this, path_1.join(this.scaffoldFrom, 'server'), path_1.join(this.scaffoldTo, 'server'), callback);
    }
    syncClientFiles(callback) {
        require(`./${this.scaffoldType}/syncClientScaffold.js`).call(this, path_1.join(this.scaffoldFrom, 'client'), path_1.join(this.scaffoldTo, 'client'), callback);
    }
}
exports.default = ArtScaffold;
