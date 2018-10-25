import CoreComponent from '../../core/CoreComponent';
import React from 'react';
import { IAnimation } from './propstype';
import animate from './animate';

export default class Animation extends CoreComponent<IAnimation, any> {

  private running: boolean = false;

  public static defaultProps = {
    start: false,
    delay: 16,
    duration: 1000,
    onStep: (delta: number): void => { console.log('step: ', delta); },
    onDelta: (progress: number): number => { console.log('delta:', progress); return progress; },
    onComplete: () => { }
  };

  public componentDidMount() {
    if (this.props.start) {
      this.execute();
    }
  }

  public componentDidUpdate(prevProps) {
    if (this.running === false
      && this.props.start === true
      && this.props.start !== prevProps.start
    ) {
      this.execute();
    }
  }

  private handleAnimateComplete = () => {
    this.running = false;
    if (this.props.onComplete) {
      this.props.onComplete();
    }
  }

  private execute = () => {
    if (this.running === true) {
      return console.warn('ignore:animation is runing...');
    }
    this.running = true;
    const { delay, duration = 1000, onStep, onDelta } = this.props;
    animate({
      delay, duration, onStep, onDelta,
      onComplete: this.handleAnimateComplete
    });
  }

  public render() {
    const { children, className } = this.props;
    return (
      <div {...this.applyArgs('animation')} className={this.classNames(className)} style={this.props.style}>
        {children}
      </div>
    );
  }
}