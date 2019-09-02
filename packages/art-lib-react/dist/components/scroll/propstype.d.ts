import IScrollProbe from './lib/iscroll-probe';
export interface IScrollbarProps {
    defer?: boolean;
    height?: number | string;
    width?: number | string;
    options?: object;
    wrapperStyle?: object;
    didUpdateRefresh?: boolean;
    onFlick?: (iScrollInstance: IScrollProbe) => void;
    onRefresh?: (iScrollInstance: IScrollProbe) => void;
    onInitialize?: (iScrollInstance: IScrollProbe) => void;
    onScroll?: (iScrollInstance: IScrollProbe) => void;
    onScrollEnd?: (iScrollInstance: IScrollProbe) => void;
    onZoomStart?: (iScrollInstance: IScrollProbe) => void;
    onZoomEnd?: (iScrollInstance: IScrollProbe) => void;
    onScrollStart?: (iScrollInstance: IScrollProbe) => void;
    onScrollCancel?: (iScrollInstance: IScrollProbe) => void;
    onBeforeScrollStart?: (iScrollInstance: IScrollProbe) => void;
}
export interface IVisibleActionProps {
    data?: any;
    enable?: boolean;
    threshold?: number;
    visibleOnce?: boolean;
    onAction: (visible: any, data: any) => any;
}
export interface ILazyloadProps {
    data?: any;
    enable?: boolean;
    threshold?: number;
    onFetchData?: (data: any) => any;
}
