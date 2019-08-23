var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import './style/popup.less';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import React from 'react';
import Modal from 'art-lib-react/src/components/modal';
export default class Popup extends CoreComponent {
    render() {
        const _a = this.props, { children, className, portalType } = _a, modalProps = __rest(_a, ["children", "className", "portalType"]);
        return (<Modal className={this.classNames(className)} {...this.restProps(modalProps)} portalType={portalType ? 'popup ' + portalType : 'popup'}>
        <div className="modal-popup-content">{children}</div>
      </Modal>);
    }
}
Popup.defaultProps = {
    closeTimeoutMS: 400,
    mask: false
};
