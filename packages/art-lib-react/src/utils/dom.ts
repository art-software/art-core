export const isWindow = (obj: any): boolean => {
  return obj !== null && obj === obj.window;
};

export const getWindow = (elem: any): Window | boolean => {
  return isWindow(elem) ? elem : elem.nodeType === 9 && (elem as Document).defaultView;
};

export const offset = (elem: Element): undefined | { top: number, left: number } => {
  const doc = elem && elem.ownerDocument;
  if (!doc) { return; }
  const docElem = doc.documentElement;

  let box = { top: 0, left: 0 };
  // Support: BlackBerry 5, iOS 3 (original iPhone)
  // If we don't have gBCR, just use 0,0 rather than error
  if (typeof elem.getBoundingClientRect !== 'undefined') {
    box = elem.getBoundingClientRect();
  }
  const win = getWindow(doc);
  if (!win) { return; }

  return {
    top: box.top + (win as Window).pageYOffset - docElem.clientTop,
    left: box.left + (win as Window).pageXOffset - docElem.clientLeft
  };
};

export const offsetToParentElem = (elem: Element, parentElem: Element): undefined | { top: number, left: number } => {
  const childPos = offset(elem);
  const parentPos = offset(parentElem);

  if (!childPos || !parentPos) { return; }
  return {
    top: childPos.top - parentPos.top,
    left: childPos.left - parentPos.left
  };
};

export const getStyles = (elem: Element): CSSStyleDeclaration => {
  // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
  // IE throws on elements created in popups
  // FF meanwhile throws on frame elements through 'defaultView.getComputedStyle'
  if (elem.ownerDocument && elem.ownerDocument.defaultView.opener) {
    return elem.ownerDocument.defaultView.getComputedStyle(elem, '');
  }
  return window.getComputedStyle(elem, '');
};

export const accessProperty = (elem: Element | Window | Document | undefined, propName: string): number => {
  elem = elem || window;
  if (isWindow(elem)) {
    // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
    // isn't a whole lot we can do. See pull request at this URL for discussion:
    // https://github.com/jquery/jquery/pull/764
    return (elem as Window).document.documentElement['client' + propName];
  }

  // Get document width or height
  if ((elem as Document).nodeType === 9) {
    const doc = (elem as Document).documentElement;
    // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
    // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
    return Math.max(
      (elem as Document).body['scroll' + propName], doc['scroll' + propName],
      (elem as Document).body['offset' + propName], doc['offset' + propName],
      doc['client' + propName]
    );
  }

  // Get width or height on the element, requesting but not forcing parseFloat
  return parseInt(getStyles(elem as Element)[propName.toLowerCase()], 10) || 0;
};

export const getElemWidth = (elem?: Element | Window | Document): number => {
  return accessProperty(elem, 'Width');
};

export const getElemHeight = (elem?: Element | Window | Document): number => {
  return accessProperty(elem, 'Height');
};

export const canUseDOM: boolean = !!(
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement
);

export const has3d: boolean = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();

export const hasClass = (element: Element, className: string): boolean => {
  if (element.classList) {
    return !!className && element.classList.contains(className);
  } else {
    return ` ${element.className} `.indexOf(` ${className} `) !== -1;
  }
};