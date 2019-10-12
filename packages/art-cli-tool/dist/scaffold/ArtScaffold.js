"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
const Stage_1 = require("../enums/Stage");
const executeNodeScript_1 = __importDefault(require("art-dev-utils/lib/executeNodeScript"));
const lang_1 = require("art-lib-utils/dist/utils/lang");
const CreateCmdTypes_1 = require("../enums/CreateCmdTypes");
const isDevStage = process.env.STAGE === Stage_1.Stage.dev;
const DependencyPackages = {
    [Scaffolds_1.Scaffolds.react]: ['art-lib-common', 'art-lib-react', 'art-lib-utils', 'art-server-mock', 'art-webpack'],
    [Scaffolds_1.Scaffolds.miniprogram]: ['art-lib-common-miniprogram', 'art-lib-utils', 'art-lib-utils-wx', 'art-server-mock-miniprogram', 'art-webpack-miniprogram'],
    [Scaffolds_1.Scaffolds.ssrReact]: {
        'service-render': ['art-ssr-render'],
        'service-web': ['art-ssr-aggregator-node'],
        'web-react': ['art-isomorphic-style-loader', 'art-ssr-react-router', 'art-ssr-react', 'art-compiler-ssr', 'art-lib-common', 'art-lib-react', 'art-lib-utils', 'art-server-mock', 'art-webpack']
    }
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
        let asyncQueue;
        // ssr react
        if (this.scaffoldType === Scaffolds_1.Scaffolds.ssrReact) {
            asyncQueue = [
                ...require(`./${this.scaffoldType}/config/copy.js`).call(this),
                ...require(`./${this.scaffoldType}/service-render/copy.js`).call(this),
                ...require(`./${this.scaffoldType}/service-web/copy.js`).call(this),
                ...require(`./${this.scaffoldType}/web-react/copy.js`).call(this, CreateCmdTypes_1.CreateCmdTypes.project)
            ];
        }
        else {
            // spa、miniprogram
            asyncQueue = [
                this.syncConfigFiles.bind(this),
                this.syncArtConfig.bind(this),
                this.syncServerFiles.bind(this),
                this.syncClientFiles.bind(this)
            ];
            if (this.scaffoldType === Scaffolds_1.Scaffolds.miniprogram) {
                asyncQueue.push(this.syncUpdateAppJson.bind(this));
            }
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
                if (this.scaffoldType === Scaffolds_1.Scaffolds.ssrReact) {
                    yield this.installDependencyPackages(inquirerPM, 'particular', 'service-render');
                    yield this.installDependencyPackages(inquirerPM, 'default', 'service-render');
                    yield this.installDependencyPackages(inquirerPM, 'particular', 'service-web');
                    yield this.installDependencyPackages(inquirerPM, 'default', 'service-web');
                    yield this.installDependencyPackages(inquirerPM, 'particular', 'web-react');
                    yield this.installDependencyPackages(inquirerPM, 'default', 'web-react');
                }
                else {
                    yield this.installDependencyPackages(inquirerPM, 'particular');
                    yield this.installDependencyPackages(inquirerPM, 'default');
                }
            }
            else {
                if (this.scaffoldType === Scaffolds_1.Scaffolds.ssrReact) {
                    console.log(chalk_1.default.blue(`You can manually install following modules before starting project.`));
                    console.log(DependencyPackages[this.scaffoldType]);
                }
                else {
                    console.log(chalk_1.default.blue(`You can manually install following modules:
            ${chalk_1.default.magenta((DependencyPackages[this.scaffoldType] || []).join(' '))}
          before starting project.`));
                }
                process.exit(0);
            }
        });
    }
    installDependencyPackages(answer, type, execFolder) {
        printLog_1.printInstructions(`Start installing [${this.scaffoldType}] ${type} dependency packages...`);
        let dependencyArr = [];
        if (type === 'particular') {
            const packagesArr = DependencyPackages[this.scaffoldType];
            if (lang_1.isArray(packagesArr)) {
                dependencyArr = DependencyPackages[this.scaffoldType];
            }
            else if (lang_1.isObject(packagesArr)) {
                if (execFolder) {
                    dependencyArr = packagesArr[execFolder];
                }
            }
            dependencyArr.forEach((item) => {
                console.log(chalk_1.default.magenta(item));
            });
        }
        const spawnOptions = {
            stdio: 'inherit'
        };
        if (execFolder) {
            spawnOptions.cwd = path_1.join(this.scaffoldTo, execFolder);
        }
        return new Promise((resolve, reject) => {
            cross_spawn_1.default(answer.modulesManager, [
                exports.InstallCommands[answer.modulesManager][type],
                ...dependencyArr
            ], spawnOptions).on('close', (code) => {
                if (code === 0) {
                    console.log(chalk_1.default.green(`Install ${type} dependencies successfully`));
                    if (type === 'default') {
                        this.defaultDepInstallDone = true;
                    }
                    else if (type === 'particular') {
                        this.particularDepInstallDone = true;
                    }
                    if (this.defaultDepInstallDone && this.particularDepInstallDone) {
                        if (this.scaffoldType === Scaffolds_1.Scaffolds.react || this.scaffoldType === Scaffolds_1.Scaffolds.miniprogram) {
                            this.autoServeModule();
                        }
                        else if (this.scaffoldType === Scaffolds_1.Scaffolds.ssrReact) {
                            if (execFolder === 'web-react' && type === 'default') {
                                console.log(chalk_1.default.blue('serve your ssr application, please follow this:'));
                                console.log(`run ${chalk_1.default.magenta('NODE_ENV=dev DEV_PORT=3001 art serve -m [module_replace]')} in ${chalk_1.default.magenta('web-react')} folder`);
                                console.log(`run ${chalk_1.default.magenta('tsc -w')}, and then run ${chalk_1.default.magenta('node dist/server.js')} in ${chalk_1.default.magenta(' service-render')} folder`);
                                console.log(`run ${chalk_1.default.magenta('tsc -w')}, and then run ${chalk_1.default.magenta('node dist/index.js')} in ${chalk_1.default.magenta(' service-web')} folder`);
                            }
                        }
                    }
                    resolve();
                }
                else {
                    console.log(chalk_1.default.cyan('Install dependency packages ' + type) + ' exited with code ' + code + '.');
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
                let serveProcess;
                if (isDevStage) {
                    const symlinkPath = path_1.resolve(__dirname, `../../dist/index.js`);
                    serveProcess = this.scaffoldType === Scaffolds_1.Scaffolds.miniprogram ?
                        executeNodeScript_1.default('node', symlinkPath, 'serve') :
                        executeNodeScript_1.default('node', symlinkPath, 'serve', '-m', this.moduleName);
                }
                else {
                    serveProcess = cross_spawn_1.default('art', this.scaffoldType === Scaffolds_1.Scaffolds.miniprogram ?
                        [
                            'serve'
                        ] :
                        [
                            'serve',
                            '-m',
                            this.moduleName
                        ], {
                        stdio: 'inherit'
                    });
                }
                serveProcess.on('close', (code) => {
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
        return __awaiter(this, void 0, void 0, function* () {
            console.log(chalk_1.default.cyan(`create scaffold [${this.scaffoldType}] module starting...`));
            if (!this.inArtWorkspace()) {
                return console.log(chalk_1.default.red('You must run `art create module -s=""` within existed art workspace'));
            }
            if (!this.scaffoldType) {
                return console.log(chalk_1.default.red('the property [scaffoldType] is required!'));
            }
            this.setScaffoldFrom(this.scaffoldFromCwd(this.scaffoldType));
            let asyncQueue;
            if (this.scaffoldType === Scaffolds_1.Scaffolds.ssrReact) {
                asyncQueue = [
                    ...require(`./${this.scaffoldType}/web-react/copy.js`).call(this, CreateCmdTypes_1.CreateCmdTypes.module)
                ];
            }
            else {
                asyncQueue = [
                    this.syncClientFiles.bind(this),
                    this.syncServerFiles.bind(this)
                ];
            }
            if (this.scaffoldType === Scaffolds_1.Scaffolds.react) {
                const updateArtConfig = require(`./${this.scaffoldType}/updateArtConfig.js`);
                updateArtConfig.bind(this)(this.scaffoldTo);
            }
            else if (this.scaffoldType === Scaffolds_1.Scaffolds.ssrReact) {
                const updateArtConfig = require(`./${this.scaffoldType}/web-react/updateArtConfig.js`);
                updateArtConfig.bind(this)(this.scaffoldTo);
            }
            else if (this.scaffoldType === Scaffolds_1.Scaffolds.miniprogram) {
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
