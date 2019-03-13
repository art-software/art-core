/// <reference types="react" />
import './styles/pull-to-refresh.less';
import CoreComponent from '../../core/CoreComponent';
import { IPullToRefreshProps } from './propstype';
import IScroll from '../scroll/lib/iscroll-probe';
declare class PullToRefresh extends CoreComponent<IPullToRefreshProps, any> {
    constructor(props: any, context: any);
    private indicator;
    private withIScroll;
    private touchGuestureRelease;
    private localState;
    static defaultProps: {
        pullTxt: string;
        releaseTxt: string;
        loadingTxt: string;
        distanceToRefresh: number;
        resistance: number;
        threshold: number;
        onTransitionEnd: () => void;
        onReload: () => Promise<{}>;
    };
    componentDidMount(): void;
    triggerPTR(ptrDuration: number): void;
    attachIScrollEvents(iScroll: IScroll): void;
    handleTouchStart: (pageY: number) => void;
    handleTouchMove: (pageY: any) => void;
    private reset;
    handleTouchEnd: () => void;
    refreshUIState(): void;
    private getResistance;
    handlePullRefreshAction(refresh: boolean, threshold: number): boolean;
    private getProgressbarProps;
    private getTransformStyle;
    private getRenderProps;
    private prtElem;
    private setPTRElem;
    private setIndicatorElem;
    render(): JSX.Element;
}
export default PullToRefresh;
