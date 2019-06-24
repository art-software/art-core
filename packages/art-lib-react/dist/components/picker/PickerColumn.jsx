import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import Scroll from 'art-lib-react/src/components/scroll';
import viewport from 'art-lib-utils/src/utils/viewport';
import './styles';
const CLASS_NAME = 'v-picker-column';
export default class PickerColumn extends CoreComponent {
    constructor(props, context) {
        super(props, context);
        this.currentIndex = 0;
        this.isLastEnd = true;
        this.isStopRun = true;
        /**
         * @description validate visibleItemCount
         */
        this.validateProps = () => {
            const { visibleItemCount } = this.props;
            if (visibleItemCount % 2 === 0) {
                throw new Error(`visibleItemCount的值为${visibleItemCount}，但是要求它的值必须为奇数。`);
            }
        };
        this.state = {
            dataList: [],
            runningIndex: 0
        };
        /**
         * @description 重置running状态
         */
        this.handelScrollStart = () => {
            this.isStopRun = true;
        };
        this.handleScrollEnd = () => {
            const state = this.state;
            // if same X and Y position, don't need trigger scrollTo, if trigger will be endless loop
            if (this.restScrollPosition() || this.isRangeFrontier()) {
                this.handleSelected(state.dataList[this.currentIndex], false);
            }
        };
        /**
         * @description judge is scroll at range frontier
         */
        this.isRangeFrontier = () => {
            if (this.scroll.y === 0 || this.scroll.y === this.scroll.maxScrollY) {
                return true;
            }
            return false;
        };
        this.handleScrollCancel = () => {
            this.restScrollPosition();
        };
        this.handleScroll = () => {
            this.getRunningSelected();
            if (this.props.onRunning) {
                this.props.onRunning(this.isStopRun);
            }
        };
        this.getRunningSelected = () => {
            this.setState({
                runningIndex: this.getCurrentIndex()
            });
        };
        /**
         * @description rest scroll position to the choose item
         * @returns {boolean} true will trigger scrollTo and selected
         */
        this.restScrollPosition = () => {
            const itemHeight = this.props.itemHeight;
            this.currentIndex = this.getCurrentIndex();
            const finalScrollY = Number(this.getpx2DPIpx(-(itemHeight) * this.currentIndex));
            // every trigger scrollTo，will also trigger ScrollendEvent.
            // 该判断内容用于在调用了一次end之后只再调用一次end，用于回正触发cancel时产生的位置错乱
            if ((this.scroll.y === finalScrollY ||
                this.scroll.y <= this.scroll.maxScrollY)
                && this.isLastEnd) {
                this.isLastEnd = false;
                this.scroll.scrollTo(0, finalScrollY, 300);
                return false;
            }
            // 该判断用于结束掉scrollEnd的循环，并设置running已结束
            if ((this.scroll.y === finalScrollY ||
                this.scroll.y <= this.scroll.maxScrollY)) {
                this.isLastEnd = true;
                this.isStopRun = false;
                this.handleScroll();
                return false;
            }
            this.scroll.scrollTo(0, finalScrollY, 300);
            return true;
        };
        this.getColumnHeight = () => {
            const { itemHeight, visibleItemCount } = this.props;
            return this.getpx2DPIpx(itemHeight * visibleItemCount, false);
        };
        this.emptyPlaceholderRender = () => {
            const { itemHeight } = this.props;
            const emotyItemArray = [];
            const DpiItemHeight = this.getpx2DPIpx(itemHeight, false);
            const pickerItemStyle = {
                height: DpiItemHeight,
                lineHeight: DpiItemHeight
            };
            for (let i = 0; i < this.placeholderPartsNum; i++) {
                emotyItemArray.push(<div key={i} style={pickerItemStyle} className={this.buildClassName('item')}></div>);
            }
            return emotyItemArray;
        };
        this.getPickerItemRender = () => {
            const { itemHeight } = this.props;
            const pickerViewList = [];
            const DpiItemHeight = this.getpx2DPIpx(itemHeight, false);
            this.state.dataList.forEach((item, index) => {
                const pickerItemStyle = {
                    height: DpiItemHeight,
                    lineHeight: DpiItemHeight
                };
                const className = `${this.buildClassName('item')}
      ${index === this.state.runningIndex ? this.buildClassName('selected') : ''}
      ${item.className}`;
                pickerViewList.push(<div key={index} style={pickerItemStyle} className={className}><span>{item.value}</span></div>);
            });
            return pickerViewList;
        };
        this.setScrollRef = (ref) => {
            /**
             * 基于scroll组件实现picker
             * 每一次scrollTo，都会调用一次ScrollendEvent！
             * 1.自动停止效果 先调用end, end事件中使用scrollTo归置位置，再次触发ScrollendEvent，然后根据 y值 对比停止scrollTo
             * 2.人为阻止scroller结束时，执行顺序为 scrollEnd => scrollCancel，cancel事件中使用scrollTo归置位置,会再次使用scrollEnd
             */
            this.scrollRef = ref;
            if (ref) {
                this.handelScrollReady(this.currentIndex, (scroll) => {
                    this.scroll = scroll;
                    scroll.on('scrollEnd', this.handleScrollEnd);
                    scroll.on('scroll', this.handleScroll);
                    scroll.on('scrollCancel', this.handleScrollCancel);
                    scroll.on('scrollStart', this.handelScrollStart);
                });
            }
        };
        /**
         * @description load scroll and reset position
         */
        this.handelScrollReady = (currentIndex, callback) => {
            this.scrollRef.withScroll(true, (scroll) => {
                this.scroll = scroll;
                const scrollY = Number(viewport.px2DPIpx(-(this.props.itemHeight) * currentIndex).slice(0, -2));
                scroll.scrollTo(0, scrollY);
                if (callback) {
                    callback(scroll);
                }
            });
        };
        /**
         * @description will event trigger prop onSelected
         * @param  {IColumnValue} selectedItem, selected item
         * @param {boolean} isFirstChoose judge this selected is load trigger
         */
        this.handleSelected = (selectedItem, isFirstChoose) => {
            if (this.props.onSelected) {
                this.props.onSelected(selectedItem, isFirstChoose);
            }
        };
        /**
         * @description 用于触发生成当前选择组件中的内容x
         * 通常通过外部 获取ref触发该方法，该方法触发prop.updateDataSource,并从中获取对应list数据
         * columnsData，中 dataList为list数据， selectedId 则可设置默认选中相
         */
        this.updateDataSource = () => {
            this.currentIndex = 0;
            this.setState({ runningIndex: 0 });
            return new Promise((resolve) => {
                this.props.updateDataSource().then((columnsData) => {
                    const { dataList, selectedId } = columnsData;
                    let currentItem = {};
                    if (dataList.length) {
                        if (selectedId) {
                            dataList.find((value, index) => {
                                if (value.id === selectedId) {
                                    this.currentIndex = index;
                                    this.setState({ runningIndex: index });
                                }
                                return value.id === selectedId;
                            });
                        }
                        currentItem = dataList[this.currentIndex];
                    }
                    this.setState({ dataList });
                    this.handelScrollReady(this.currentIndex);
                    this.handleSelected(currentItem, true);
                    resolve();
                }).catch(() => { });
            });
        };
        this.buildClassName = (additional, hasBaseClass = false) => {
            return this.classNames({
                [CLASS_NAME]: hasBaseClass
            }, `${CLASS_NAME}-${additional}`);
        };
        this.getCoverLineStyle = (site) => {
            const { itemHeight, visibleItemCount } = this.props;
            switch (site) {
                case 'top':
                    return {
                        top: this.getpx2DPIpx(itemHeight * Math.floor(visibleItemCount / 2), false)
                    };
                case 'bottom':
                    return {
                        top: this.getpx2DPIpx(itemHeight * Math.ceil(visibleItemCount / 2), false)
                    };
            }
        };
        this.getCurrentIndex = () => {
            return Math.round(Math.abs(this.scroll.y) / Number(this.getpx2DPIpx(this.props.itemHeight)));
        };
        this.validateProps();
        this.placeholderPartsNum = Math.floor(this.props.visibleItemCount / 2);
    }
    getpx2DPIpx(num, removeUnit = true) {
        const DPIpx = viewport.px2DPIpx(num);
        return removeUnit ? DPIpx.slice(0, -2) : DPIpx;
    }
    render() {
        return (<div className={this.classNames('picker-column-block', this.props.className)}>
        <Scroll height={this.getColumnHeight()} ref={this.setScrollRef}>
          <div>
            <div>
              {this.emptyPlaceholderRender()}
            </div>
            <div className={this.buildClassName('choose-list')}>
              {this.getPickerItemRender()}
            </div>
            <div>
              {this.emptyPlaceholderRender()}
            </div>
          </div>
        </Scroll>
        <div className="cover-line" style={this.getCoverLineStyle('top')}></div>
        <div className="cover-line" style={this.getCoverLineStyle('bottom')}></div>
      </div>);
    }
}
PickerColumn.defaultProps = {
    itemHeight: 88,
    visibleItemCount: 5,
    updateDataSource: () => Promise.resolve()
};
