/**
 * Bind to DOM events during the bubble phase.
 *
 * @param target DOM element to register listener on.
 * @param eventType Event type, e.g. 'click' or 'mouseover'.
 * @param eventListener Callback function.
 * @param capture event capture phase.
 */
export declare const on: (target: Element, eventType: string, eventListener: (e: Event | MouseEvent | TouchEvent) => any, capture?: any) => {
    off: () => any;
} | undefined;
/**
 * Unbind to DOM events during the bubble phase.
 *
 * @param target DOM element to register listener on.
 * @param eventType Event type, e.g. 'click' or 'mouseover'.
 * @param eventListener Callback function.
 * @param capture event capture phase.
 */
export declare const off: (target: Element, eventType: string, eventListener: (e: Event | MouseEvent | TouchEvent) => any, capture?: any) => ((e: Event | MouseEvent | TouchEvent) => any) | undefined;
export declare const isPassiveMode: () => boolean;
export declare const one: (node: any, eventNames: string, eventListener: (e: Event | MouseEvent | TouchEvent) => any) => void;
export declare const getEvent: (event: Event | MouseEvent | TouchEvent) => Event | MouseEvent | TouchEvent;
export declare const getTarget: (event: Event | MouseEvent | TouchEvent) => EventTarget | Element | null;
export declare const preventDefault: (event: Event | MouseEvent | TouchEvent) => void;
export declare const stopPropagation: (event: Event | MouseEvent | TouchEvent) => void;
export declare const getCharCode: (event: Event | MouseEvent | TouchEvent) => number;
export declare const eventsFor: {
    mouse: {
        start: string;
        move: string;
        end: string;
    };
    touch: {
        start: string;
        move: string;
        end: string;
    };
};
export declare const dragEventFor: (isTouchDevice: boolean) => {
    start: string;
    move: string;
    end: string;
};
