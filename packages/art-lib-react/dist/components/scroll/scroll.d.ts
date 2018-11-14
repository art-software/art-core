import './style';
import React from 'react';
import CoreComponent from '../../core/CoreComponent';
import IScrollProbe from './lib/iscroll-probe';
import { IScrollbarProps } from './propstype';
export declare type WithScroll = (waitForInit: ((scrollInstance: IScrollProbe) => any) | boolean, cb: (scrollInstance: IScrollProbe) => any) => any;
export interface IScrollContext {
    withScroll: WithScroll;
}
export declare const ScrollContext: React.Context<IScrollContext>;
export default class Scroll extends CoreComponent<IScrollbarProps, any> {
    static defaultProps: {
        defer: boolean;
        didupdaterefresh: string;
        options: {
            scrollY: boolean;
            eventPassthrough: string;
        };
        style: {
            position: string;
            width: string;
        };
        wrapperStyle: {};
    };
    constructor(props: any, context?: any);
    state: {
        scrollViewHeight: number;
    };
    private iScrollElement;
    private hasMounted;
    private initializeTimeout;
    private queuedCallbacks;
    private iScrollBindedEvents;
    private iScrollInstance;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    private initializeIScroll;
    private runInitializeIScroll;
    private triggerInitializeEvent;
    withScroll(waitForInit?: any, callback?: any): void;
    getIScroll(): any;
    private triggerRefreshEvent;
    private bindIScrollEvents;
    private updateIScrollEvents;
    private updateIScrollEvent;
    private callQueuedCallbacks;
    private minHeight;
    private getScrollViewMinHeight;
    refresh(): void;
    private teardownIScroll;
    private clearInitializeTimeout;
    setIScrollRef: (el: any) => void;
    render(): JSX.Element;
}
