var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from 'react';
import CoreComponent from '../../core/CoreComponent';
import Notice from './notice';
import { closeModal, showModal } from './helper/index';
import { uuidWrapper } from '../uuid-wrapper';
import './style/confirm.less';
export default class Confirm extends CoreComponent {
    render() {
        const _a = this.props, { title, okText, cancelText, onOk, onCancel, children } = _a, restProps = __rest(_a, ["title", "okText", "cancelText", "onOk", "onCancel", "children"]);
        return (<Notice {...restProps} portalType="confirm">
        <div className="modal-confirm">
          {title ? <div className="modal-confirm-header" dangerouslySetInnerHTML={{ __html: title }}></div> : null}
          <div className="modal-confirm-content">{children}</div>
          <div className="modal-confirm-footer">
            <button onClick={onCancel}>{cancelText}</button>
            <button onClick={onOk}>{okText}</button>
          </div>
        </div>
      </Notice>);
    }
}
Confirm.defaultProps = {
    title: '',
    okText: '确定',
    cancelText: '取消',
    onOk: () => { },
    onCancel: () => { }
};
Confirm.ConfirmWrapper = uuidWrapper(Confirm);
Confirm.show = (props) => {
    if (!props.onCancel) {
        props.onCancel = () => {
            return closeModal(Confirm.ConfirmWrapper);
        };
    }
    return showModal(Confirm.ConfirmWrapper, Object.assign({}, props, { isOpen: true }));
};
Confirm.close = () => {
    return closeModal(Confirm.ConfirmWrapper);
};
