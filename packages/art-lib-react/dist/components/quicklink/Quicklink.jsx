import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import quicklink from './helper/quicklinkConfig';
export default class Quicklink extends CoreComponent {
    componentDidMount() {
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
    render() {
        const { className, style, prfetchHref, children } = this.props;
        return (<div className={`v-quicklink-prefetch ${className}`} style={style} prefetch-href={JSON.stringify(prfetchHref)}>
        {children}
      </div>);
    }
}
Quicklink.defaultProps = {
    prfetchHref: [],
    origins: true,
    observerSelector: '.v-quicklink-prefetch'
};
