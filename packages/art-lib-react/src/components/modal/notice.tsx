import CoreComponent from '../../core/CoreComponent';
import React from 'react';
import { INoticeProps } from './propstype';
import Modal from './modal';
import { showModal, closeModal } from './helper';
import { uuidWrapper } from '../uuid-wrapper';

export default class Notice extends CoreComponent<INoticeProps, any> {
  // extends IModalProps
  public static defaultProps = {
    type: undefined,
    toastInline: false
  };

  private static NoticeWrapper = uuidWrapper(Notice);

  public static show = (props: INoticeProps, duration: number = 2000) => {
    const result = showModal(Notice.NoticeWrapper, props);
    if (duration) {
      setTimeout(result.close, duration);
    }
    return result;
  }

  public static close = (instance = null) => {
    return closeModal(instance || Notice.NoticeWrapper);
  }

  public render() {
    const { type, children, toastInline, className, portalType, ...modalProps } = this.props;

    return (
      <Modal
        className={this.classNames(className, { 'toast-inline': toastInline })}
        {...this.restProps(modalProps)}
        portalType={portalType ? 'notice ' + portalType : 'notice'}
      >
        <div className="modal-notice-content">{children}</div>
      </Modal>
    );
  }
}