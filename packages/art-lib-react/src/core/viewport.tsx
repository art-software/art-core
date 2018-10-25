const defaultDesignWidth = 750;
const defaultBaseFontSize = 100;

function viewport(baseFontSize: number = defaultBaseFontSize, designWidth: number = defaultDesignWidth) {
  const doc = window.document;
  const docEl = doc.documentElement;
  const ua = navigator.userAgent;
  const isAndroid = ua.toLowerCase().indexOf('android') > -1;
  let rem;
  // 最大3倍分辨率
  let dpr = (window.devicePixelRatio || 1);
  if (dpr > 3) {
    dpr = 3;
  }

  // TcTravel + Android
  if (isAndroid) {
    dpr = 1;
  }

  console.log('current devicePixelRatio:', dpr);
  docEl.setAttribute('data-dpr', dpr.toString());
  let metaEl = doc.querySelector('meta[name="viewport"]');
  let scale = 1;
  if (!metaEl) {
    scale = 1 / dpr;
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
    // Note: IOS 11.0.3+ touch maybe make more change, we can't change viewport scale value less than 1.
    // it will result the screen left swipe issue.
    // if we don't hard code viewport in index.html, we automatically add viewport.
    // otherwise ignore it. 
    metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
  }

  function refresh() {
    const winWidith = document.documentElement.clientWidth;
    rem = (winWidith / designWidth) * (baseFontSize / dpr) * dpr;
    doc.documentElement.style.fontSize = rem + 'px';
  }

  refresh();

  let timeoutId;
  window.addEventListener('resize', function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(refresh, 300);
  }, false);

  return {
    currScale: scale,
    currRem: rem,
    currDpr: dpr
  };
}

const { currRem, currScale, currDpr } = viewport(100, 750);

export default {
  currScale,
  currDpr,
  currRem,
  /**
   * 转换特定设备分辨率下的缩放值到屏幕设计稿像素对应PX值
   * 如: iphone4 2分辨率下变成320px 转换到视觉稿应该是750px
   * @param d {Number} 屏幕实际像素PX值
   */
  dpiPX2px(d: number | string): string {
    return parseFloat(d.toString()) / currRem * 100 + 'px';
  },
  /**
   * 转换屏幕实际像素PX值到特定设备分辨率下的缩放值
   * 如: iphone4 100px在2分辨率下变成50px
   * @param d {Number} 屏幕实际像素PX值
   */
  px2DPIpx(d: number | string): string {
    return parseFloat(d.toString()) / 100 * currRem + 'px';
  },
  /**
   * 转换750PX下的视觉稿PX尺寸到REM值
   * 如: iphone4 750px的视觉稿，100px在2分辨率下变成1rem
   * @param d {Number} 视觉稿PX尺寸值
   */
  px2rem(d: number): string {
    return d / 100 + 'rem';
  }
};