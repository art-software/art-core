import './style.less';
import CoreComponent from '../../core/CoreComponent';
import { getStyles } from 'art-lib-utils/dist/utils/dom';
import React from 'react';
import viewport from 'art-lib-utils/dist/utils/viewport';
import Scroll from '../../components/scroll';
import { isFunction } from 'art-lib-utils/dist/utils/lang';
import Indicator from './indicator';
import { getElemHeight } from 'art-lib-utils/dist/utils/dom';
export default class Swiper extends CoreComponent {
    constructor(props, context) {
        super(props, context);
        this.id = 'swiper' + new Date().getTime();
        this.hasEffects = false;
        this.snapStepLast = 0;
        this.cloneNum = 0;
        this.stopAutoPlay = false;
        // 解决slidesPerView大于1的情况下，最后一帧touchmove距离大于剩余距离时，瞬间回弹bug
        this.startX = 0;
        this.snapStepX = 0;
        this.forceUpdateSwiper = () => {
            this.adjustStates(this.props);
        };
        this.adjustStates = (props) => {
            const { children, slidesPerView } = props;
            this.cloneNum = 0;
            this.stopAutoPlay = false;
            Object.assign(this.state, {
                loop: props.loop,
                currentPage: 0,
                pages: children.length,
                autoPlayInterval: props.autoPlayInterval,
                swipeItems: children,
                showPagination: props.showPagination,
                slidesPerView: props.slidesPerView
            });
            // Make sure we really need to update current slideIndex.
            if (this.props.initialSlideIndex !== props.initialSlideIndex) {
                Object.assign(this.state, {
                    initialSlideIndex: props.initialSlideIndex
                });
            }
            if (children.length <= 1) {
                Object.assign(this.state, {
                    // showPagination: false,
                    autoPlayInterval: false,
                    initialSlideIndex: 0,
                    loop: false
                });
            }
            if (slidesPerView && (slidesPerView < 1 || slidesPerView > 2)) {
                Object.assign(this.state, { slidesPerView: 1 });
            }
            // const swipeItems = Object.assign([] as JSX.Element[], children);
            const swipeItems = [];
            for (let index = 0; index < children.length; index++) {
                // swipeItems[index].key = index;
                const swipeElement = React.cloneElement(children[index], { key: index });
                swipeItems.push(swipeElement);
            }
            // swiperItems.length > 0
            if (props.loop && swipeItems.length > 1) {
                ++this.cloneNum;
                if (slidesPerView > 1) {
                    ++this.cloneNum;
                }
                const first = React.cloneElement(swipeItems[0], { key: 10000 });
                const last = React.cloneElement(swipeItems[swipeItems.length - 1], { key: 10001 });
                const first_2 = React.cloneElement(swipeItems[1], { key: 10002 });
                const last_2 = React.cloneElement(swipeItems[swipeItems.length - 2], { key: 10003 });
                swipeItems.push(first);
                swipeItems.unshift(last);
                if (slidesPerView > 1) {
                    swipeItems.push(first_2);
                    swipeItems.unshift(last_2);
                }
            }
            this.setState({
                initialSlideIndex: props.initialSlideIndex + this.cloneNum,
                swipeItems
            }, () => {
                this.initScroll(this.initSwiper);
            });
        };
        this.initScroll = (callback) => {
            console.log('initScroll()...');
            if (!this.scroll.withScroll) {
                return;
            }
            // Note: scroll will be re-instance many times if scroll.options changed.
            // So we should always using withIScroll(true, ()=>{}) to wait lastest iscroll instance
            this.scroll.withScroll(true, (scroll) => {
                // if (this.scroll !== scroll) {
                this.bindScrollEvents(scroll);
                // this.scroll = scroll;
                // }
                if (callback) {
                    callback(scroll);
                }
            });
        };
        this.clearTimeout = () => {
            clearTimeout(this.timeout);
        };
        this.handleTouchStart = (event) => {
            this.stopAutoPlay = true;
            this.clearTimeout();
            const touch = event.changedTouches[0];
            this.startX = touch.clientX;
        };
        this.handleTouchMove = (event) => {
            const { currentPage, pages, slidesPerView } = this.state;
            const { centeredSlides } = this.props;
            const touch = event.changedTouches[0];
            const distX = touch.clientX - this.startX;
            const moveNext = currentPage === pages - 2
                && (distX <= -this.scrollProbe.wrapperWidth
                    || (distX <= -this.snapStepLast && !centeredSlides))
                && slidesPerView > 1
                && this.stopAutoPlay;
            if (moveNext) {
                this.scrollProbe.next();
            }
            event.preventDefault();
        };
        this.handleTouchEnd = (event) => {
            if (this.props.isTouchStopAutoPlay === false && this.props.children.length > 1) {
                this.setAutoPlay(true);
            }
        };
        this.scrollElem = (scroll) => {
            this.scroll = scroll;
        };
        this.handleScrollbarInitialize = (scrollProbe) => {
            console.log('scrollbar.onInitialize() new iscroll instance: ', scrollProbe);
            if (this.scrollProbe !== scrollProbe) {
                this.scrollProbe = scrollProbe;
                this.bindScrollEvents(scrollProbe);
            }
            this.initSwiper();
        };
        this.getScrollInstance = () => {
            if (this.props.getScrollInstance) {
                this.props.getScrollInstance(this.scrollProbe);
            }
        };
        this.updateCurrentPage = (callback = () => { }) => {
            let currentPage = this.scrollProbe.currentPage.pageX;
            const { pages, loop } = this.state;
            const maxPage = pages + this.cloneNum - 1;
            const { maxScrollX, x } = this.scrollProbe;
            if (loop) {
                if (currentPage > maxPage) {
                    currentPage = this.cloneNum;
                    this.scrollProbe.goToPage(this.cloneNum, 0, 0);
                }
                if (currentPage < this.cloneNum) {
                    currentPage = maxPage;
                    this.scrollProbe.goToPage(maxPage, 0, 0);
                }
                if (x >= 0) {
                    currentPage = maxPage - this.cloneNum + 1;
                    this.scrollProbe.goToPage(currentPage, 0, 0);
                }
                if (Math.abs(x) >= Math.abs(maxScrollX)) {
                    this.scrollProbe.goToPage(this.cloneNum, 0, 0);
                }
                if (this.hasEffects) {
                    this.create3DStyle();
                }
            }
            this.setState({ currentPage }, callback);
        };
        this.initSwiper = () => {
            // initialSlideIndex && autoPlayInterval
            this.setState(Object.assign({}, this.state), () => {
                this.scrollProbe.goToPage(this.state.initialSlideIndex, 0, 0);
                this.updateCurrentPage();
                if (this.hasEffects) {
                    this.create3DStyle();
                }
                if (this.state.autoPlayInterval) {
                    this.clearTimeout();
                    this.autoPlay(this.state.autoPlayInterval);
                }
                if (this.props.onScrollInit) {
                    this.props.onScrollInit(this.scrollProbe);
                }
            });
        };
        this.autoPlay = (interval) => {
            const { pages, loop } = this.state;
            if (this.stopAutoPlay) {
                this.clearTimeout();
                return;
            }
            this.timeout = window.setTimeout(() => {
                const { currentPage } = this.state;
                const next = currentPage + 1;
                // debugger;
                this.scrollProbe.goToPage(next, 0);
                if (loop || (!loop && next < pages - 1)) {
                    this.autoPlay(interval);
                }
                else {
                    this.clearTimeout();
                }
            }, interval);
        };
        this.create3DStyle = () => {
            switch (this.props.effect) {
                case 'coverflow':
                    this.coverflowStyle();
                    break;
                case 'rotateflow':
                    this.rotateflowStyle();
                    break;
                case 'slantScaleFlow':
                    this.slantScaleFlowStyle();
                    break;
                default:
                    break;
            }
        };
        this.coverflowStyle = () => {
            const { flowRotation = 40, flowDepth = 40, flowShadow } = this.props;
            const slides = document.querySelectorAll('#' + this.id + ' .swiper-item');
            if (!slides) {
                console.log('no swiper item found.');
                return;
            }
            for (let i = 0; i < slides.length; i++) {
                const x = -Math.round(this.scrollProbe.x + this.snapStepX * i);
                const slideElement = slides[i];
                const shadowLeft = slideElement.querySelector('.shadow .swiper-slide-shadow-left');
                const shadowRight = slideElement.querySelector('.shadow .swiper-slide-shadow-right');
                // rotateY
                let rotateY = x * flowRotation / this.snapStepX;
                // translateZ
                let translateZ = -Math.abs(x * flowDepth / this.snapStepX);
                // Fix for ultra small values
                if (Math.abs(rotateY) < 0.001) {
                    rotateY = 0;
                }
                if (Math.abs(translateZ) < 0.001) {
                    translateZ = 0;
                }
                const slideTransform = `translate3d(0,0,${translateZ}px) rotateY(${rotateY}deg)`;
                slideElement.style.webkitTransform = slideTransform;
                slideElement.style.transform = slideTransform;
                if (flowShadow) {
                    let opacity = x * 1 / this.snapStepX;
                    let shadowLeftOpacity = opacity > 0 ? 0 : Math.abs(opacity);
                    let shadowRightOpacity = opacity > 0 ? 0 : Math.abs(opacity);
                    if (shadowLeftOpacity > 1) {
                        shadowLeftOpacity = 1;
                    }
                    if (shadowRightOpacity > 1) {
                        shadowRightOpacity = 1;
                    }
                    if (Math.abs(opacity) < 0.001) {
                        opacity = 0;
                    }
                    shadowLeft.style.opacity = `${shadowLeftOpacity}`;
                    shadowRight.style.opacity = `${shadowRightOpacity}`;
                }
            }
        };
        this.rotateflowStyle = () => {
            const { flowRotation = 20, flowDepth = 20 } = this.props;
            const slides = document.querySelectorAll('#' + this.id + ' .swiper-item');
            if (!slides) {
                console.log('no swiper item found.');
                return;
            }
            for (let i = 0; i < slides.length; i++) {
                const x = -Math.round(this.scrollProbe.x + this.snapStepX * i);
                const slideElement = slides[i];
                // const shadowLeft = slideElement.querySelector('.shadow .swiper-slide-shadow-left') as HTMLElement;
                // const shadowRight = slideElement.querySelector('.shadow .swiper-slide-shadow-right') as HTMLElement;
                // rotate
                let rotate = x * flowRotation / this.snapStepX;
                let opacity = 1 - Math.abs(x / this.snapStepX);
                let translateY = -Math.abs(x * flowDepth / this.snapStepX);
                // Fix for ultra small values
                if (Math.abs(rotate) < 0.001) {
                    rotate = 0;
                }
                if (Math.abs(translateY) < 0.001) {
                    translateY = 0;
                }
                if (Math.abs(opacity) < 0.001) {
                    opacity = 0;
                }
                // const slideTransform = `translate3d(0,0,${translateZ}px) rotate(${rotate}deg)`;
                const slideTransform = `translate3d(0px,${translateY}px,0px) rotate(${-rotate}deg)`;
                slideElement.style.webkitTransform = slideTransform;
                slideElement.style.transform = slideTransform;
                slideElement.style.opacity = `${opacity}`;
            }
        };
        this.slantScaleFlowStyle = () => {
            const slides = document.querySelectorAll('#' + this.id + ' .swiper-item');
            if (!slides) {
                console.log('no swiper item found.');
                return;
            }
            const eleHeight = getElemHeight(slides[0]);
            for (let i = 0; i < slides.length; i++) {
                const x = -Math.round(this.scrollProbe.x + this.snapStepX * i);
                const slideElement = slides[i];
                // const shadowLeft = slideElement.querySelector('.shadow .swiper-slide-shadow-left') as HTMLElement;
                // const shadowRight = slideElement.querySelector('.shadow .swiper-slide-shadow-right') as HTMLElement;
                // rotate
                let opacity = 1 - Math.abs(x / this.snapStepX);
                // let translateX = -Math.abs(x / this.snapStepX);
                const translateY = (x / this.snapStepX * eleHeight);
                let scale = 1 - Math.abs(x / this.snapStepX);
                // Fix for ultra small values
                if (Math.abs(opacity) < 0.001) {
                    opacity = 0;
                }
                if (Math.abs(scale) < 0.001) {
                    scale = 0;
                }
                const slideTransform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
                slideElement.style.webkitTransform = slideTransform;
                slideElement.style.transform = slideTransform;
                slideElement.style.opacity = `${opacity}`;
            }
        };
        this.swiperItemClassName = (index) => {
            const { currentPage } = this.state;
            return this.classNames({
                'swiper-item': true,
                'swiper-item-active': index === currentPage,
                'swiper-item-prev': index === currentPage - 1,
                'swiper-item-next': index === currentPage + 1
            });
        };
        this.handleSwipeItemTap = (index, event) => {
            return () => {
                if (this.props.onTap && isFunction(this.props.onTap)) {
                    this.props.onTap(index, event);
                }
            };
        };
        this.getStatus = () => {
            const { currentPage, pages } = this.state;
            return { currentPage: currentPage - this.cloneNum, pages };
        };
        this.cancelAutoPlay = () => {
            this.stopAutoPlay = true;
            this.clearTimeout();
        };
        this.goToPage = (index) => {
            console.log('swiper.goToPage()');
            this.stopAutoPlay = true;
            this.clearTimeout();
            index += this.cloneNum;
            this.scrollProbe.goToPage(index, 0);
        };
        this.next = () => {
            console.log('swiper.next()');
            this.stopAutoPlay = true;
            this.clearTimeout();
            this.scrollProbe.next();
        };
        this.prev = () => {
            console.log('swiper.prev()');
            this.stopAutoPlay = true;
            this.clearTimeout();
            this.scrollProbe.prev();
        };
        this.setAutoPlay = (autoPlay) => {
            if (!autoPlay) {
                this.stopAutoPlay = true;
                this.clearTimeout();
                return;
            }
            this.stopAutoPlay = false;
            this.autoPlay(this.props.autoPlayInterval || 3000);
        };
        this.state = {
            currentPage: 0,
            initialSlideIndex: props.initialSlideIndex,
        };
        this.id = 'swiper' + new Date().getTime();
        this.hasEffects = props.effect !== 'slide';
    }
    componentDidMount() {
        this.adjustStates(this.props);
    }
    componentDidUpdate(prevProps) {
        if (this.props.children.length !== prevProps.children.length) {
            this.adjustStates(this.props);
        }
    }
    bindScrollEvents(scrollProbe) {
        if (scrollProbe.options.snapStepX !== undefined) {
            this.snapStepX = scrollProbe.options.snapStepX;
        }
        scrollProbe.on('scroll', () => {
            if (this.props.onScroll) {
                this.props.onScroll(this.scrollProbe);
            }
            if (this.hasEffects) {
                this.create3DStyle();
            }
        });
        scrollProbe.on('scrollEnd', () => {
            const currentPagePrev = this.state.currentPage;
            this.updateCurrentPage(() => {
                let { currentPage } = this.state;
                if (currentPagePrev !== currentPage) {
                    currentPage -= this.cloneNum;
                    this.setState({
                        initialSlideIndex: currentPage
                    });
                    if (this.props.onSwiperChanged) {
                        this.props.onSwiperChanged(currentPage);
                    }
                    if (this.props.onScrollEnd) {
                        this.props.onScrollEnd(this.scrollProbe);
                    }
                }
            });
        });
    }
    render() {
        const { swiperHeight, gap, showSpinner, centeredSlides, gradientBackground, flowShadow } = this.props;
        const { loop, showPagination, slidesPerView, swipeItems, currentPage, pages } = this.state;
        const classNameSwiperWrap = this.classNameWithProps('swiper');
        const classNameSwipeItemsWrap = this.classNames({
            'swiper-wrap': true,
            'with-spinner': showSpinner,
            'swiper-3d': this.hasEffects,
            'last-child-no-gap': gap && !loop
        });
        const swiper = document.querySelector('#' + this.id);
        // if (swiper === null) { console.log('no swiper dom element find'); return; }
        const swiperWidth = swiper ? Number((getStyles(swiper).width || '0px').slice(0, -2))
            : window.document.documentElement.clientWidth;
        const singleSwiperWidth = swiperWidth / slidesPerView;
        const snapStepX = singleSwiperWidth + gap;
        this.snapStepLast = (singleSwiperWidth * 2) - gap - swiperWidth;
        // centeredSlides
        const centeredSlidesStyle = {};
        if (centeredSlides) {
            const padding = Math.floor((swiperWidth - singleSwiperWidth) / 2);
            Object.assign(centeredSlidesStyle, {
                paddingLeft: padding || 0,
                paddingRight: padding || 0
            });
        }
        // gradientBackground
        const gradientBackgroundStyle = {};
        if (gradientBackground && gradientBackground.length) {
            const key = currentPage - this.cloneNum;
            Object.assign(gradientBackgroundStyle, {
                backgroundImage: `url('${gradientBackgroundStyle[key]}')`
            });
        }
        const wrapperStyle = Object.assign({}, centeredSlidesStyle);
        const itemStyle = { width: singleSwiperWidth, marginRight: gap };
        const childrenStyle = { width: singleSwiperWidth };
        const sliderWrapperStyle = {
            minWidth: swiperWidth + 1
        };
        const scrollbarOptions = {
            snap: true,
            snapStepX,
            momentum: false,
            scrollX: true,
            scrollY: false,
            eventPassthrough: 'vertical',
        };
        return (<div id={this.id} style={wrapperStyle} className={classNameSwiperWrap} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd} {...this.applyArgs('swiper')}>
        <div className="swiper-bg" style={gradientBackgroundStyle}></div>
        <div className="swiper-content" style={{ height: viewport.px2DPIpx(swiperHeight) }}>
          <Scroll ref={this.scrollElem} onInitialize={this.handleScrollbarInitialize} options={scrollbarOptions} 
        // @ts-ignore
        didupdaterefresh={false} // for swiper scroll time, set state don't trigger scroll update life circle
        >
            <div className={classNameSwipeItemsWrap} style={sliderWrapperStyle}>
              {(swipeItems || []).map((item, index) => {
            Object.assign({}, item.props.style, childrenStyle);
            return (<div key={item.key} style={itemStyle} className={this.swiperItemClassName(index)} onClick={(event) => this.handleSwipeItemTap(item.key, event)()}>
                      {this.hasEffects && flowShadow ?
                <div className="shadow">
                            <div className="swiper-slide-shadow-left"/>
                            <div className="swiper-slide-shadow-right"/>
                          </div> : ''}
                      {React.cloneElement(item, item.props)}
                    </div>);
        })}
            </div>
          </Scroll>
          {showPagination ?
            <Indicator pages={pages} currentPage={currentPage - this.cloneNum}/> : ''}
        </div>
      </div>);
    }
}
Swiper.defaultProps = {
    swiperHeight: 200,
    gap: 0,
    loop: false,
    showSpinner: true,
    initialSlideIndex: 0,
    autoPlayInterval: 3000,
    isTouchStopAutoPlay: true,
    slidesPerView: 1,
    showPagination: true,
    centeredSlides: false,
    gradientBackground: [],
    effect: 'slide',
    flowRotation: 40,
    flowDepth: 40,
    flowShadow: true,
    onTap: (currentPage, event) => { },
    onSwiperChanged: (currentPage) => { },
};
