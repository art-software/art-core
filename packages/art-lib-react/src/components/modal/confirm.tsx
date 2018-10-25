import React from 'react';
import CoreComponent from '../../core/CoreComponent';
import Notice from './notice';
import { IConfirmProps } from './propstype';
import { closeModal, showModal } from './helper/index';
import { uuidWrapper } from '../uuid-wrapper';
import './style/confirm.less';

export default class Confirm extends CoreComponent<IConfirmProps, any> {
  public static defaultProps = {
    title: '',
    okText: '确定',
    cancelText: '取消',
    onOk: () => { },
    onCancel: () => { }
  };

  private static ConfirmWrapper = uuidWrapper(Confirm);

  public static show = (props: IConfirmProps) => {
    if (!props.onCancel) {
      props.onCancel = () => {
        return closeModal(Confirm.ConfirmWrapper);
      };
    }
    return showModal(Confirm.ConfirmWrapper, { ...props, isOpen: true });
  }

  public static close = () => {
    return closeModal(Confirm.ConfirmWrapper);
  }

  public render() {
    const { title, okText, cancelText, onOk, onCancel, children, ...restProps } = this.props;

    return (
      <Notice {...restProps}
        portalType="confirm"
      >
        <div className="modal-confirm">
          {title ? <div className="modal-confirm-header" dangerouslySetInnerHTML={{__html: title}}></div> : null}
          <div className="modal-confirm-content">{children}</div>
          <div className="modal-confirm-footer">
            <button onClick={onCancel}>{cancelText}</button>
            <button onClick={onOk}>{okText}</button>
          </div>
        </div>
      </Notice>
    );
  }
}