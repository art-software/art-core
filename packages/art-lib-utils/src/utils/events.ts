import { canUseDOM } from './dom';
const canUseEventListeners = true;
const bind = canUseEventListeners && window.addEventListener ? 'addEventListener' : 'attachEvent';
const unbind = canUseEventListeners && window.removeEventListener ? 'removeEventListener' : 'detachEvent';
const canEventHasCapture: boolean = (bind === 'addEventListener');
const prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind to DOM events during the bubble phase.
 * 
 * @param target DOM element to register listener on.
 * @param eventType Event type, e.g. 'click' or 'mouseover'.
 * @param eventListener Callback function.
 * @param capture event capture phase.
 */
export const on = (target: Element, eventType: string, eventListener: (e: Event | MouseEvent | TouchEvent) => any, capture?): { off: () => any } | undefined => {
  if (!canUseDOM || !target) { return; }

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
  capture = isPassiveMode() ? { passive: false, capture: false } : capture || false;

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
export const off = (target: Element, eventType: string, eventListener: (e: Event | MouseEvent | TouchEvent) => any, capture?): ((e: Event | MouseEvent | TouchEvent) => any) | undefined => {
  if (!canUseDOM || !canUseEventListeners || !target) {
    return;
  }

  capture = isPassiveMode() ? { passive: false, capture: false } : capture || false;
  target[unbind](prefix + eventType, eventListener, capture);
  return eventListener;
};

// ref https://github.com/WICG/EventListenerOptions/pull/30
// Passive event listeners, chrome and touch events
export const isPassiveMode = (): boolean => {
  let supportsPassiveOption = false;
  try {
    addEventListener('test', function () { }, Object.defineProperty({}, 'passive', {
      get() {
        supportsPassiveOption = true;
      }
    }));
  } catch (e) { }
  return supportsPassiveOption;
};

export const one = (node, eventNames: string, eventListener: (e: Event | MouseEvent | TouchEvent) => any) => {
  if (!canUseDOM || !canUseEventListeners || !node) {
    return;
  }
  const typeArray = eventNames.split(' ');

  const recursiveFunction = function (e: Event | MouseEvent | TouchEvent) {
    if (e.currentTarget === null) { return; }
    e.currentTarget.removeEventListener(e.type, recursiveFunction, isPassiveMode() ? { passive: false, capture: false } as EventListenerOptions : false);
    return eventListener(e);
  };

  for (let i = typeArray.length - 1; i >= 0; i--) {
    on(node, typeArray[i], recursiveFunction);
  }
};

export const getEvent = (event: Event | MouseEvent | TouchEvent): Event | MouseEvent | TouchEvent => {
  return event || window.event;
};

export const getTarget = (event: Event | MouseEvent | TouchEvent): EventTarget | Element | null => {
  event = getEvent(event);
  return event.target || event.srcElement;
};

export const preventDefault = (event: Event | MouseEvent | TouchEvent): void => {
  event = getEvent(event);
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
};

export const stopPropagation = (event: Event | MouseEvent | TouchEvent): void => {
  event = getEvent(event);
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
};

export const getCharCode = (event: Event | MouseEvent | TouchEvent): number => {
  event = getEvent(event);
  if (typeof (event as any).charCode === 'number') {
    return (event as any).charCode;
  } else {
    return (event as any).keyCode;
  }
};

export const eventsFor = {
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
export const dragEventFor = (isTouchDevice: boolean) => {
  return isTouchDevice ? eventsFor.touch : eventsFor.mouse;
};