declare type Api = (o: any, p?: any[]) => any;
declare type returnType = (o: any, p: any[]) => Promise<any>;
declare const _default: (api: Api) => returnType;
export default _default;
