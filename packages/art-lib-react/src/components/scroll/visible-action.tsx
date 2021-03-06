import React from 'react';
import './style/visible-action.less';
import CoreComponent from '../../core/CoreComponent';
import { IVisibleActionProps } from './propstype';
import { inviewport } from './inviewport';
import { ScrollContext, WithScroll } from './scroll';

export default class VisibleAction extends CoreComponent<IVisibleActionProps, any> {
  public static defaultProps = {
    enable: true,
    data: {},
    threshold: 0,
    // only run action onece.
    visibleOnce: true,
    onAction: (visible, data) => { console.log('data:', visible, data); }
  };

  private withIScroll: WithScroll;
  private visibleActionElem: any;
  private hasExecutedAction: boolean = false;
  public state = {
    visible: false
  };

  constructor(props, context) {
    super(props, context);
  }

  public componentDidMount() {
    if (!this.withIScroll) {
      return console.error('`visible-action` must be wrapped within Scrollbar');
    }
    this.withIScroll(true, (iScroll) => {
      this.handleTouchMove(iScroll);
      iScroll.on('scroll', () => {
        this.handleTouchMove(iScroll);
      });
    });
  }

  public handleTouchMove = (iScroll) => {
    if (this.props.enable === false) {
      return;
    }
    this.setState({
      visible: this.isInViewport(iScroll)
    }, () => {
      this.execAction();
    });
  }

  public isInViewport(iScroll) {
    return inviewport(
      this.visibleActionElem,
      { container: iScroll, threshold: this.props.threshold }
    );
  }

  private execAction() {
    const onAction = this.props.onAction;

    if (this.props.visibleOnce) {
      if (this.hasExecutedAction === false && this.state.visible === true) {
        this.hasExecutedAction = true;
        onAction(this.state.visible, this.props.data);
      }
    } else {
      onAction(this.state.visible, this.props.data);
    }
  }

  private handleNodeElem = (node) => {
    if (node) {
      this.visibleActionElem = node;
    }
  }

  public render() {
    const { children } = this.props;
    return (
      <ScrollContext.Consumer>
        {
          (context) => {
            this.withIScroll = context.withScroll;
            return (
              <div ref={this.handleNodeElem} {...this.applyArgs('visible-action')}>
                {children}
              </div>
            );
          }
        }
      </ScrollContext.Consumer >
    );
  }
}