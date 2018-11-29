import React from 'react';
import './style/visible-action.less';
import CoreComponent from '../../core/CoreComponent';
import { inviewport } from './inviewport';
import { ScrollContext } from './scroll';
export default class VisibleAction extends CoreComponent {
    constructor(props, context) {
        super(props, context);
        this.hasExecutedAction = false;
        this.state = {
            visible: false
        };
        this.handleTouchMove = (iScroll) => {
            if (this.props.enable === false) {
                return;
            }
            this.setState({
                visible: this.isInViewport(iScroll)
            }, () => {
                this.execAction();
            });
        };
        this.handleNodeElem = (node) => {
            if (node) {
                this.visibleActionElem = node;
            }
        };
    }
    componentDidMount() {
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
    isInViewport(iScroll) {
        return inviewport(this.visibleActionElem, { container: iScroll, threshold: this.props.threshold });
    }
    execAction() {
        const onAction = this.props.onAction;
        if (this.props.visibleOnce) {
            if (this.hasExecutedAction === false && this.state.visible === true) {
                this.hasExecutedAction = true;
                onAction(this.state.visible, this.props.data);
            }
        }
        else {
            onAction(this.state.visible, this.props.data);
        }
    }
    render() {
        const { children } = this.props;
        return (<ScrollContext.Consumer>
        {(context) => {
            this.withIScroll = context.withScroll;
            return (<div ref={this.handleNodeElem} {...this.applyArgs('visible-action')}>
                {children}
              </div>);
        }}
      </ScrollContext.Consumer>);
    }
}
VisibleAction.defaultProps = {
    enable: true,
    data: {},
    threshold: 0,
    // only run action onece.
    visibleOnce: true,
    onAction: (visible, data) => { console.log('data:', visible, data); }
};
