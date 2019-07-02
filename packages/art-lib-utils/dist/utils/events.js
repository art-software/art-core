"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("./dom");
const canUseEventListeners = true;
const bind = canUseEventListeners && window.addEventListener ? 'addEventListener' : 'attachEvent';
const unbind = canUseEventListeners && window.removeEventListener ? 'removeEventListener' : 'detachEvent';
const canEventHasCapture = (bind === 'addEventListener');
const prefix = bind !== 'addEventListener' ? 'on' : '';
/**
 * Bind to DOM events during the bubble phase.
 *
 * @param target DOM element to register listener on.
 * @param eventType Event type, e.g. 'click' or 'mouseover'.
 * @param eventListener Callback function.
 * @param capture event capture phase.
 */
exports.on = (target, eventType, eventListener, capture) => {
    if (!dom_1.canUseDOM || !target) {
        return;
    }
    if (capture === true && !canEventHasCapture) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('Attempted to listen to events during the capture phase on a ' +
                'browser that does not support the capture phase. Your application ' +
                'will not receive some events.');
        }
        return {
            off: function noop() { }
        };
    }
    // Warning. Unable to preventDefault inside passive event listener due to target being treated as passive
    // If you're call preventDefault on every touchstart then you should also have a CSS rule to disable touch scrolling like .sortable-handler { touch-action: none; }
    capture = exports.isPassiveMode() ? { passive: false, capture: false } : capture || false;
    target[bind](prefix + eventType, eventListener, capture);
    return {
        off() {
            target[unbind](prefix + eventType, eventListener, capture);
        }
    };
};
/**
 * Unbind to DOM events during the bubble phase.
 *
 * @param target DOM element to register listener on.
 * @param eventType Event type, e.g. 'click' or 'mouseover'.
 * @param eventListener Callback function.
 * @param capture event capture phase.
 */
exports.off = (target, eventType, eventListener, capture) => {
    if (!dom_1.canUseDOM || !canUseEventListeners || !target) {
        return;
    }
    capture = exports.isPassiveMode() ? { passive: false, capture: false } : capture || false;
    target[unbind](prefix + eventType, eventListener, capture);
    return eventListener;
};
// ref https://github.com/WICG/EventListenerOptions/pull/30
// Passive event listeners, chrome and touch events
exports.isPassiveMode = () => {
    let supportsPassiveOption = false;
    try {
        addEventListener('test', function () { }, Object.defineProperty({}, 'passive', {
            get() {
                supportsPassiveOption = true;
            }
        }));
    }
    catch (e) { }
    return supportsPassiveOption;
};
exports.one = (node, eventNames, eventListener) => {
    if (!dom_1.canUseDOM || !canUseEventListeners || !node) {
        return;
    }
    const typeArray = eventNames.split(' ');
    const recursiveFunction = function (e) {
        if (e.currentTarget === null) {
            return;
        }
        e.currentTarget.removeEventListener(e.type, recursiveFunction, exports.isPassiveMode() ? { passive: false, capture: false } : false);
        return eventListener(e);
    };
    for (let i = typeArray.length - 1; i >= 0; i--) {
        exports.on(node, typeArray[i], recursiveFunction);
    }
};
exports.getEvent = (event) => {
    return event || window.event;
};
exports.getTarget = (event) => {
    event = exports.getEvent(event);
    return event.target || event.srcElement;
};
exports.preventDefault = (event) => {
    event = exports.getEvent(event);
    if (event.preventDefault) {
        event.preventDefault();
    }
    else {
        event.returnValue = false;
    }
};
exports.stopPropagation = (event) => {
    event = exports.getEvent(event);
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    else {
        event.cancelBubble = true;
    }
};
exports.getCharCode = (event) => {
    event = exports.getEvent(event);
    if (typeof event.charCode === 'number') {
        return event.charCode;
    }
    else {
        return event.keyCode;
    }
};
exports.eventsFor = {
    mouse: {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
    },
    touch: {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
    }
};
// Default to mouse events
exports.dragEventFor = (isTouchDevice) => {
    return isTouchDevice ? exports.eventsFor.touch : exports.eventsFor.mouse;
};
