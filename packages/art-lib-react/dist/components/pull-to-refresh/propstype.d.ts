/// <reference types="react" />
export interface IIndicator {
    ptrStyle: React.CSSProperties;
    rate: number;
    refresh: boolean;
    barProps?: IBarProps;
    releaseTxt?: string;
    pullTxt?: string;
    loadingTxt?: string;
}
export interface IBarProps {
    size?: number;
    gap?: number;
    color?: string;
    shadowColor?: string;
    logo?: string;
}
export interface IPullToRefreshProps {
    barProps?: IBarProps;
    pullTxt?: string;
    releaseTxt?: string;
    loadingTxt?: string;
    threshold?: number;
    resistance?: number;
    progressColor?: string;
    distanceToRefresh?: number;
    onReload?: () => any;
    onTransitionEnd?: () => any;
}
