export declare type RequestFunc = (url: string, data: object, config: object) => Promise<any>;
export interface RequestMethods {
    GET: RequestFunc;
    POST: RequestFunc;
    PUT: RequestFunc;
    DELETE: RequestFunc;
}
export declare const request: (method?: string) => RequestFunc;
export default function (): RequestMethods;
