import qs from 'qs';
import chalk from 'chalk';
import { join, resolve as resolvePath } from 'path';
import { existsSync } from 'fs';
import { series } from 'async';
import inquirer, { Answers, Question } from 'inquirer';
import spawn from 'cross-spawn';
import { ModulesManagers } from '../enums/ModulesManagers';
import { printInstructions } from './printLog';
import { Scaffolds } from '../enums/Scaffolds';
import { Stage } from '../enums/Stage';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import { isArray, isObject } from 'art-lib-utils/dist/utils/lang';
const isDevStage = process.env.STAGE === Stage.dev;

interface ISpawnOptions {
  stdio: string;
  cwd?: string;
}

const DependencyPackages = {
  [Scaffolds.react]: ['art-lib-common', 'art-lib-react', 'art-lib-utils', 'art-server-mock', 'art-webpack'],
  [Scaffolds.miniprogram]: ['art-lib-common-miniprogram', 'art-lib-utils', 'art-lib-utils-wx', 'art-server-mock-miniprogram', 'art-webpack-miniprogram'],
  [Scaffolds.ssrReact]: {
    'service-render': ['art-ssr-render'],
    'service-web': ['art-ssr-aggregator-node'],
    'web-react': ['art-ssr-react-router', 'art-ssr-react', 'art-compiler-ssr', 'art-lib-common', 'art-lib-react', 'art-lib-utils', 'art-server-mock', 'art-webpack']
  }
};

export const InstallCommands = {
  [ModulesManagers.YARN]: {
    default: 'install',
    particular: 'add',
    options: []
  },
  [ModulesManagers.NPM]: {
    default: 'install',
    particular: 'install',
    options: []
  },
};

const autoInstallQuestion: Question[] = [
  {
    type: 'confirm',
    name: 'autoInstall',
    message: 'Install dependencies now?',
    default: true
  }
];

const installManagerQuestion: Question[] = [
  {
    type: 'list',
    name: 'modulesManager',
    message: 'Please choose one package manager',
    choices: [ModulesManagers.YARN, ModulesManagers.NPM],
    default: 0
  }
];

const autoServeQuestion: Question[] = [
  {
    type: 'confirm',
    name: 'autoServe',
    message: 'Start serving modules?',
    default: true
  }
];

export default class ArtScaffold {
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

  public projectName: string;
  public scaffoldType: string;
  public projectDescription: string;
  public scaffoldFrom: string;
  public scaffoldTo: string;
  public projectVirtualPath: string;
  public scaffoldChoosen: string;
  public moduleName: string;
  public query: string;
  public scaffoldsAvailable: string[];

  public setScaffoldType(scaffoldType: string) {
    if (scaffoldType) {
      this.scaffoldType = scaffoldType;
    }
  }

  public setProjectName(solutionName) {
    this.projectName = solutionName;
  }

  public setScaffoldFrom(scaffoldFrom) {
    this.scaffoldFrom = scaffoldFrom;
  }

  public setProjectDescription(description) {
    this.projectDescription = description;
  }

  public setProjectVirtualPath(projectVirtualPath) {
    this.projectVirtualPath = projectVirtualPath || '';
  }

  public setScaffoldChoosen(scaffoldChoosen) {
    this.scaffoldChoosen = scaffoldChoosen || '';
  }

  public setModuleName(moduleName) {
    this.moduleName = moduleName || '';
  }

  public setQueryString(query) {
    this.query = query || {};
  }

  public getScaffoldsAvailable() {
    return this.scaffoldsAvailable || [];
  }

  public getQueryString() {
    const queryStr = qs.stringify(this.query);
    return queryStr ? '?' + queryStr : '';
  }

  public getToken() {
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

  public createScaffoldProject() {
    console.log(chalk.cyan(`create scaffold [${this.scaffoldType}] project starting...`));
    if (this.inArtWorkspace()) {
      return console.log(
        chalk.red('The directory contains files that could conflict.'),
        chalk.red('\nTry using a new directory and exec art create project -s="scaffold".')
      );
    }
    if (!this.scaffoldType) {
      return console.log(
        chalk.red('the property [scaffoldType] is required!')
      );
    }
    this.setScaffoldFrom(this.scaffoldFromCwd(this.scaffoldType));

    let asyncQueue;

    // ssr react
    if (this.scaffoldType === Scaffolds.ssrReact) {
      asyncQueue = [
        this.syncIgnoreFiles.bind(this),
        ...this.getSsrReactServiceRenderQueue(),
        // TODO记得
        // ...this.getSsrReactServiceWebQueue(),
        // ...this.getSsrWebReactQueue()
      ];
    } else {
      // spa、miniprogram
      asyncQueue = [
        this.syncConfigFiles.bind(this),
        this.syncArtConfig.bind(this),
        this.syncServerFiles.bind(this),
        this.syncClientFiles.bind(this)
      ];

      if (this.scaffoldType === Scaffolds.miniprogram) {
        asyncQueue.push(this.syncUpdateAppJson.bind(this));
      }
    }
    return new Promise((resolve, reject) => {
      series(asyncQueue, async (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (this.scaffoldType === Scaffolds.react) {
            await this.syncTemplateFile();
          }
          // TODO记得
          // await this.autoInstallAfterCreateProject();
        }
      });
    });
  }

