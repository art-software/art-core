export default class Module {
    constructor(id: any, parent?: any);
    id: string;
    exports: any;
    cache: any;
    parent: any;
    filename: string | null;
    loaded: boolean;
    context: any;
    paths: any;
    load(filename: string): void;
    run(filename: string): void;
    require(filePath: string): any;
    _compile(content: any, filename: any): any;
    static load(id: any, filename: any): Module;
    static loadFile(file: any, parent: any): any;
    static addExtension(ext: any, f: any): void;
}
