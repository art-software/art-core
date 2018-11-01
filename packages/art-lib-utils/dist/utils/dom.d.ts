export declare const isWindow: (obj: any) => boolean;
export declare const getWindow: (elem: any) => boolean | Window;
export declare const offset: (elem: Element) => {
    top: number;
    left: number;
} | undefined;
export declare const offsetToParentElem: (elem: Element, parentElem: Element) => {
    top: number;
    left: number;
} | undefined;
export declare const getStyles: (elem: Element) => CSSStyleDeclaration;
export declare const accessProperty: (elem: Window | Element | Document | undefined, propName: string) => number;
export declare const getElemWidth: (elem?: Window | Element | Document | undefined) => number;
export declare const getElemHeight: (elem?: Window | Element | Document | undefined) => number;
export declare const canUseDOM: boolean;
export declare const has3d: boolean;
export declare const hasClass: (element: Element, className: string) => boolean;
