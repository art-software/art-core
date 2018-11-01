import './style.less';
import CoreComponent from '../../core/CoreComponent';
import { ISwiper } from './propstype';
import { getElemWidth } from 'art-lib-utils/src/utils/dom';
import React, { TouchEvent } from 'react';
import IScrollProbe from '../scroll/lib/iscroll-probe';
import viewport from 'art-lib-utils/src/utils/viewport';
import Scroll from '../../components/scroll';
import { isFunction } from 'art-lib-utils/src/utils/lang';
import Indicator from './indicator';

export default class Swiper extends CoreComponent<ISwiper, any> {

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentPage: 0,
      initialSlideIndex: props.initialSlideIndex
    };
    this.id = 'swiper' + new Date().getTime();
    this.is3D = props.effect === 'coverflow';
    console.log(`this.is3D: ${this.is3D}`);
    // this.adjustStates(props);
  }

  private id = 'swiper' + new Date().getTime();
  private is3D: boolean = false;
  private snapStepLast: number = 0;
  private cloneNum: number = 0;
  private stopAutoplay: boolean = false;
  private timeout: number;
  // 解决slidesPerView大于1的情况下，最后一帧touchmove距离大于剩余距离时，瞬间回弹bug
  private startX = 0;
  private scrollProbe: IScrollProbe;
  private scroll: Scroll;
  private snapStepX: number = 0;

  public static defaultProps = {
    swiperHeight: 200,
    gap: 0,
    loop: false,
    showSpinner: true,
    initialSlideIndex: 0,
    autoPlayInterval: 3000,
    slidesPerView: 1,
    showPagination: true,
    centeredSlides: false,
    gradientBackground: [],
    effect: 'slide',
    coverflowRotate: 40,
    coverflowDepth: 40,
    coverflowShadow: true,
    onTap: (currentPage) => { /* console.log(currentPage); */ },
    onSwiperChanged: (currentPage) => { /* console.log(currentPage); */ },
  };

  public componentDidMount() {
    this.adjustStates(this.props);
  }

  public componentWillReceiveProps(nextProps) {
    this.adjustStates(nextProps);
    this.initScroll(this.initSwiper);
  }

  private adjustStates = (props: ISwiper) => {
    const { children, slidesPerView } = props;
    this.cloneNum = 0;
    this.stopAutoplay = false;
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
        showPagination: false,
        autoPlayInterval: false,
        initialSlideIndex: 0,
        loop: false
      });
    }

    if (slidesPerView && (slidesPerView < 1 || slidesPerView >= 2)) {
      Object.assign(this.state, { slidesPerView: 1 });
    }

    // const swipeItems = Object.assign([] as JSX.Element[], children);
    const swipeItems: any[] = [];
    for (let index = 0; index < children.length; index++) {
      // swipeItems[index].key = index;
      const swipeElement = React.cloneElement(children[index], { key: index });
      swipeItems.push(swipeElement);
    }

    // swiperItems.length > 0
    if (props.loop && swipeItems.length) {
      this.cloneNum++;
      if (slidesPerView as number > 1) {
        this.cloneNum++;
      }
      const first = React.cloneElement(swipeItems[0], { key: 10000 });
      const last = React.cloneElement(swipeItems[swipeItems.length - 1], { key: 10001 });
      const first_2 = React.cloneElement(swipeItems[1], { key: 10002 });
      const last_2 = React.cloneElement(swipeItems[swipeItems.length - 2], { key: 10003 });
      swipeItems.push(first);
      swipeItems.unshift(last);
      if (slidesPerView as number > 1) {
        swipeItems.push(first_2);
        swipeItems.unshift(last_2);
      }
    }
    this.setState({
      initialSlideIndex: props.initialSlideIndex as number + this.cloneNum,
      swipeItems
    });
  }

  private initScroll = (callback) => {
    console.log('initScroll()...');
    if (!this.scroll.withScroll) { return; }
    // Note: scroll will be re-instance many times if scroll.options changed.
    // So we should always using withIScroll(true, ()=>{}) to wait lastest iscroll instance
    this.scroll.withScroll(true, (scroll) => {
      if (this.scroll !== scroll) {
        this.bindScrollEvents(scroll);
        this.scroll = scroll;
      }
      if (callback) { callback(scroll); }
    });
  }

  private clearTimeout = () => {
    clearTimeout(this.timeout);
  }

  private handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    this.stopAutoplay = true;
    this.clearTimeout();
    const touch = event.changedTouches[0];
    this.startX = touch.clientX;
  }

  private handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const { currentPage, pages, slidesPerView } = this.state;
    const { centeredSlides } = this.props;
    const touch = event.changedTouches[0];
    const distX = touch.clientX - this.startX;

    const moveNext =
      currentPage === pages - 2
      && (
        distX <= -this.scrollProbe.wrapperWidth
        || (distX <= -this.snapStepLast && !centeredSlides)
      )
      && slidesPerView > 1
      && this.stopAutoplay;

    if (moveNext) { this.scrollProbe.next(); }

    event.preventDefault();
  }

  private scrollElem = (scroll) => {
    this.scroll = scroll;
  }

  private handleScrollbarInitialize = (scrollProbe: IScrollProbe) => {
    console.log('scrollbar.onInitialize() new iscroll instance: ', scrollProbe);
    if (this.scrollProbe !== scrollProbe) {
      this.scrollProbe = scrollProbe;
      this.bindScrollEvents(scrollProbe);
    }
    this.initSwiper();
  }

  public bindScrollEvents(scrollProbe: IScrollProbe) {
    if (scrollProbe.options.snapStepX !== undefined) {
      this.snapStepX = scrollProbe.options.snapStepX;
    }
    if (this.is3D) {
      scrollProbe.on('scroll', () => {
        this.create3DStyle();
      });
    }

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
        }
      });
    });
  }

  private updateCurrentPage = (callback = () => { }) => {
    let currentPage = this.scrollProbe.currentPage.pageX;
    const { pages, loop } = this.state;
    const maxPage = pages + this.cloneNum - 1;

    if (loop) {
      if (currentPage > maxPage) {
        currentPage = this.cloneNum;
        this.scrollProbe.goToPage(this.cloneNum, 0, 0);
      }
      if (currentPage < this.cloneNum) {
        currentPage = maxPage;
        this.scrollProbe.goToPage(maxPage, 0, 0);
      }
      if (this.is3D) {
        this.create3DStyle();
      }
    }
    this.setState({ currentPage }, callback);
  }

  private initSwiper = () => {
    // initialSlideIndex && autoPlayInterval
    this.setState({
      ...this.state
    }, () => {
      this.scrollProbe.goToPage(this.state.initialSlideIndex, 0, 0);
      this.updateCurrentPage();

      if (this.is3D) {
        this.create3DStyle();
      }

      if (this.state.autoPlayInterval) {
        this.clearTimeout();
        this.autoPlay(this.state.autoPlayInterval);
      }
    });
  }

  private autoPlay = (interval: number) => {
    const { pages, loop } = this.state;
    if (this.stopAutoplay) {
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
      } else {
        this.clearTimeout();
      }
    }, interval);
  }

  private create3DStyle = () => {
    const { coverflowRotate = 40, coverflowDepth = 40, coverflowShadow } = this.props;
    const slides = document.querySelectorAll('#' + this.id + ' .swiper-item') as NodeListOf<HTMLElement>;
    if (!slides) { console.log('no swiper item found.'); return; }

    for (let i = 0; i < slides.length; i++) {
      const x = -Math.round(this.scrollProbe.x + this.snapStepX * i);
      const slideElement = slides[i];
      const shadowLeft = slideElement.querySelector('.shadow .swiper-slide-shadow-left') as HTMLElement;
      const shadowRight = slideElement.querySelector('.shadow .swiper-slide-shadow-right') as HTMLElement;

      // rotateY
      let rotateY = x * coverflowRotate / this.snapStepX;

      // translateZ
      let translateZ = -Math.abs(x * coverflowDepth / this.snapStepX);

      // Fix for ultra small values
      if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
      if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
      const slideTransform = `translate3d(0,0,${translateZ}px) rotateY(${rotateY}deg)`;

      slideElement.style.webkitTransform = slideTransform;
      slideElement.style.transform = slideTransform;

      if (coverflowShadow) {
        let opacity = x * 1 / this.snapStepX;
        let shadowLeftOpacity = opacity > 0 ? 0 : Math.abs(opacity);
        let shadowRightOpacity = opacity > 0 ? 0 : Math.abs(opacity);
        if (shadowLeftOpacity > 1) {
          shadowLeftOpacity = 1;
        }
        if (shadowRightOpacity > 1) {
          shadowRightOpacity = 1;
        }

        if (Math.abs(opacity) < 0.001) { opacity = 0; }

        shadowLeft.style.opacity = `${shadowLeftOpacity}`;
        shadowRight.style.opacity = `${shadowRightOpacity}`;
      }
    }
  }

  private swiperItemClassName = (index: number): string => {
    const { currentPage } = this.state;
    return this.classNames({
      'swiper-item': true,
      'swiper-item-active': index === currentPage,
      'swiper-item-prev': index === currentPage - 1,
      'swiper-item-next': index === currentPage + 1
    });
  }

  private handleSwipeItemTap = (index: number) => {
    return () => {
      if (this.props.onTap && isFunction(this.props.onTap)) {
        this.props.onTap(index);
      }
    };
  }

  public getStatus = () => {
    const { currentPage, pages } = this.state;
    return { currentPage: currentPage - this.cloneNum, pages };
  }

  public goToPage = (index) => {
    console.log('swiper.goToPage()');
    this.stopAutoplay = true;
    this.clearTimeout();
    index += this.cloneNum;
    this.scrollProbe.goToPage(index, 0);
  }

  public next = () => {
    console.log('swiper.next()');
    this.stopAutoplay = true;
    this.clearTimeout();
    this.scrollProbe.next();
  }

  public prev = () => {
    console.log('swiper.prev()');
    this.stopAutoplay = true;
    this.clearTimeout();
    this.scrollProbe.prev();
  }

  public setAutoPlay = (autoPlay: boolean) => {
    if (!autoPlay) {
      this.stopAutoplay = true;
      this.clearTimeout();
      return;
    }

    this.stopAutoplay = false;
    this.autoPlay(this.props.autoPlayInterval || 3000);
  }

  public render() {
    const { swiperHeight, gap, showSpinner, centeredSlides, gradientBackground, coverflowShadow } = this.props;
    const { loop, showPagination, slidesPerView, swipeItems, currentPage, pages } = this.state;

    const classNameSwiperWrap = this.classNameWithProps('swiper');
    const classNameSwipeItemsWrap = this.classNames({
      'swiper-wrap': true,
      'with-spinner': showSpinner,
      'swiper-3d': this.is3D,
      'last-child-no-gap': gap && !loop
    });

    const swiper = document.querySelector('#' + this.id);
    // if (swiper === null) { console.log('no swiper dom element find'); return; }
    const swiperWidth = Math.floor(getElemWidth(swiper as any));
    const singleSwiperWidth = Math.floor(swiperWidth / slidesPerView);

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

    return (
      <div
        id={this.id}
        style={wrapperStyle}
        className={classNameSwiperWrap}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        {...this.applyArgs('swiper')}
      >
        <div className="swiper-bg" style={gradientBackgroundStyle}></div>
        <div className="swiper-content" style={{ height: viewport.px2DPIpx(swiperHeight) }}>
          <Scroll
            ref={this.scrollElem}
            onInitialize={this.handleScrollbarInitialize}
            options={scrollbarOptions}
          >
            <div className={classNameSwipeItemsWrap} style={sliderWrapperStyle}>
              {
                (swipeItems || []).map((item, index) => {
                  Object.assign({}, item.props.style, childrenStyle);

                  return (
                    <div
                      key={item.key}
                      style={itemStyle}
                      className={this.swiperItemClassName(index)}
                      onClick={this.handleSwipeItemTap(item.key)}
                    >
                      {
                        this.is3D && coverflowShadow ?
                          <div className="shadow">
                            <div className="swiper-slide-shadow-left" />
                            <div className="swiper-slide-shadow-right" />
                          </div> : ''
                      }
                      {React.cloneElement(item, item.props)}
                    </div>
                  );
                })
              }
            </div>
          </Scroll>
          {
            showPagination ?
              <Indicator
                pages={pages}
                currentPage={currentPage - this.cloneNum} /> : ''
          }
        </div>
      </div>
    );
  }
}