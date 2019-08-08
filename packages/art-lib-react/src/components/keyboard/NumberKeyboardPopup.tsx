import React from 'react';
import './styles/number.keyboard.popup.less';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import Popup from '../modal/Popup';
import NumberKeyboard from './NumberKeyboard';
import { INumberKeyboardPopupProps } from './propTypes';

enum ExtraKeyText {
  delete = '删除',
  close = '完成',
  extra = '.'
}

export default class NumberKeyboardPopup extends CoreComponent<INumberKeyboardPopupProps, any> {
  public static defaultProps = {
    isOpen: false,
    mask: false,
    extraText: ExtraKeyText.extra,
    deleteText: ExtraKeyText.delete,
    closeButtonText: ExtraKeyText.close
  };

  public keyBoardAfterOpen = () => {
    if (this.props.onShow) {
      this.props.onShow();
    }
  }

  public keyBoardAfterClosed = () => {
    if (this.props.onHide) {
      this.props.onHide();
    }
  }

  public render() {
    const { isOpen, mask, onClickMask, ...numberKeyboardPopupProps } = this.props;
    return (
      <Popup
        className={`${!mask && 'v-keyboard-popup'}`}
        isOpen={isOpen}
        mask={mask}
        onRequestClose={onClickMask}
        onAfterOpen={this.keyBoardAfterOpen}
        onAfterClosed={this.keyBoardAfterClosed}>
        <NumberKeyboard {...this.restProps(numberKeyboardPopupProps)}></NumberKeyboard>
      </Popup>
    );
  }
}