  public getSsrReactServiceRenderQueue () {
    return [
      // TODO记得
      // this.syncSSRConfigFiles.bind(this, 'service-render', 'configServiceRenderMapping'),
      this.syncServiceRenderServerFiles.bind(this)
    ];
  }

  public getSsrReactServiceWebQueue () {
    return [
      this.syncSSRConfigFiles.bind(this, 'service-web', 'configServiceWebMapping'),
      this.syncSSRSrcFiles.bind(this, 'service-web')
    ];
  }

  public getSsrWebReactQueue () {
    return [
      this.syncConfigFiles.bind(this, 'web-react'),
      this.syncArtConfig.bind(this, 'web-react'),
      this.syncServerFiles.bind(this, 'web-react'),
      this.syncClientFiles.bind(this, 'web-react')
    ];
  }

  public async syncServiceRenderServerFiles (callback) {
    await require(`./${this.scaffoldType}/syncServiceRenderServerFiles.js`).call(
      this,
      join(this.scaffoldFrom, 'service-render/src'),
      join(this.scaffoldTo, 'service-render/src'),
      'service-render',
      callback
    );
    // TODO update server.ts
    await this.syncServiceRenderServerFile();
  }

  public async syncServiceRenderServerFile () {
    const syncServiceRenderServerFile = await require(`./${this.scaffoldType}/syncServiceRenderServerFile.js`);
    return await syncServiceRenderServerFile.bind(this)(join(this.scaffoldTo, 'service-render/src'), this.moduleName);
  }

  public syncSSRSrcFiles (folder, callback) {
    require(`./${this.scaffoldType}/syncServiceWebSrcFiles.js`).call(
      this,
      join(this.scaffoldFrom, folder),
      join(this.scaffoldTo, folder),
      folder,
      callback
    );
  }

  public syncSSRConfigFiles (folder, mapMethod, callback) {
    require(`./${this.scaffoldType}/syncFolderConfigFiles.js`).call(
      this,
      join(this.scaffoldFrom, folder),
      join(this.scaffoldTo, folder),
      mapMethod,
      folder,
      callback
    );
  }

  public syncIgnoreFiles (callback) {
    require(`./${this.scaffoldType}/syncIgnoreFiles.js`).call(
      this,
      this.scaffoldFrom,
      this.scaffoldTo,
      callback
    );
  }

  public async syncTemplateFile () {
    const syncTemplateFile = require(`./${this.scaffoldType}/syncTemplateFile.js`);
    return await syncTemplateFile.bind(this)(this.scaffoldTo);
  }

  public async autoInstallAfterCreateProject() {

    printInstructions(chalk.magenta(`Creating scaffold [${this.scaffoldType}] project succeed, the next step is installing dependencies!`));

    const inquirerAutoInstall = await inquirer.prompt(autoInstallQuestion).then((answer: Answers) => {
      return answer;
    });

    if (inquirerAutoInstall.autoInstall) {
      const inquirerPM = await inquirer.prompt(installManagerQuestion).then((answer: Answers) => {
        return answer;
      });
      if (this.scaffoldType === Scaffolds.ssrReact) {
        // TODO 分别进到三个文件夹 执行yarn install
        await this.installDependencyPackages(inquirerPM, 'particular', 'service-render');
        await this.installDependencyPackages(inquirerPM, 'particular', 'service-web');
        await this.installDependencyPackages(inquirerPM, 'particular', 'web-react');
        await this.installDependencyPackages(inquirerPM, 'default', 'service-render');
        await this.installDependencyPackages(inquirerPM, 'default', 'service-web');
        await this.installDependencyPackages(inquirerPM, 'default', 'web-react');
      } else {
        await this.installDependencyPackages(inquirerPM, 'default');
        await this.installDependencyPackages(inquirerPM, 'particular');
      }
    } else {
      // TODO修改 不同文件夹打印
      chalk.blue(
        `You can manually install following modules:
          ${chalk.magenta((DependencyPackages[this.scaffoldType] || []).join(' '))}
        before starting project.`
      );

      process.exit(0);
    }
  }

  private defaultDepInstallDone = false;
  private particularDepInstallDone = false;

