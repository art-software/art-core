import { Plugin, Compiler } from 'webpack';
export default class DynamicChunkNamePlugin implements Plugin {
    constructor(moduleEntry: any);
    moduleEntry: object;
    apply(compiler: Compiler): void;
    getEntryRegex(entry: string): RegExp;
    getCommonFolderRegex(): RegExp;
    getModulesGroup(modules: any[], regex: RegExp): boolean;
    getRandomString(): string;
}
//# sourceMappingURL=DynamicChunkNamePlugin.d.ts.map
