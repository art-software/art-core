import * as webpack from 'webpack';
export declare const attachHotDevServerScripts: (entries: any) => any;
/**
 * Filtered all entries defined within art.config.js via command `art serve --modules, -m `
 *
 * @param {Boolean} keepQuery the flag indicates if we need to remove query string of entry item
 */
export declare const webpackEntries: (moduleName: string, keepQuery: boolean) => object;
/**
 * Filtered all entries defined within art.config.js via command `art serve --modules, -m `
 *
 * @param {Boolean} keepQuery the flag indicates if we need to remove query string of entry item
 */
export declare const webpackEntriesSSR: (moduleName: string, keepQuery: boolean) => object;
/**
 * Get webpack `output` element configuration
 */
export declare const webpackOutput: (moduleEntry: string) => webpack.Output;
/**
 * Get webpack `output` element configuration
 */
export declare const webpackOutputSSR: (moduleEntry: string) => webpack.Output;
//# sourceMappingURL=configWebpackModules.d.ts.map
