import './style.less';
import CoreComponent from '../../core/CoreComponent';
import React from 'react';
import Animation from '../animation/animation';
import { INewsTicker } from './propstype';
import viewport from 'art-lib-utils/src/utils/viewport';
import { prefix } from 'inline-style-prefixer';
import { easeInOutQuad } from '../animation/easing';
import { shallowEqual } from 'art-lib-utils/src/utils/shallow-compare';

export default class NewsTicker extends CoreComponent<INewsTicker, any> {
  constructor(props, context) {
    super(props, context);
  }
  private running: boolean = false;
  private needUpdateItemSource = null;
  private totalNeedItems: number;
  private timeoutId: number;

  public static defaultProps = {
    duration: 500,
    timePeriod: 1000,
    easing: easeInOutQuad,
    // The draft height in 750px
    itemHeight: 50,
    itemsOneRolling: 1,
    itemSource: []
  };

  public state = {
    items: [],
    start: false,
    style: prefix({ transform: this.getTransformStyle(0, 0) })
  };

  public componentDidMount() {
    // If we hardcode initialized itemsource data.
    // manually invoke animation
    if (this.props.itemSource.length) {
      this.setState({
        items: this.convertItems(this.props.itemSource as any)
      }, this.startAnimation);
    }
  }

  public componentWillReceiveProps(nextProps) {
    if (shallowEqual(nextProps.itemSource, this.props.itemSource)) {
      return;
    }
    if (this.running === true) {
      console.log('componentWillReceiveProps');
      this.needUpdateItemSource = nextProps.itemSource;
      return;
    }
    this.setState({
      items: this.convertItems(nextProps.itemSource)
    }, this.startAnimation);
  }

  private getItemHeight() {
    return viewport.px2DPIpx(this.props.itemHeight);
  }

  private getTransformStyle(x: number, y: number): string {
    return `translate(${x}px,${y}px) translateZ(0)`;
  }

  public handleStep = (delta: number) => {
    const itemHeight = parseFloat(this.getItemHeight());
    const itemsOneRolling = this.props.itemsOneRolling as number;
    this.setState({
      style: prefix({
        transform: this.getTransformStyle(0, -delta * itemHeight * itemsOneRolling)
      })
    });
  }

  public handleDelta = (progress) => {
    const easing = this.props.easing as any;
    return easing(progress);
  }

  public handleComplete = () => {
    this.running = false;
    if (this.needUpdateItemSource !== null) {
      const items = this.convertItems(this.needUpdateItemSource || []);
      this.needUpdateItemSource = null;
      this.setState({
        start: false,
        style: prefix({ transform: this.getTransformStyle(0, 0) }),
        items
      }, this.startAnimation);
    } else {
      const items = this.getNewSortedItems(this.state.items);
      this.setState({
        start: false,
        style: prefix({ transform: this.getTransformStyle(0, 0) }),
        items
      }, this.startAnimation);
    }
  }

  private convertItems(items = []) {
    if (items.length && items.length < this.totalNeedItems) {
      items = items.concat(items.slice(0, this.totalNeedItems - items.length));
      return this.convertItems(items);
    }
    return items;
  }

  private startAnimation = () => {
    clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(() => {
      this.running = true;
      // starting animation.
      this.setState({ start: true });
    }, this.props.timePeriod);
  }

  public getNewSortedItems(oldItems: any[]) {
    const copyItems = oldItems.slice(0, oldItems.length);
    return copyItems.concat(
      copyItems.splice(0, this.props.itemsOneRolling)
    );
  }

  public renderItems() {
    const itemHeight = this.getItemHeight();
    const { onItemCmpGet } = this.props;
    const newItems: any[] = [];
    if (!onItemCmpGet) {
      throw new Error('onItemCmpGet is required!');
    }
    this.state.items.forEach((item: any, index) => {
      newItems.push(
        React.cloneElement(onItemCmpGet(item), {
          style: {
            height: itemHeight,
            lineHeight: itemHeight
          },
          key: index,
          className: 'news-item'
        })
      );
    });

    return newItems;
  }

  public render() {
    const { duration } = this.props;
    const itemHeight = parseFloat(this.getItemHeight());
    const itemsOneRolling = this.props.itemsOneRolling || NewsTicker.defaultProps.itemsOneRolling;
    const tickerStyle = { height: itemHeight * itemsOneRolling };

    return (
      <div {...this.applyArgs('news-ticker')} className={this.classNameWithProps()}>
        <Animation
          className="news-ticker"
          style={tickerStyle}
          start={this.state.start}
          duration={duration}
          onStep={this.handleStep}
          onDelta={this.handleDelta}
          onComplete={this.handleComplete}
        >
          <div className="news-items" style={this.state.style}>
            { this.renderItems() }
          </div>
        </Animation>
      </div>
    );
  }
}