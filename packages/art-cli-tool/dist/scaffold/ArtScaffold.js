"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = __importDefault(require("qs"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = require("path");
const fs_1 = require("fs");
const async_1 = require("async");
const inquirer_1 = __importDefault(require("inquirer"));
const cross_spawn_1 = __importDefault(require("cross-spawn"));
const ModulesManagers_1 = require("../enums/ModulesManagers");
const printLog_1 = require("./printLog");
const Scaffolds_1 = require("../enums/Scaffolds");
const DependencyPackages = {
    [Scaffolds_1.Scaffolds.react]: ['art-lib-common', 'art-lib-react', 'art-lib-utils', 'art-server-mock', 'art-webpack'],
    [Scaffolds_1.Scaffolds.miniprogram]: ['art-lib-common-miniprogram', 'art-lib-utils', 'art-lib-utils-wx', 'art-server-mock-miniprogram', 'art-webpack-miniprogram']
};
exports.InstallCommands = {
    [ModulesManagers_1.ModulesManagers.YARN]: {
        default: 'install',
        particular: 'add',
        options: []
    },
    [ModulesManagers_1.ModulesManagers.NPM]: {
        default: 'install',
        particular: 'install',
        options: []
    },
};
const autoInstallQuestion = [
    {
        type: 'confirm',
        name: 'autoInstall',
        message: 'Install dependencies now?',
        default: true
    }
];
const installManagerQuestion = [
    {
        type: 'list',
        name: 'modulesManager',
        message: 'Please choose one package manager',
        choices: [ModulesManagers_1.ModulesManagers.YARN, ModulesManagers_1.ModulesManagers.NPM],
        default: 0
    }
];
const autoServeQuestion = [
    {
        type: 'confirm',
        name: 'autoServe',
        message: 'Start serving modules?',
        default: true
    }
];
class ArtScaffold {
    /**
     * constructor
     * @param {String} solutionName e.g react-activity
     * @param {String} scaffoldType react | vue
     */
    constructor(projectName, scaffoldType) {
        this.defaultDepInstallDone = false;
        this.particularDepInstallDone = false;
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
        if (this.scaffoldType === Scaffolds_1.Scaffolds.miniprogram) {
            asyncQueue.push(this.syncUpdateAppJson.bind(this));
        }
        return new Promise((resolve, reject) => {
            async_1.series(asyncQueue, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject(err);
                }
                else {
                    if (this.scaffoldType === Scaffolds_1.Scaffolds.react) {
                        yield this.syncTemplateFile();
                    }
                    yield this.autoInstallAfterCreateProject();
                    // resolve(result);
                }
            }));
        });
    }
    syncTemplateFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const syncTemplateFile = require(`./${this.scaffoldType}/syncTemplateFile.js`);
            return yield syncTemplateFile.bind(this)(this.scaffoldTo);
        });
    }
    autoInstallAfterCreateProject() {
        return __awaiter(this, void 0, void 0, function* () {
            printLog_1.printInstructions(chalk_1.default.magenta(`Creating scaffold [${this.scaffoldType}] project succeed, the next step is installing dependencies!`));
            const inquirerAutoInstall = yield inquirer_1.default.prompt(autoInstallQuestion).then((answer) => {
                return answer;
            });
            if (inquirerAutoInstall.autoInstall) {
                const inquirerPM = yield inquirer_1.default.prompt(installManagerQuestion).then((answer) => {
                    return answer;
                });
                yield this.installDependencyPackages(inquirerPM, 'default');
                yield this.installDependencyPackages(inquirerPM, 'particular');
            }
            else {
                chalk_1.default.blue(`You can manually install following modules:
          ${chalk_1.default.magenta((DependencyPackages[this.scaffoldType] || []).join(' '))}
        before starting project.`);
                process.exit(0);
            }
        });
    }
    installDependencyPackages(answer, type) {
        printLog_1.printInstructions(`Start installing [${this.scaffoldType}] ${type} dependency packages...`);
        let dependencyArr = [];
        if (type === 'particular') {
            dependencyArr = DependencyPackages[this.scaffoldType] || [];
            dependencyArr.forEach((item) => {
                console.log(chalk_1.default.magenta(item));
            });
        }
        return new Promise((resolve, reject) => {
            cross_spawn_1.default(answer.modulesManager, [
                exports.InstallCommands[answer.modulesManager][type],
                ...dependencyArr
            ], {
                stdio: 'inherit'
            }).on('close', (code) => {
                if (code === 0) {
                    console.log(chalk_1.default.green(`Install ${type} dependencies successfully`));
                    if (type === 'default') {
                        this.defaultDepInstallDone = true;
                    }
                    else if (type === 'particular') {
                        this.particularDepInstallDone = true;
                    }
                    if (this.defaultDepInstallDone && this.particularDepInstallDone) {
                        this.autoServeModule();
                    }
                    resolve();
                }
                else {
                    console.log(chalk_1.default.cyan('Install dependency packages' + type) + ' exited with code ' + code + '.');
                    reject();
                }
            }).on('error', (err) => {
                console.log(err);
                reject(err);
            });
        });
    }
    autoServeModule() {
        inquirer_1.default.prompt(autoServeQuestion).then((answer) => {
            if (answer.autoServe) {
                cross_spawn_1.default('art', this.scaffoldType === Scaffolds_1.Scaffolds.miniprogram ?
                    [
                        'serve'
                    ] :
                    [
                        'serve',
                        '-m',
                        this.moduleName
                    ], {
                    stdio: 'inherit'
                }).
                    on('close', (code) => {
                    if (code !== 0) {
                        console.log(chalk_1.default.cyan('serve modules') + ' exited with code ' + code + '.');
                        return;
                    }
                }).on('error', (err) => {
                    console.log(err);
                });
            }
            else {
                process.exit(0);
            }
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
            this.syncServerFiles.bind(this)
        ];
        if (this.scaffoldType !== Scaffolds_1.Scaffolds.miniprogram) {
            const updateArtConfig = require(`./${this.scaffoldType}/updateArtConfig.js`);
            updateArtConfig.bind(this)(this.scaffoldTo);
        }
        else {
            this.syncUpdateAppJson.bind(this)();
        }
        return new Promise((resolve, reject) => {
            async_1.series(asyncQueue, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject(err);
                }
                else {
                    if (this.scaffoldType === Scaffolds_1.Scaffolds.react) {
                        yield this.syncTemplateFile();
                    }
                    resolve(result);
                }
            }));
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
        require(`./${this.scaffoldType}/syncServerFiles.js`).call(this, this.scaffoldFrom, this.scaffoldTo, callback);
    }
    syncClientFiles(callback) {
        require(`./${this.scaffoldType}/syncClientFiles.js`).call(this, this.scaffoldFrom, this.scaffoldTo, callback);
    }
    syncUpdateAppJson(callback = () => { }) {
        require(`./miniprogram/updateAppJson.js`).call(this, this.scaffoldTo, callback);
    }
}
exports.default = ArtScaffold;
