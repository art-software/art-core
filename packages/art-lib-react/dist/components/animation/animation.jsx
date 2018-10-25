import CoreComponent from '../../core/CoreComponent';
import React from 'react';
import animate from './animate';
export default class Animation extends CoreComponent {
    constructor() {
        super(...arguments);
        this.running = false;
        this.handleAnimateComplete = () => {
            this.running = false;
            if (this.props.onComplete) {
                this.props.onComplete();
            }
        };
        this.execute = () => {
            if (this.running === true) {
                return console.warn('ignore:animation is runing...');
            }
            this.running = true;
            const { delay, duration = 1000, onStep, onDelta } = this.props;
            animate({
                delay, duration, onStep, onDelta,
                onComplete: this.handleAnimateComplete
            });
        };
    }
    componentDidMount() {
        if (this.props.start) {
            this.execute();
        }
    }
    componentDidUpdate(prevProps) {
        if (this.running === false
            && this.props.start === true
            && this.props.start !== prevProps.start) {
            this.execute();
        }
    }
    render() {
        const { children, className } = this.props;
        return (<div {...this.applyArgs('animation')} className={this.classNames(className)} style={this.props.style}>
        {children}
      </div>);
    }
}
Animation.defaultProps = {
    start: false,
    delay: 16,
    duration: 1000,
    onStep: (delta) => { console.log('step: ', delta); },
    onDelta: (progress) => { console.log('delta:', progress); return progress; },
    onComplete: () => { }
};
