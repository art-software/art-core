import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import React from 'react';
import viewport from 'art-lib-utils/src/utils/viewport';
const CLASS_NAME = 'v-board-key';
const NUMBER_KEY_HEIGHT = 216;
export class Key extends CoreComponent {
    constructor() {
        super(...arguments);
        this.state = {
            active: false
        };
        this.onFocus = () => {
            this.setState({
                active: true
            }, () => {
                this.props.onPress(this.props.text);
            });
        };
        this.onBlur = (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                active: false
            });
        };
        this.buildClassName = (additional) => {
            // const type = this.props.type || [];
            // const types = type.map((value) => `${CLASS_NAME}--${value}`);
            return this.classNames(CLASS_NAME, additional, {
                // return this.classNames(CLASS_NAME, {
                [`${CLASS_NAME}-active`]: this.state.active,
            });
        };
    }
    render() {
        return (<i className={this.buildClassName(this.props.className)} onTouchStart={this.onFocus} onTouchMove={this.onBlur} onTouchEnd={this.onBlur} onTouchCancel={this.onBlur} style={this.props.style}>
        {this.props.text}
      </i>);
    }
}
export class RightBtnKey extends CoreComponent {
    render() {
        const style = {
            width: '100%',
            height: viewport.px2rem(NUMBER_KEY_HEIGHT),
            lineHeight: viewport.px2rem(NUMBER_KEY_HEIGHT),
            fontSize: viewport.px2rem(32)
        };
        return (<Key {...this.restProps(this.props)} style={Object.assign({}, style, this.props.style)}/>);
    }
}
export class BottomMiddleKey extends CoreComponent {
    render() {
        const style = {
            width: `${200 / 3}%`
        };
        return (<Key {...this.restProps(this.props)} style={Object.assign({}, style, this.props.style)}/>);
    }
}
