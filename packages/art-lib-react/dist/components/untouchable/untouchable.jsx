import './style.less';
import React from 'react';
import CoreComponent from '../../core/CoreComponent';
import UnTouchableService from './untouchable-service';
import { on, off } from 'art-lib-utils/dist/utils/events';
export default class UnTouchable extends CoreComponent {
    constructor(props) {
        super(props);
        this.setTouchableRef = (el) => {
            if (el === null) {
                return;
            }
            this.touchableEl = el;
        };
        this.service = new UnTouchableService(props.disableTouchMove);
        this.handleTouchStart = this.service.handleTouchStart;
        this.handleTouchMove = this.service.handleTouchMove;
    }
    componentDidMount() {
        this.service.configTouchAction(this.touchableEl);
        on(this.touchableEl, 'touchstart', this.handleTouchStart);
        on(this.touchableEl, 'touchmove', this.handleTouchMove);
    }
    componentWillUnmount() {
        off(this.touchableEl, 'touchstart', this.handleTouchStart);
        off(this.touchableEl, 'touchmove', this.handleTouchMove);
    }
    render() {
        const { children } = this.props;
        return (<div {...this.applyArgs('un-touchable')} ref={this.setTouchableRef}>{children}</div>);
    }
}
