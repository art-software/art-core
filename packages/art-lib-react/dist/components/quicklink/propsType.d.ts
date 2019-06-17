export interface IQuickLink {
    prfetchHref: string[];
    priority?: boolean;
    urls?: string[];
    el?: Element;
    origins?: string[] | boolean;
    ignores?: any[] | RegExp | Function;
    timeout?: number;
    timeoutFn?: Function;
    observerSelector?: string;
}
