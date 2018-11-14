export declare const getTime: () => number;
export declare const extend: (target: any, obj: any) => void;
export declare const isPassiveMode: () => boolean;
export declare const addEvent: (el: any, type: any, fn: any, capture?: boolean) => void;
export declare const removeEvent: (el: any, type: any, fn: any, capture?: boolean) => void;
export declare const prefixPointerEvent: (pointerEvent: any) => any;
export declare const momentum: (current: any, start: any, time: any, lowerMargin: any, wrapperSize: any, deceleration: any) => {
    destination: number;
    duration: any;
};
export declare const hasTransform: boolean;
export declare const hasPerspective: boolean;
export declare const hasTouch: boolean;
export declare const hasPointer: any;
export declare const hasTransition: boolean;
export declare const isBadAndroid: boolean;
export declare const style: {
    transform: any;
    transitionTimingFunction: any;
    transitionDuration: any;
    transitionDelay: any;
    transformOrigin: any;
    touchAction: any;
};
export declare const hasClass: (element: any, className: any) => boolean;
export declare const addClass: (element: any, className: any) => void;
export declare const removeClass: (element: any, className: any) => void;
export declare const offset: (el: any) => {
    left: number;
    top: number;
};
export declare const preventDefaultException: (el: any, exceptions: any) => any;
export declare const eventType: {
    touchstart: number;
    touchmove: number;
    touchend: number;
    mousedown: number;
    mousemove: number;
    mouseup: number;
    pointerdown: number;
    pointermove: number;
    pointerup: number;
    MSPointerDown: number;
    MSPointerMove: number;
    MSPointerUp: number;
};
export declare const ease: {
    quadratic: {
        style: string;
        fn(k: any): number;
    };
    circular: {
        style: string;
        fn(k: any): number;
    };
    back: {
        style: string;
        fn(k: any): number;
    };
    bounce: {
        style: string;
        fn(k: any): number;
    };
    elastic: {
        style: string;
        fn(k: any): number;
    };
};
export declare const tap: (e: any, eventName: any) => void;
export declare const click: (e: any) => void;
export declare const getTouchAction: (eventPassthrough: any, addPinch: any) => string;
export declare const getRect: (el: any) => {
    top: any;
    left: any;
    width: any;
    height: any;
};
declare const _default: {
    getTime: () => number;
    extend: (target: any, obj: any) => void;
    addEvent: (el: any, type: any, fn: any, capture?: boolean) => void;
    removeEvent: (el: any, type: any, fn: any, capture?: boolean) => void;
    prefixPointerEvent: (pointerEvent: any) => any;
    momentum: (current: any, start: any, time: any, lowerMargin: any, wrapperSize: any, deceleration: any) => {
        destination: number;
        duration: any;
    };
    hasTransform: boolean;
    hasPerspective: boolean;
    hasTouch: boolean;
    hasPointer: any;
    hasTransition: boolean;
    isBadAndroid: boolean;
    style: {
        transform: any;
        transitionTimingFunction: any;
        transitionDuration: any;
        transitionDelay: any;
        transformOrigin: any;
        touchAction: any;
    };
    hasClass: (element: any, className: any) => boolean;
    addClass: (element: any, className: any) => void;
    removeClass: (element: any, className: any) => void;
    offset: (el: any) => {
        left: number;
        top: number;
    };
    preventDefaultException: (el: any, exceptions: any) => any;
    eventType: {
        touchstart: number;
        touchmove: number;
        touchend: number;
        mousedown: number;
        mousemove: number;
        mouseup: number;
        pointerdown: number;
        pointermove: number;
        pointerup: number;
        MSPointerDown: number;
        MSPointerMove: number;
        MSPointerUp: number;
    };
    ease: {
        quadratic: {
            style: string;
            fn(k: any): number;
        };
        circular: {
            style: string;
            fn(k: any): number;
        };
        back: {
            style: string;
            fn(k: any): number;
        };
        bounce: {
            style: string;
            fn(k: any): number;
        };
        elastic: {
            style: string;
            fn(k: any): number;
        };
    };
    tap: (e: any, eventName: any) => void;
    click: (e: any) => void;
    getTouchAction: (eventPassthrough: any, addPinch: any) => string;
    getRect: (el: any) => {
        top: any;
        left: any;
        width: any;
        height: any;
    };
    isPassiveMode: () => boolean;
};
export default _default;
