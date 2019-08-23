import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { IPickerBarProps } from './propTypes';
import viewport from 'art-lib-utils/src/utils/viewport';

export default class PickerBar extends CoreComponent<IPickerBarProps, any> {

  public static defaultProps = {
    title: '选择信息',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    confirmStatus: true,
    onCancel: () => {},
    onConfirm: () => {}
  };

  public render() {
    const { title, confirmButtonText, cancelButtonText, onCancel, onConfirm, confirmStatus, className, pickerBarHeight, style } = this.props;

    const pickerBarStyle = Object.assign(
      {
        height:  viewport.px2rem(pickerBarHeight),
        lineHeight: viewport.px2rem(pickerBarHeight)
      }, style
    );

    const pickerBarClass = this.classNames(`${confirmStatus ? 'v-picker-disabled-confirm' : ''}`, className);

    return (
      <div className={pickerBarClass} style={pickerBarStyle}>
        <span onClick={onCancel}>{cancelButtonText}</span>
        <span>{title}</span>
        <span onClick={onConfirm}>{confirmButtonText}</span>
      </div>
    );
  }
}