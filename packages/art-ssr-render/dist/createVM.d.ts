import LUR from 'lru-cache';
interface ICreateVMOptions {
    cacheSize?: number;
    getKey?: (name: string, code: string) => string;
    environment?: any;
}
declare const _default: (options?: ICreateVMOptions) => {
    exportsCache: LUR<{}, {}>;
    run(name: string, code: string): any;
};
export default _default;
