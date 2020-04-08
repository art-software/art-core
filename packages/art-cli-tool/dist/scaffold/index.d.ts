export interface ProjectScaffold {
    projectName: string;
    projectDescription: string;
    projectVirtualPath: string;
    moduleName: string;
}
export interface ModuleScaffold {
    moduleName: string;
}
/**
 * create new art project configuration
 *
 * @param {String} scaffoldType react|vue
 * @param {String} commandType  project|module
 * @param {Object} scaffoldData ProjectScaffold | ModuleScaffold
 */
export declare const create: (scaffoldType: string, commandType: string, scaffoldData: ProjectScaffold | ModuleScaffold) => void;
//# sourceMappingURL=index.d.ts.map