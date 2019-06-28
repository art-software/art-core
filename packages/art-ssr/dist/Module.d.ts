declare class Module {
    constructor(id: any, parent: any);
    load(filename: any): void;
    run(filename: any): void;
    require(filePath: any): any;
    _compile(content: any, filename: any): any;
    static load(id: any, filename?: any): any;
    static loadFile(file: any, parent: any): any;
    static addExtension(ext: any, f: any): void;
}
export default Module;
