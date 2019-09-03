import './style';
import React from 'react';
import CoreComponent from '../../core/CoreComponent';
import IScrollProbe from './lib/iscroll-probe';
import { lockTouchEvent } from './lib/document';
import { getElemHeight } from 'art-lib-utils/dist/utils/dom';
import { shallowEqual } from 'art-lib-utils/dist/utils/shallow-compare';
// Default lock document touch event within scrollbar.
lockTouchEvent();
const excludePropNames = ['defer', 'iScroll', 'onRefresh', 'onInitialize', 'options', 'height', 'style', 'width', 'className', 'class', 'wrapperStyle', 'didupdaterefresh'];
// Events available on iScroll instance {`react component event name`: `iScroll event name`}
const availableEventNames = {};
const iScrollEventNames = [
    'beforeScrollStart',
    'scrollCancel',
    'scrollStart',
    'scroll',
    'scrollEnd',
    'flick',
    'zoomStart',
    'zoomEnd'
];
for (let i = 0, len = iScrollEventNames.length; i < len; i++) {
    const iScrollEventName = iScrollEventNames[i];
    const reactEventName = `on${iScrollEventName[0].toUpperCase()}${iScrollEventName.slice(1)}`;
    availableEventNames[reactEventName] = iScrollEventName;
    excludePropNames.push(reactEventName);
}
const iScrollDefaultOptions = {
    probeType: 3,
    useTransition: true,
    scrollbars: false,
    fadeScrollbars: false,
    bindToWrapper: true,
    scrollerSelector: '.scrollbar-view',
    // default open preventDefault.
    preventDefault: true,
    scrollY: true,
    scrollX: false,
    // if in mobile device disabled mouse, pointer touch event tracking.
    // upgrade iscroll to resolve chrome 55+ don't work remove disable Mouse.
    // Sometimes you want to preserve native vertical scroll but being able to add an horizontal iScroll (maybe a carousel). Set this to true and the iScroll area will react to horizontal swipes only. Vertical swipes will naturally scroll the whole page.
    eventPassthrough: 'horizontal',
    preventDefaultException: {
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/,
        fn(el) {
            if (el.attributes.clickable) {
                return true;
            }
            return false;
        }
    }
};
export const ScrollContext = React.createContext({ withScroll: () => { } });
export default class Scroll extends CoreComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            scrollViewHeight: 0
        };
        this.hasMounted = false;
        this.initializeTimeout = null;
        this.queuedCallbacks = [];
        this.iScrollBindedEvents = {};
        // Note: we should avoid multiple +1 if we multi re-render iscrollbar.
        // minHeight: [v-scrollbar-view] = [v-scrollbar] + 1
        this.minHeight = 0;
        this.setIScrollRef = (el) => {
            this.iScrollElement = el;
        };
    }
    componentDidMount() {
        this.hasMounted = true;
        this.initializeIScroll();
        this.setState({
            scrollViewHeight: this.getScrollViewMinHeight()
        });
    }
    // Check if iScroll options has changed and recreate instance with new one
    componentDidUpdate(prevProps) {
        // If options are same, iScroll behaviour will not change. Just refresh events
        // and trigger refresh
        if (shallowEqual(prevProps.options, this.props.options)) {
            // FIXME: right? disable iscroll refresh().
            if (prevProps.didupdaterefresh) {
                this.updateIScrollEvents(prevProps, this.props);
                this.refresh();
            }
            // If options changed, we will destroy iScroll instance and create new one with
            // same scroll position
            // TODO test if this will work with indicators
        }
        else {
            this.withScroll(true, (iScrollInstance) => {
                // Save current state
                const { x, y, scale } = iScrollInstance;
                // Destroy current and Create new instance of iScroll
                this.teardownIScroll();
                this.initializeIScroll();
                this.withScroll(true, (newIScrollInstance) => {
                    // Restore previous state
                    if (scale && newIScrollInstance.zoom) {
                        newIScrollInstance.zoom(scale, 0, 0, 0);
                    }
                    newIScrollInstance.scrollTo(x, y);
                });
            });
        }
    }
    // public static childContextTypes = {
    //   withScroll: PropTypes.func
    // };
    // public getChildContext() {
    //   return {
    //     withScroll: this.withScroll.bind(this)
    //   };
    // }
    initializeIScroll() {
        if (this.hasMounted === false) {
            return;
        }
        const { defer } = this.props;
        if (defer === false) {
            this.runInitializeIScroll();
        }
        else {
            const timeout = defer === true ? 0 : defer;
            this.initializeTimeout = setTimeout(() => this.runInitializeIScroll(), timeout);
        }
    }
    runInitializeIScroll() {
        const { options } = this.props;
        // Create iScroll instance with given options
        const iScrollInstance = new IScrollProbe(this.iScrollElement, this.mergeProps(false, {}, iScrollDefaultOptions, options));
        this.iScrollInstance = iScrollInstance;
        // there should be new event 'onInitialize'
        this.triggerInitializeEvent();
        this.triggerRefreshEvent();
        // Patch iScroll instance .refresh() function to trigger our onRefresh event
        iScrollInstance.originalRefresh = iScrollInstance.refresh;
        iScrollInstance.refresh = () => {
            iScrollInstance.originalRefresh.apply(iScrollInstance);
            this.triggerRefreshEvent();
        };
        // Bind iScroll events
        this.bindIScrollEvents();
        this.callQueuedCallbacks(iScrollInstance);
    }
    triggerInitializeEvent() {
        const { onInitialize } = this.props;
        if (typeof onInitialize === 'function') {
            this.withScroll(true, (iScrollInstance) => onInitialize(iScrollInstance));
        }
    }
    withScroll(waitForInit, callback) {
        if (!callback && typeof waitForInit === 'function') {
            callback = waitForInit;
        }
        if (this.getIScroll()) {
            callback(this.getIScroll());
        }
        else if (waitForInit === true) {
            this.queuedCallbacks.push(callback);
        }
    }
    getIScroll() {
        return this.iScrollInstance;
    }
    triggerRefreshEvent() {
        const { onRefresh } = this.props;
        if (typeof onRefresh === 'function') {
            this.withScroll((iScrollInstance) => onRefresh(iScrollInstance));
        }
    }
    bindIScrollEvents() {
        // Bind events on iScroll instance
        this.iScrollBindedEvents = {};
        this.updateIScrollEvents({}, this.props);
    }
    // Iterate through available events and update one by one
    updateIScrollEvents(prevProps, nextProps) {
        for (const reactEventName in availableEventNames) {
            this.updateIScrollEvent(availableEventNames[reactEventName], prevProps[reactEventName], nextProps[reactEventName]);
        }
    }
    // Unbind and/or Bind event if it was changed during update
    updateIScrollEvent(iScrollEventName, prevPropEvent, currentPropEvent) {
        if (prevPropEvent !== currentPropEvent) {
            const currentEvents = this.iScrollBindedEvents;
            this.withScroll(true, function (iScrollInstance) {
                if (prevPropEvent !== undefined) {
                    iScrollInstance.off(iScrollEventName, currentEvents[iScrollEventName]);
                    currentEvents[iScrollEventName] = undefined;
                }
                if (currentPropEvent !== undefined) {
                    const wrappedCallback = function (...args) {
                        currentPropEvent(iScrollInstance, ...args);
                    };
                    iScrollInstance.on(iScrollEventName, wrappedCallback);
                    currentEvents[iScrollEventName] = wrappedCallback;
                }
            });
        }
    }
    callQueuedCallbacks(iScrollInstance) {
        const callbacks = this.queuedCallbacks;
        const len = callbacks.length;
        this.queuedCallbacks = [];
        for (let i = 0; i < len; i++) {
            callbacks[i](iScrollInstance);
        }
    }
    getScrollViewMinHeight(height) {
        const realScrollViewHeight = this.iScrollElement ? getElemHeight(this.iScrollElement) : 0;
        if (height) {
            this.minHeight = height + 1;
        }
        else {
            const testHeight = Math.max(this.state.scrollViewHeight, realScrollViewHeight);
            if (this.minHeight !== testHeight) {
                this.minHeight = testHeight + 1;
            }
        }
        return this.minHeight;
    }
    refresh() {
        this.withScroll((iScrollInstance) => iScrollInstance.refresh());
    }
    teardownIScroll() {
        this.clearInitializeTimeout();
        if (this.iScrollInstance) {
            this.iScrollInstance.destroy();
            this.iScrollInstance = undefined;
        }
        this.iScrollBindedEvents = {};
        this.queuedCallbacks = [];
    }
    clearInitializeTimeout() {
        if (this.initializeTimeout !== null) {
            clearTimeout(this.initializeTimeout);
            this.initializeTimeout = null;
        }
    }
    // private onDocumentMove(event: Event) {
    //   event.preventDefault();
    // }
    render() {
        // Keep only non ReactIScroll properties
        const props = {};
        // Note: We should not give it default height, it scrollbar placed within split-pane, it don't have an fixed height.
        const { wrapperStyle, style, height, width, options = {} } = this.props;
        let scrollbarMode = 'vertical';
        if (options.scrollX === true) {
            scrollbarMode = 'horizontal';
        }
        else {
            scrollbarMode = 'vertical';
        }
        if (options.freeScroll === true) {
            scrollbarMode = 'free';
        }
        for (const prop in this.props) {
            if (!~excludePropNames.indexOf(prop)) {
                props[prop] = this.props[prop];
            }
        }
        // Make sure the scroller always avalible.
        const scrollViewStyle = this.mergeProps(false, {}, {
            minHeight: this.getScrollViewMinHeight(height)
        }, style);
        return (<ScrollContext.Provider value={{ withScroll: this.withScroll.bind(this) }}>
        <div {...this.applyArgs('scrollbar', scrollbarMode)} ref={this.setIScrollRef} className="scrollbar-wrapper" style={this.mergeProps(false, {}, wrapperStyle, { height, width })}>
          <div {...props} {...this.applyArgs('scrollbar-view')} className={this.classNameWithProps('scrollbar-view')} style={scrollViewStyle}/>
        </div>
      </ScrollContext.Provider>);
    }
}
Scroll.defaultProps = {
    defer: true,
    // didUpdateRefresh: true,
    didupdaterefresh: 'true',
    options: {
        scrollY: true,
        eventPassthrough: 'horizontal'
    },
    style: {
        position: 'relative',
        width: '100%'
    },
    wrapperStyle: {}
};
