var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import CoreComponent from '../../core/CoreComponent';
import React from 'react';
import Modal from './modal';
import { showModal, closeModal } from './helper';
import { uuidWrapper } from '../uuid-wrapper';
export default class Notice extends CoreComponent {
    render() {
        const _a = this.props, { type, children, toastInline, className, portalType } = _a, modalProps = __rest(_a, ["type", "children", "toastInline", "className", "portalType"]);
        return (<Modal className={this.classNames(className, { 'toast-inline': toastInline })} {...this.restProps(modalProps)} portalType={portalType ? 'notice ' + portalType : 'notice'}>
        <div className="modal-notice-content">{children}</div>
      </Modal>);
    }
}
// extends IModalProps
Notice.defaultProps = {
    type: undefined,
    toastInline: false
};
Notice.NoticeWrapper = uuidWrapper(Notice);
Notice.show = (props, duration = 2000) => {
    const result = showModal(Notice.NoticeWrapper, props);
    if (duration) {
        setTimeout(result.close, duration);
    }
    return result;
};
Notice.close = (instance = null) => {
    return closeModal(instance || Notice.NoticeWrapper);
};
