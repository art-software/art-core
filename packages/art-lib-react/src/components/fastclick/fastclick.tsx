import React from 'react';
import { shallowEqual } from 'art-lib-utils/dist/utils/shallow-compare';
import CoreComponent from '../../core/CoreComponent';
const isFocused = (el) => {
  return document.activeElement === el;
};

const isTag = (el, tagName) => {
  return el && typeof el.tagName === 'string' && el.tagName.toLowerCase() === tagName.toLowerCase();
};

const isInput = (el) => {
  return isTag(el, 'input');
};

const isFocusedInput = (el) => {
  return isInput(el) && isFocused(el);
};

const isCheckbox = (el) => {
  return isInput(el) && el.type && el.type.toLowerCase() === 'checkbox';
};

const isSelect = (el) => {
  return isTag(el, 'select');
};

const isTextArea = (el) => {
  return isTag(el, 'textarea');
};

const isFocusedTextArea = (el) => {
  return isFocused(el) && isTextArea(el);
};
const triggerClick = function (target) {
  while (target && typeof target.click !== 'function') {
    target = target.parentNode;
  }

  if (!target) {
    return;
  }

  target.click();

  // if it's an input and not a checkbox, focus it
  // or if it's a select
  // or if it's a textarea
  if ((isInput(target) && !isCheckbox(target)) || isSelect(target) || isTextArea(target)) {
    target.focus();
  }
};

export default class FastClick extends CoreComponent<any, any> {

  public static defaultProps = {
    // The number of px that the finger may move before the gesture is no longer considered a tap
    threshold: 15,
    // The amount of time in ms that the finger may be down before the gesture is no longer considered a tap by this
    timeThreshold: 200
  };

  public state = {
    touchId: null,
    touchX: null,
    touchY: null,
    touchTime: null
  };

  /**
   * We only re-render if the props have changed-the state changes in this component do not affect the rendered html
   * @param nextProps
   * @returns {boolean}
   */
  public shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps);
  }

  /**
   * Clear all touch data
   * @param callback
   */
  public clearTouchData(callback?) {
    this.setState({
      touchId: null,
      touchX: null,
      touchY: null,
      touchTime: null
    }, callback);
  }

  /**
   * Handle the touch start event
   * @param e
   */
  public handleTouchStart = (e) => {
    // one+ touches means the user isn't trying to tap this element
    if (e.touches.length !== 1 || e.targetTouches.length !== 1) {
      this.clearTouchData();
      return;
    }

    const tch = e.targetTouches[0];

    this.setState({
      touchId: tch.identifier,
      touchX: tch.screenX,
      touchY: tch.screenY,
      touchTime: (new Date()).getTime()
    });
  }

  /**
   * Handle the touch move event
   * @param e
   */
  public handleTouchMove = (e) => {
    const { touchId } = this.state,
      { threshold } = this.props;

    if (touchId === null) {
      return;
    }

    if (e.touches.length !== 1 || e.targetTouches.length !== 1) {
      this.clearTouchData();
      return;
    }

    const touch = e.targetTouches[0];
    if (touchId !== touch.identifier) {
      this.clearTouchData();
      return;
    }

    // verify that the touch did not move outside the threshold
    const dist = this.calculateTouchDistanceFromOrigin(touch);
    // if it was moved farther than the allowed amount, then we should cancel the touch
    if (dist > threshold) {
      this.clearTouchData();
    }
  }

  public calculateTouchDistanceFromOrigin(touch) {
    const { touchX, touchY } = this.state;
    const { screenX, screenY } = touch;

    return Math.sqrt(Math.pow(screenX - (touchX || 0), 2) + Math.pow(screenY - (touchY || 0), 2));
  }

  public handleTouchEnd = (e) => {
    const { touchId, touchTime } = this.state;
    const { timeThreshold, threshold } = this.props;

    if (touchId === null) {
      return;
    }

    if (timeThreshold !== null) {
      // length of press exceeds the amount of time that we are doing anything for
      if (((new Date()).getTime() - (touchTime || 0) > timeThreshold)) {
        this.clearTouchData();
        return;
      }
    }

    // still a touch remaining
    if (e.touches.length !== 0) {
      this.clearTouchData();
      return;
    }

    // get the touch from the list of changed touches
    let touch = null;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const oneTouch = e.changedTouches[i];
      if (oneTouch.identifier === this.state.touchId) {
        touch = oneTouch;
        break;
      }
    }

    if (touch === null) {
      this.clearTouchData();
      return;
    }

    // verify that the touch did not move outside the threshold
    const dist = this.calculateTouchDistanceFromOrigin(touch);
    // if it was moved farther than the allowed amount, then we should cancel the touch
    if (dist > threshold) {
      this.clearTouchData();
      return;
    }

    const targetEl = (touch as any).target;

    // if it's an input where typing is allowed and it's already focused,
    // don't do anything. this is probably an attempt to move the cursor
    if ((isFocusedInput(targetEl) || isFocusedTextArea(targetEl)) && !isCheckbox(targetEl)) {
      this.clearTouchData();
      return;
    }

    // prevent the simulated mouse events
    e.preventDefault();
    // we don't need this touch end event to be handled multiple times if it's interpreted as a click
    e.stopPropagation();
    // clear the data and then trigger the click
    this.clearTouchData(() => {
      triggerClick(targetEl);
    });
  }

  public handleTouchCancel = (e) => {
    this.clearTouchData();
  }

  public render() {
    const { children, threshold, timeThreshold, ...restProps } = this.props;

    const touchProps = {
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd,
      onTouchCancel: this.handleTouchCancel
    };

    return <div {...touchProps} {...restProps}>{children}</div>;
  }
}