  public installDependencyPackages(answer: Answers, type: string, execFolder?: string) {
    printInstructions(`Start installing [${this.scaffoldType}] ${type} dependency packages...`);

    let dependencyArr = [];
    if (type === 'particular') {
      const packagesArr = DependencyPackages[this.scaffoldType];
      if (isArray(packagesArr)) {
        dependencyArr = DependencyPackages[this.scaffoldType];
      } else if (isObject(packagesArr)) {
        console.log(1232323233, isArray(packagesArr), isObject(packagesArr));
        dependencyArr = packagesArr[execFolder];
        console.log('execFolder:::', execFolder);
        console.log('dependencyArr:::', dependencyArr);
      }

      dependencyArr.forEach((item) => {
        console.log(chalk.magenta(item));
      });
    }

    const spawnOptions: ISpawnOptions = {
      stdio: 'inherit'
    };

    if (execFolder) {
      spawnOptions.cwd = join(this.scaffoldTo, execFolder);
    }

    return new Promise((resolve, reject) => {
      spawn(
        answer.modulesManager,
        [
          InstallCommands[answer.modulesManager][type],
          ...dependencyArr
        ],
        spawnOptions
      ).on('close', (code) => {
        if (code === 0) {
          console.log(chalk.green(`Install ${type} dependencies successfully`));
          if (type === 'default') {
            this.defaultDepInstallDone = true;
          } else if (type === 'particular') {
            this.particularDepInstallDone = true;
          }

          if (this.defaultDepInstallDone && this.particularDepInstallDone) {
            this.autoServeModule();
          }
          resolve();
        } else {
          console.log(chalk.cyan('Install dependency packages ' + type) + ' exited with code ' + code + '.');
          reject();
        }
      }).on('error', (err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  public autoServeModule() {
    inquirer.prompt(autoServeQuestion).then((answer: Answers) => {
      if (answer.autoServe) {
        let serveProcess;
        if (isDevStage) {
          const symlinkPath = resolvePath(__dirname, `../../dist/index.js`);
          serveProcess = this.scaffoldType === Scaffolds.miniprogram ?
          executeNodeScript('node', symlinkPath, 'serve') :
          executeNodeScript('node', symlinkPath, 'serve', '-m', this.moduleName);
        } else {
          serveProcess = spawn(
            'art',
            this.scaffoldType === Scaffolds.miniprogram ?
            [
              'serve'
            ] :
            [
              'serve',
              '-m',
              this.moduleName
            ],
            {
              stdio: 'inherit'
            }
          );
        }
        serveProcess.on('close', (code) => {
          if (code !== 0) {
            console.log(chalk.cyan('serve modules') + ' exited with code ' + code + '.');
            return;
          }
        }).on('error', (err) => {
          console.log(err);
        });
      } else {
        process.exit(0);
      }
    });
  }

  public createScaffoldModule() {
    console.log(chalk.cyan(`create scaffold [${this.scaffoldType}] module starting...`));
    if (!this.inArtWorkspace()) {
      return console.log(
        chalk.red('You must run `art create module -s=""` within existed art workspace')
      );
    }

    if (!this.scaffoldType) {
      return console.log(
        chalk.red('the property [scaffoldType] is required!')
      );
    }

    this.setScaffoldFrom(this.scaffoldFromCwd(this.scaffoldType));

    const asyncQueue = [
      this.syncClientFiles.bind(this),
      this.syncServerFiles.bind(this)
    ];

    if (this.scaffoldType !== Scaffolds.miniprogram) {
      const updateArtConfig = require(`./${this.scaffoldType}/updateArtConfig.js`);
      updateArtConfig.bind(this)(this.scaffoldTo);
    } else {
      this.syncUpdateAppJson.bind(this)();
    }

    return new Promise((resolve, reject) => {
      series(asyncQueue, async (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (this.scaffoldType === Scaffolds.react) {
            await this.syncTemplateFile();
          }
          resolve(result);
         }
      });
    });
  }

  public inArtWorkspace() {
    return existsSync(join(this.scaffoldTo, 'art.config.js'));
  }

  private scaffoldFromCwd(scaffoldType) {
    return join(__dirname, '../../templates/', scaffoldType);
  }

  public syncConfigFiles(path: string = '', callback) {
    require(`./${this.scaffoldType}/syncConfigFiles.js`).call(
      this,
      join(this.scaffoldFrom, path),
      join(this.scaffoldTo, path),
      callback
    );
  }

  public syncArtConfig(path: string = '', callback) {
    require(`./${this.scaffoldType}/syncArtConfig.js`).call(
      this,
      join(this.scaffoldFrom, path),
      join(this.scaffoldTo, path),
      callback
    );
  }

  public syncServerFiles(path: string = '', callback) {
    require(`./${this.scaffoldType}/syncServerFiles.js`).call(
      this,
      join(this.scaffoldFrom, path),
      join(this.scaffoldTo, path),
      callback
    );
  }

  public syncClientFiles(path: string = '', callback) {
    require(`./${this.scaffoldType}/syncClientFiles.js`).call(
      this,
      join(this.scaffoldFrom, path),
      join(this.scaffoldTo, path),
      callback
    );
  }

  public syncUpdateAppJson(callback = () => {}) {
    require(`./miniprogram/updateAppJson.js`).call(
      this,
      this.scaffoldTo,
      callback
    );
  }
}