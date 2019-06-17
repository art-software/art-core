import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import quicklink from './helper/quicklinkConfig';
import { IQuickLink } from './propsType';

export default class Quicklink extends CoreComponent<IQuickLink, any> {

  public static defaultProps = {
    prfetchHref: [],
    origins: true,
    observerSelector: '.v-quicklink-prefetch'
  };

  public componentDidMount() {
    const { origins, observerSelector, el, ignores, timeout, timeoutFn, priority, urls } = this.props;
    quicklink({
      origins,
      observerSelector,
      el,
      ignores,
      timeout,
      timeoutFn,
      priority,
      urls
    });
  }

  public render() {
    const { className, style, prfetchHref, children } = this.props;

    return (
      <div
      className={`v-quicklink-prefetch ${className}`}
      style={style}
      prefetch-href={JSON.stringify(prfetchHref)}
      >
        {children}
      </div>
    );
  }
}