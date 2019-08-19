import './style/popup.less';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import React from 'react';
import { IModalProps } from 'art-lib-react/src/components/modal/propstype';
import Modal from 'art-lib-react/src/components/modal';

export default class Popup extends CoreComponent<IModalProps, any> {
  public static defaultProps = {
    closeTimeoutMS: 400,
    mask: false
  };

  public render() {
    const { children, className, portalType, ...modalProps } = this.props;
    return (
      <Modal
        className={this.classNames(className)}
        {...this.restProps(modalProps)}
        portalType={portalType ? 'popup ' + portalType : 'popup'}
      >
        <div className="modal-popup-content">{children}</div>
      </Modal>
    );
  }
}