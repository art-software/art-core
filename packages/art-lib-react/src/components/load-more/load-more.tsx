import React from 'react';
import './styles/load-more.less';
import viewport from 'art-lib-utils/dist/utils/viewport';
import Progress from '../progress';
import CoreComponent from '../../core/CoreComponent';
import VisibleAction from '../scroll/visible-action';
import { ILoadMoreProps } from './propstype';

const px2rem = viewport.px2rem;
const currRem = viewport.currRem;
const px2px = (value) => {
  return Math.ceil(Number(px2rem(value).split('rem')[0]) * currRem) + 'px';
};

export default class LoadMore extends CoreComponent<ILoadMoreProps, any> {

  public static defaultProps = {
    threshold: 0,
    defaultTxt: ' 加载更多',
    loadingTxt: ' 加载中...',
    noMoreDataTxt: '没有更多了~',
    enable: true,
    clickMode: false,
    visible: true,
    barProps: {
      size: 30, gap: 1, color: undefined, shadowColor: undefined, logo: undefined
    },
    onLoadMore: () => {
      return new Promise((resolve) => {
        setTimeout(function () {
          resolve();
        }, 2000);
      });
    }
  };

  public state = {
    loading: false
  };

  public onVisibleAction = (visible?) => {
    if (this.state.loading === true) { return; }
    if (visible === true) {
      this.setState({
        loading: true
      });
      console.log('ready to invoke loadmore()...');
      this.props.onLoadMore().then(this.reset).catch(this.reset);
    }
  }
  private handleClick = () => {
    if (this.props.clickMode && this.props.hasMoreData) {
      this.onVisibleAction(true);
    }
  }

  private reset = () => {
    this.setState({
      loading: false
    });
  }

  public render() {
    const { visible, clickMode, hasMoreData, enable, threshold,
      defaultTxt, loadingTxt, noMoreDataTxt, barProps = {}, style } = this.props;
    const visibleActionStyle = Object.assign({ display: visible ? 'block' : 'none' }, style);
    const { gap, logo, size, color, shadowColor } = barProps as any;
    const logoStyle: any = {
      top: px2px(gap),
      right: px2px(gap),
      bottom: px2px(gap),
      left: px2px(gap)
    };
    if (logo) {
      logoStyle.backgroundImage = 'url(' + logo + ')';
    }
    return (
      <VisibleAction
        enable={enable && !clickMode && hasMoreData}
        onAction={this.onVisibleAction}
        visibleOnce={false}
        threshold={threshold}
        style={visibleActionStyle}
      >
        <div
          {...this.applyArgs('load-more')}
          onClick={this.handleClick}
          className={this.classNames({ loading: this.state.loading, nomoredata: !hasMoreData })}
        >
          <Progress className="anim" value={0.1} hideLabel={true} gap={gap} size={size} color={color} shadowColor={shadowColor}>
            <div className="logo" style={logoStyle}></div>
          </Progress>
          <span>
            {
              this.state.loading
                ? loadingTxt
                : (!hasMoreData ? noMoreDataTxt : defaultTxt)
            }
          </span>
        </div>
      </VisibleAction>
    );
  }
}
