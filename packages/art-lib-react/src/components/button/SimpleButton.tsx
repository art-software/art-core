import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { ISimpleButtonProps } from './propTypes';
import './styles/button.simple.less';

export default class SimpleButton extends CoreComponent<ISimpleButtonProps, any>{
  constructor(props, context) {
    super(props, context);
  }

  public static defaultProps = {
    isDisabled: false,
    hasClickFeedback: false
  };

  public state = {
    isFeedingBack: false,
  };

  public preventDefault = (event: React.MouseEvent<HTMLDivElement>) => {
    // 移动浏览器中长按元素会触发显示菜单，导致touchend事件不会触发，需要阻止该行为
    event.preventDefault();
  }

  public touchStart = () => {
    const { isDisabled } = this.props;
    if (isDisabled) { return; }
    this.setState({ isFeedingBack: true });
  }

  public touchEnd = () => {
    const { isDisabled } = this.props;
    if (isDisabled) { return; }
    // 添加一点延时，不然透明度变化太快，效果不明显
    setTimeout(() => {
      this.setState({ isFeedingBack: false });
    }, 100);
  }

  public onClick = () => {
    const { isDisabled, onClick } = this.props;
    if (isDisabled) { return; }
    if (onClick) { onClick(); }
  }

  public render() {
    const { isDisabled, hasClickFeedback, className, children } = this.props;
    const { isFeedingBack } = this.state;
    const buttonClass = this.classNames('art-button', className, { feedback: isFeedingBack, disabled: isDisabled });

    return (
      <button className={buttonClass} onClick={this.onClick}>
        {
          hasClickFeedback && (
            <div className="trigger-touch-event-layer" onContextMenu={this.preventDefault}
              onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onTouchCancel={this.touchEnd} />
          )
        }
        {children}
      </button>
    );
  }
}