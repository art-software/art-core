import { Answers } from 'inquirer';
export declare const InstallCommands: {
    yarn: {
        default: string;
        particular: string;
        options: never[];
    };
    npm: {
        default: string;
        particular: string;
        options: never[];
    };
};
export default class ArtScaffold {
    /**
     * constructor
     * @param {String} solutionName e.g react-activity
     * @param {String} scaffoldType react | vue
     */
    constructor(projectName: any, scaffoldType: any);
    projectName: string;
    scaffoldType: string;
    projectDescription: string;
    scaffoldFrom: string;
    scaffoldTo: string;
    projectVirtualPath: string;
    scaffoldChoosen: string;
    moduleName: string;
    query: string;
    scaffoldsAvailable: string[];
    setScaffoldType(scaffoldType: string): void;
    setProjectName(solutionName: any): void;
    setScaffoldFrom(scaffoldFrom: any): void;
    setProjectDescription(description: any): void;
    setProjectVirtualPath(projectVirtualPath: any): void;
    setScaffoldChoosen(scaffoldChoosen: any): void;
    setModuleName(moduleName: any): void;
    setQueryString(query: any): void;
    getScaffoldsAvailable(): string[];
    getQueryString(): string;
    getToken(): {
        scaffoldType: string;
        projectDescription: string;
        projectVirtualPath: string;
        projectName: string;
        moduleName: string;
        scaffoldsAvailable: string[];
        queryString: string;
    };
    createScaffoldProject(): void | Promise<unknown>;
    syncTemplateFile(): Promise<any>;
    autoInstallAfterCreateProject(): Promise<void>;
    private defaultDepInstallDone;
    private particularDepInstallDone;
    installDependencyPackages(answer: Answers, type: string, execFolder?: string): Promise<unknown>;
    autoServeModule(): void;
    createScaffoldModule(): Promise<unknown>;
    inArtWorkspace(): boolean;
    private scaffoldFromCwd;
    syncConfigFiles(callback: any): void;
    syncArtConfig(callback: any): void;
    syncServerFiles(callback: any): void;
    syncClientFiles(callback: any): void;
    syncUpdateAppJson(callback?: () => void): void;
}
//# sourceMappingURL=ArtScaffold.d.ts.map