import './style.less';
import React from 'react';
import CoreComponent from '../../core/CoreComponent';
import { IUnTouchableProps } from './propstype';
import UnTouchableService from './untouchable-service';
import { on, off } from 'art-lib-utils/src/utils/events';

export default class UnTouchable extends CoreComponent<IUnTouchableProps, any> {
  constructor(props) {
    super(props);
    this.service = new UnTouchableService(props.disableTouchMove);
    this.handleTouchStart = this.service.handleTouchStart;
    this.handleTouchMove = this.service.handleTouchMove;
  }

  private service: UnTouchableService;
  private handleTouchStart;
  private handleTouchMove;
  private touchableEl: HTMLElement;

  public componentDidMount() {
    this.service.configTouchAction(this.touchableEl);
    on(this.touchableEl, 'touchstart', this.handleTouchStart);
    on(this.touchableEl, 'touchmove', this.handleTouchMove);
  }

  public componentWillUnmount() {
    off(this.touchableEl, 'touchstart', this.handleTouchStart);
    off(this.touchableEl, 'touchmove', this.handleTouchMove);
  }

  public setTouchableRef = (el: HTMLElement | null): any => {
    if (el === null) { return; }
    this.touchableEl = el;
  }

  public render() {
    const { children } = this.props;
    return (
      <div {...this.applyArgs('un-touchable')} ref={this.setTouchableRef}>{children}</div>
    );
  }
}