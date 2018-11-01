export const isWindow = (obj) => {
    return obj !== null && obj === obj.window;
};
export const getWindow = (elem) => {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
};
export const offset = (elem) => {
    const doc = elem && elem.ownerDocument;
    if (!doc) {
        return;
    }
    const docElem = doc.documentElement;
    if (!docElem) {
        return;
    }
    let box = { top: 0, left: 0 };
    // Support: BlackBerry 5, iOS 3 (original iPhone)
    // If we don't have gBCR, just use 0,0 rather than error
    if (typeof elem.getBoundingClientRect !== 'undefined') {
        box = elem.getBoundingClientRect();
    }
    const win = getWindow(doc);
    if (!win) {
        return;
    }
    return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
    };
};
export const offsetToParentElem = (elem, parentElem) => {
    const childPos = offset(elem);
    const parentPos = offset(parentElem);
    if (!childPos || !parentPos) {
        return;
    }
    return {
        top: childPos.top - parentPos.top,
        left: childPos.left - parentPos.left
    };
};
export const getStyles = (elem) => {
    // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through 'defaultView.getComputedStyle'
    if (elem.ownerDocument && elem.ownerDocument.defaultView && elem.ownerDocument.defaultView.opener) {
        return elem.ownerDocument.defaultView.getComputedStyle(elem, '');
    }
    return window.getComputedStyle(elem, '');
};
export const accessProperty = (elem, propName) => {
    elem = elem || window;
    if (isWindow(elem)) {
        // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
        // isn't a whole lot we can do. See pull request at this URL for discussion:
        // https://github.com/jquery/jquery/pull/764
        return elem.document.documentElement['client' + propName];
    }
    // Get document width or height
    if (elem.nodeType === 9) {
        const doc = elem.documentElement;
        // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
        // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
        return Math.max(elem.body['scroll' + propName], doc['scroll' + propName], elem.body['offset' + propName], doc['offset' + propName], doc['client' + propName]);
    }
    // Get width or height on the element, requesting but not forcing parseFloat
    return parseInt(getStyles(elem)[propName.toLowerCase()], 10) || 0;
};
export const getElemWidth = (elem) => {
    return accessProperty(elem, 'Width');
};
export const getElemHeight = (elem) => {
    return accessProperty(elem, 'Height');
};
export const canUseDOM = !!(typeof window !== 'undefined'
    && window.document
    && window.document.createElement);
export const has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();
export const hasClass = (element, className) => {
    if (element.classList) {
        return !!className && element.classList.contains(className);
    }
    else {
        return ` ${element.className} `.indexOf(` ${className} `) !== -1;
    }
};
