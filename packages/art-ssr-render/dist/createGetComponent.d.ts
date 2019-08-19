interface IVMOptions {
    getKey?: (name: string, code: string) => string;
    environment?: any;
}
declare const _default: (files: {
    [key: string]: string;
}, vmOptions?: IVMOptions | undefined) => (name: any) => any;
export default _default;
