import React from 'react';
import './styles/pull-to-refresh.less';
import CoreComponent from '../../core/CoreComponent';
import viewport from 'art-lib-utils/src/utils/viewport';
import Progress from '../progress';
import { prefix } from 'inline-style-prefixer';
import { ScrollContext } from '../scroll/scroll';
import { one } from 'art-lib-utils/dist/utils/events';
class Indicator extends CoreComponent {
    constructor(props, context) {
        super(props, context);
        this.setIndicatorDom = (node) => {
            if (node) {
                this.indicatorElement = node;
            }
        };
        this.state = props;
    }
    getDOM() {
        return this.indicatorElement;
    }
    getIndicatorHeight() {
        if (this.indicatorElement) {
            return this.indicatorElement.offsetHeight;
        }
        return 0;
    }
    updateUIState(props) {
        this.setState(props);
    }
    renderProgress(barProps = {}, rate, releaseTxt, pullTxt) {
        const text = this.state.refresh ? releaseTxt : pullTxt;
        return this.renderCircle(barProps, rate, text, false);
    }
    renderLoading(barProps = {}, rate, loadingText) {
        return this.renderCircle(barProps, rate, loadingText, true);
    }
    renderCircle(barProps = {}, rate, text, isLoading = false) {
        const { size = 40, gap = 1, color, shadowColor, logo } = barProps;
        const ptrClass = this.classNames({
            'ptr-loading': isLoading,
            'ptr-progress': !isLoading
        });
        const pos = viewport.px2DPIpx(gap);
        const logoStyle = {
            top: pos,
            right: pos,
            bottom: pos,
            left: pos
        };
        if (logo) {
            logoStyle.backgroundImage = 'url(' + logo + ')';
        }
        if (isLoading) {
            rate = 0.1;
        }
        return (<div className={ptrClass}>
        <Progress className={this.classNames({ anim: isLoading })} value={rate} gap={gap} size={size} color={color} hideLabel={true} shadowColor={shadowColor}>
          <div className="logo" style={logoStyle}></div>
        </Progress>
        <span>{text}</span>
      </div>);
    }
    render() {
        const { ptrStyle, barProps, rate, releaseTxt, pullTxt, loadingTxt } = this.state;
        return (<div className="indicator" ref={this.setIndicatorDom} style={ptrStyle}>
        {this.renderProgress(barProps, rate, releaseTxt, pullTxt)}
        {this.renderLoading(barProps, rate, loadingTxt)}
      </div>);
    }
}
class PullToRefresh extends CoreComponent {
    constructor(props, context) {
        super(props, context);
        this.touchGuestureRelease = true;
        this.localState = {
            from: 0,
            pull: false,
            loading: false,
            reset: false,
            distance: 0,
            height: 0,
            refresh: false,
            ptrVisibility: 'hidden'
        };
        this.handleTouchStart = (pageY) => {
            if (Math.abs(pageY) <= this.localState.height) {
                this.touchGuestureRelease = false;
                Object.assign(this.localState, {
                    from: pageY,
                    pull: true
                });
            }
        };
        this.handleTouchMove = (pageY) => {
            // make sure we are runing pulldown action.
            const { pull, from, loading } = this.localState;
            if (pull && !loading && pageY > 0) {
                const { distanceToRefresh = 50 } = this.props;
                const distance = (pageY - from) / this.getResistance();
                const refresh = distance > distanceToRefresh;
                if (this.handlePullRefreshAction(refresh, distance - distanceToRefresh)) {
                    Object.assign(this.localState, {
                        distance,
                        refresh
                    });
                    this.refreshUIState();
                }
            }
        };
        this.reset = () => {
            this.touchGuestureRelease = false;
            // Add ease animation for ptrcontent, while refresh content success.
            one(this.indicator.getDOM(), 'transitionend', () => {
                Object.assign(this.localState, { reset: false });
                this.refreshUIState();
                this.props.onTransitionEnd();
            });
            Object.assign(this.localState, {
                pull: false,
                distance: 0,
                refresh: false,
                reset: true
            });
            this.refreshUIState();
            // Delay make sure the animition has ended.
            setTimeout(() => {
                Object.assign(this.localState, {
                    loading: false
                });
                this.refreshUIState();
            }, 500);
        };
        this.handleTouchEnd = () => {
            this.touchGuestureRelease = true;
        };
        this.setPTRElem = (node) => {
            if (node) {
                this.prtElem = node;
            }
        };
        this.setIndicatorElem = (node) => {
            if (node) {
                this.indicator = node;
            }
        };
    }
    componentDidMount() {
        if (!this.withIScroll) {
            console.error('pull to refresh must be wrapped within Scrollbar');
            return;
        }
        this.withIScroll(true, (iScroll) => {
            if (!this.indicator) {
                return;
            }
            this.attachIScrollEvents(iScroll);
            Object.assign(this.localState, {
                height: this.indicator.getIndicatorHeight()
            });
            this.refreshUIState();
        });
        setTimeout(() => {
            Object.assign(this.localState, {
                ptrVisibility: 'visible'
            });
            this.refreshUIState();
        });
    }
    triggerPTR(ptrDuration) {
        if (!this.withIScroll) {
            console.error('pull to refresh must be wrapped within Scrollbar');
            return;
        }
        this.withIScroll(true, (iScroll) => {
            const { distanceToRefresh } = this.props;
            if (!distanceToRefresh) {
                return;
            }
            this.handleTouchStart(iScroll.y);
            iScroll.scrollTo(0, distanceToRefresh + 1, ptrDuration);
            setTimeout(() => {
                this.handleTouchEnd();
            }, ptrDuration);
        });
    }
    attachIScrollEvents(iScroll) {
        iScroll.on('scrollStart', (e) => {
            this.handleTouchStart(iScroll.y);
        });
        iScroll.on('scroll', (e) => {
            this.handleTouchMove(iScroll.y);
        });
        iScroll.on('refresh', (e) => {
            this.reset();
        });
        iScroll.on('scrollCancel', (e) => {
            this.handleTouchEnd();
        });
        iScroll.on('touchEnd', (e) => {
            this.handleTouchEnd();
        });
    }
    refreshUIState() {
        // DOM operator to avoid children multi re-rendering...
        // step1.re-render indicator props.
        const { barProps, rate, ptrStyle, contentStyle, vPullToRefresh, pullTxt, releaseTxt, loadingTxt } = this.getRenderProps();
        this.indicator.updateUIState(Object.assign({}, Object.assign({}, this.localState), { barProps, rate, ptrStyle, pullTxt, releaseTxt, loadingTxt }));
        if (this.prtElem) {
            const prtContent = this.prtElem.querySelector('.ptr-content');
            if (prtContent) {
                Object.assign(prtContent.style, contentStyle);
            }
            Object.keys(vPullToRefresh).forEach((key) => {
                this.prtElem.setAttribute(key, vPullToRefresh[key]);
            });
        }
    }
    getResistance() {
        return this.props.resistance || 1;
    }
    handlePullRefreshAction(refresh, threshold) {
        if (!this.touchGuestureRelease) {
            return true;
        }
        if (!refresh) {
            this.reset();
            return false;
        }
        if (threshold > 0 && threshold < (this.props.threshold || 20)) {
            Object.assign(this.localState, {
                loading: true,
                distance: this.localState.height + (this.props.threshold || 20)
            });
            this.refreshUIState();
            // The loading function should return a promise
            this.props.onReload().then(this.reset).catch(this.reset);
            return false;
        }
        return true;
    }
    getProgressbarProps() {
        const { barProps, distanceToRefresh } = this.props;
        let rate = this.localState.distance / (distanceToRefresh || 50);
        if (rate > 1) {
            rate = 1;
        }
        if (rate < 0) {
            rate = 0;
        }
        return {
            barProps,
            rate
        };
    }
    getTransformStyle(x, y) {
        return `translate(${x}px,${y}px) translateZ(0)`;
    }
    getRenderProps() {
        const { height, distance, ptrVisibility, refresh, loading, reset } = this.localState;
        const { pullTxt, releaseTxt, loadingTxt } = this.props;
        const { barProps, rate } = this.getProgressbarProps();
        const ptrTranslate = this.getTransformStyle(0, distance - height);
        const contentTranslate = this.getTransformStyle(0, distance);
        const vPullToRefresh = this.applyArgs('pull-to-refresh', this.classNames({ refresh, loading, reset }));
        const ptrStyle = prefix({
            transform: ptrTranslate,
            WebkitTransform: ptrTranslate,
            visibility: ptrVisibility
        });
        const contentStyle = prefix({
            transform: contentTranslate,
            WebkitTransform: contentTranslate
        });
        return {
            ptrStyle,
            contentStyle,
            vPullToRefresh,
            barProps,
            rate,
            refresh,
            pullTxt,
            releaseTxt,
            loadingTxt
        };
    }
    render() {
        console.log('pull-to-refresh render...');
        const { barProps, rate, refresh, ptrStyle, contentStyle, vPullToRefresh, pullTxt, releaseTxt, loadingTxt } = this.getRenderProps();
        return (<ScrollContext.Consumer>
        {(context) => {
            this.withIScroll = context.withScroll;
            return (<div {...vPullToRefresh} ref={this.setPTRElem}>
                <Indicator ref={this.setIndicatorElem} rate={rate} refresh={refresh} ptrStyle={ptrStyle} barProps={barProps} pullTxt={pullTxt} releaseTxt={releaseTxt} loadingTxt={loadingTxt}/>
                <div className="ptr-content" style={contentStyle}>
                  {this.props.children}
                </div>
              </div>);
        }}
      </ScrollContext.Consumer>);
    }
}
PullToRefresh.defaultProps = {
    pullTxt: '下拉刷新',
    releaseTxt: '释放立即刷新',
    loadingTxt: ' 加载中...',
    distanceToRefresh: 30,
    resistance: 1,
    threshold: 10,
    onTransitionEnd: () => { console.log('onTransitionEnd()..'); },
    onReload: () => {
        return new Promise((resolve) => {
            setTimeout(function () {
                console.log('onReload()...');
                resolve();
            }, 2000);
        });
    }
};
export default PullToRefresh;
