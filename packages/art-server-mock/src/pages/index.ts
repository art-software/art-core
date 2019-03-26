import { Req, Res } from 'routing-controllers';
import { Request, Response } from 'express';
import sortJson from 'sort-json';
import * as path from 'path';
import * as qs from 'qs';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
import appConfig from '../config/config';
// import { webpackEntries } from '../../../art-webpack/dist/config/configWebpackModules.js';
import { reduce, merge, filter, isString } from 'lodash';
import urlJoin from 'url-join';
import chalk from 'chalk';
import * as fs from 'fs';
import glob from 'glob';
import { isWxMiniprogramEnv } from '../utils/runtimeEnv';

// TODO optimize it later
const webpackEntries = require(`../../../${ isWxMiniprogramEnv ? 'art-webpack-miniprogram' : 'art-webpack'}/dist/config/configWebpackModules.js`);
const virtualProjectName = appConfig.get('art:projectVirtualPath');
const entries = webpackEntries(true);
const publicPath = path.join(process.cwd(), './public');

interface ModuleInfoProps {
  entryKey: string;
  query: any;
  projectName: string;
  moduleName: string;
}

export default class IndexPage {

  public indexPage(@Req() req: Request, @Res() res: Response): any {
    if (!req.originalUrl || req.originalUrl.includes('/mock_api')) { return; }
    const baseUrl = (req.baseUrl || '/').replace((req as any).moduleBase, '') || '/';
    const matchedModuleInfo = this.calcuMatchedModuleInfo(baseUrl, entries);
    if (baseUrl === '/') {
      return this.renderAvailableModulesView(req, res);
    }

    const appEnv = appConfig.get('NODE_ENV') || 'development';
    const isProd = appEnv === 'production';
    if (isProd || !matchedModuleInfo) {
      // calculate the public/{module}/ if matched.
      const matchedBuiltModuleInfo = this.builtModuleMatched(baseUrl);
      if (!matchedBuiltModuleInfo) {
        return this.renderAvailableModulesView(req, res);
      }

      const { projectName, moduleName } = matchedBuiltModuleInfo;
      const moduleDir = path.join(publicPath, virtualProjectName, projectName, moduleName, '**/*.{js,css}');
      return glob(moduleDir, {}, (err, files) => {
        const bundleCss = files.filter((file) => path.extname(file) === '.css')[0];
        const bundleJs = files.filter((file) => path.extname(file) === '.js')[0];
        this.renderIndexView(req, res, matchedBuiltModuleInfo, {
          ART_CDN_ROOT: res.app.locals.ART_SERVER_HOST_ROOT,
          bundleJs: path.basename(bundleJs),
          bundleCss: path.basename(bundleCss)
        });
      });
    }

    // return real module pageview.
    return this.renderIndexView(req, res, matchedModuleInfo);
  }

  private calcuMatchedModuleInfo(pathFragment: string, queryEntries: object): ModuleInfoProps | null {
    const normalizedEntries = this.normalizeEntries(queryEntries);
    const targetModuleName = path.basename(pathFragment);
    let found: null | ModuleInfoProps = null;
    const keys = Object.keys(normalizedEntries);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const fragment = key.split('?');
      const entryKey = fragment[0];
      const queryKey = fragment[1];

      // Make sure pathFragment without prefix '/'
      if (entryKey.endsWith(pathFragment.substring(1))) {
        found = {
          entryKey,
          query: qs.parse(queryKey),
          projectName: ensureSlash(entryKey.replace(new RegExp(`^${virtualProjectName}`), '')
            .replace(new RegExp(`${targetModuleName}$`), ''), false),
          moduleName: targetModuleName
        };
        break;
      }
    }
    return found;
  }

  private normalizeEntries(entry: object): JSON {
    return sortJson(entry);
  }

  private renderAvailableModulesView(req: Request, res: Response) {
    const newEntries = reduce(this.normalizeEntries(entries), (result: any[], value, key) => {
      result.push({
        key: key.split('?')[0],
        value
      });
      return result;
    }, []);

    return res.render('normal/availableModules', {
      layout: 'guide',
      entries: newEntries,
      helpers: {
        getModuleLink: (host, key) => {
          return urlJoin(host, path.join((req as any).moduleBase, key.replace(new RegExp(`^${virtualProjectName}`), '')));
        }
      }
    });
  }

  private builtModuleMatched = (pathFragment): ModuleInfoProps | null => {
    const allConfigEntries = appConfig.get('art:webpack:entry') || {};
    const found = this.calcuMatchedModuleInfo(pathFragment, allConfigEntries);
    if (found) {
      console.log(chalk.yellow.bold('Using') + ` built module ${chalk.cyan(found.entryKey)}`);
      if (fs.existsSync(path.join(publicPath, found.entryKey, 'index.html'))) {
        return found;
      }
    }
    return null;
  }

  private renderIndexView(req: Request, res: Response, moduleInfo: ModuleInfoProps, viewData = {}) {
    const { projectName, moduleName, query } = moduleInfo;
    let layout = query.layout || 'artIndex.hbs';
    const appServer = path.join(__dirname, '../../');
    const layoutAbsPath = path.join(__dirname, '../../views/layouts', layout);
    if (!fs.existsSync(layoutAbsPath)) {
      console.log(
        chalk.red.bold(`Could not find customized layout ${path.relative(appServer, layoutAbsPath)}`)
      );
      layout = 'artIndex.hbs';
    }

    return res.render('normal/index', merge({
      layout: layout.replace(/\.hbs$/, ''),
      virtualProjectName: `${virtualProjectName}`,
      projectName: `${projectName}`,
      moduleName: `${moduleName}`,
      bundleCss: 'bundle.css',
      bundleJs: 'bundle.js',
      // Override `foo` helper only for this rendering.
      helpers: {
        normalizePath: (...args) => {
          const [host, ...restArgs] = args;
          const result = path.join(...filter(restArgs, (fragment) => isString(fragment)));
          return urlJoin(host, result.replace(/^\.+/, ''));
        }
      }
    }, viewData));
  }

}