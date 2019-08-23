// 刷新组件
import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import './style.less';

const iconRefresh = require('./assets/icon-refresh.svg');

export default class Refresh extends CoreComponent<any, any>{
  constructor(props, context) {
    super(props, context);
  }

  public refresh = () => {
    window.dispatchEvent(new CustomEvent('skipWaiting'));
  }

  public render() {
    return (
      <div className="sw-refresh">
        <span>检测到页面有更新，请手动刷新页面</span>
        <div className="icon-refresh-wrapper" onClick={this.refresh}>
          <embed className="icon-refresh" src={iconRefresh} type="image/svg+xml" />
        </div>
      </div>
    );
  }
}