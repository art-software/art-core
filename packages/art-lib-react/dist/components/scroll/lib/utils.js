import { on, off, isPassiveMode as isPassiveModeEvent } from 'art-lib-utils/dist/utils/events';
const win = window;
const elementStyle = document.createElement('div').style;
const vendor = (function () {
    const vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
    let transform;
    for (let i = 0; i < vendors.length; i++) {
        transform = vendors[i] + 'ransform';
        if (transform in elementStyle) {
            return vendors[i].substr(0, vendors[i].length - 1);
        }
    }
    return false;
})();
function prefixStyle(styleName) {
    if (vendor === false) {
        return false;
    }
    if (vendor === '') {
        return styleName;
    }
    return vendor + styleName.charAt(0).toUpperCase() + styleName.substr(1);
}
export const getTime = Date.now || function () {
    return new Date().getTime();
};
export const extend = (target, obj) => {
    for (const i in obj) {
        target[i] = obj[i];
    }
};
// ref https://github.com/WICG/EventListenerOptions/pull/30
// Passive event listeners, chrome and touch events
export const isPassiveMode = () => {
    return isPassiveModeEvent();
};
export const addEvent = function (el, type, fn, capture = false) {
    on(el, type, fn, capture);
};
export const removeEvent = function (el, type, fn, capture = false) {
    off(el, type, fn, capture);
};
export const prefixPointerEvent = function (pointerEvent) {
    return win.MSPointerEvent ?
        'MSPointer' + pointerEvent.charAt(7).toUpperCase() + pointerEvent.substr(8) :
        pointerEvent;
};
export const momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
    let distance = current - start;
    let destination;
    let duration;
    const speed = Math.abs(distance) / time;
    deceleration = deceleration === undefined ? 0.0006 : deceleration;
    destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
    duration = speed / deceleration;
    if (destination < lowerMargin) {
        destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
        distance = Math.abs(destination - current);
        duration = distance / speed;
    }
    else if (destination > 0) {
        destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
        distance = Math.abs(current) + destination;
        duration = distance / speed;
    }
    return {
        destination: Math.round(destination),
        duration
    };
};
export const hasTransform = prefixStyle('transform') !== false;
export const hasPerspective = prefixStyle('perspective') in elementStyle;
export const hasTouch = 'ontouchstart' in win;
export const hasPointer = !!win.PointerEvent || win.MSPointerEvent; // IE10 is prefixed
export const hasTransition = prefixStyle('transition') in elementStyle;
/*
This should find all Android browsers lower than build 535.19 (both stock browser and webview)
- galaxy S2 is ok
  - 2.3.6 : `AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
  - 4.0.4 : `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
 - galaxy S3 is badAndroid (stock brower, webview)
   `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
 - galaxy S4 is badAndroid (stock brower, webview)
   `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
 - galaxy S5 is OK
   `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
 - galaxy S6 is OK
   `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
*/
export const isBadAndroid = (function () {
    const appVersion = win.navigator.appVersion;
    // Android browser is not a chrome browser.
    if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
        const safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
        if (safariVersion && typeof safariVersion === 'object' && safariVersion.length >= 2) {
            return parseFloat(safariVersion[1]) < 535.19;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
})();
export const style = {
    transform: prefixStyle('transform'),
    transitionTimingFunction: prefixStyle('transitionTimingFunction'),
    transitionDuration: prefixStyle('transitionDuration'),
    transitionDelay: prefixStyle('transitionDelay'),
    transformOrigin: prefixStyle('transformOrigin'),
    touchAction: prefixStyle('touchAction')
};
export const hasClass = function (element, className) {
    return new RegExp('(^|\\s)' + className + '(\\s|$)').test(element.className);
};
export const addClass = function (element, className) {
    if (hasClass(element, className)) {
        return;
    }
    const newclass = element.className.split(' ');
    newclass.push(className);
    element.className = newclass.join(' ');
};
export const removeClass = function (element, className) {
    if (!hasClass(element, className)) {
        return;
    }
    element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(\\s|$)', 'g'), ' ');
};
export const offset = function (el) {
    let left = -el.offsetLeft;
    let top = -el.offsetTop;
    while (el = el.offsetParent) {
        left -= el.offsetLeft;
        top -= el.offsetTop;
    }
    return {
        left,
        top
    };
};
export const preventDefaultException = function (el, exceptions) {
    for (const i in exceptions) {
        const exception = exceptions[i];
        // match regex.
        if (exception instanceof RegExp) {
            if (exception.test(el[i])) {
                return true;
            }
        }
        else if (typeof exception === 'function') {
            // function.
            return exception(el) || false;
        }
    }
    return false;
};
export const eventType = {
    touchstart: 1,
    touchmove: 1,
    touchend: 1,
    mousedown: 2,
    mousemove: 2,
    mouseup: 2,
    pointerdown: 3,
    pointermove: 3,
    pointerup: 3,
    MSPointerDown: 3,
    MSPointerMove: 3,
    MSPointerUp: 3
};
export const ease = {
    quadratic: {
        style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fn(k) {
            return k * (2 - k);
        }
    },
    circular: {
        style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
        fn(k) {
            return Math.sqrt(1 - (--k * k));
        }
    },
    back: {
        style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        fn(k) {
            const b = 4;
            return (k = k - 1) * k * ((b + 1) * k + b) + 1;
        }
    },
    bounce: {
        style: '',
        fn(k) {
            if ((k /= 1) < (1 / 2.75)) {
                return 7.5625 * k * k;
            }
            else if (k < (2 / 2.75)) {
                return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
            }
            else if (k < (2.5 / 2.75)) {
                return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
            }
            else {
                return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
            }
        }
    },
    elastic: {
        style: '',
        fn(k) {
            const f = 0.22;
            const e = 0.4;
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            return (e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1);
        }
    }
};
export const tap = function (e, eventName) {
    const ev = document.createEvent('Event');
    ev.initEvent(eventName, true, true);
    ev.pageX = e.pageX;
    ev.pageY = e.pageY;
    e.target.dispatchEvent(ev);
};
export const click = function (e) {
    const target = e.target;
    let ev;
    if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) {
        // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
        // initMouseEvent is deprecated.
        ev = document.createEvent(win.MouseEvent ? 'MouseEvents' : 'Event');
        ev.initEvent('click', true, true);
        ev.view = e.view || window;
        ev.detail = 1;
        ev.screenX = target.screenX || 0;
        ev.screenY = target.screenY || 0;
        ev.clientX = target.clientX || 0;
        ev.clientY = target.clientY || 0;
        ev.ctrlKey = !!e.ctrlKey;
        ev.altKey = !!e.altKey;
        ev.shiftKey = !!e.shiftKey;
        ev.metaKey = !!e.metaKey;
        ev.button = 0;
        ev.relatedTarget = null;
        ev._constructed = true;
        target.dispatchEvent(ev);
    }
};
export const getTouchAction = function (eventPassthrough, addPinch) {
    let touchAction = 'none';
    if (eventPassthrough === 'vertical') {
        touchAction = 'pan-y';
    }
    else if (eventPassthrough === 'horizontal') {
        touchAction = 'pan-x';
    }
    if (addPinch && touchAction !== 'none') {
        // add pinch-zoom support if the browser supports it, but if not (eg. Chrome <55) do nothing
        touchAction += ' pinch-zoom';
    }
    return touchAction;
};
export const getRect = function (el) {
    if (el instanceof SVGElement) {
        const rect = el.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        };
    }
    else {
        return {
            top: el.offsetTop,
            left: el.offsetLeft,
            width: el.offsetWidth,
            height: el.offsetHeight
        };
    }
};
export default {
    getTime,
    extend,
    addEvent,
    removeEvent,
    prefixPointerEvent,
    momentum,
    hasTransform,
    hasPerspective,
    hasTouch,
    hasPointer,
    hasTransition,
    isBadAndroid,
    style,
    hasClass,
    addClass,
    removeClass,
    offset,
    preventDefaultException,
    eventType,
    ease,
    tap,
    click,
    getTouchAction,
    getRect,
    isPassiveMode
};
