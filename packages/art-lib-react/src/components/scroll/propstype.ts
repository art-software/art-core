import IScrollProbe from './lib/iscroll-probe';

export interface IScrollbarProps {
  defer?: boolean;
  // Note. if we place scrollbar into <SplitPane> don't need to indicates 'height'
  // another method indicates height via utils/dom.getElemHeight(window)
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
  onAction: (visible, data) => any;
}

export interface ILazyloadProps {
  data?: any;
  enable?: boolean;
  threshold?: number;
  onFetchData?: (data) => any;
}