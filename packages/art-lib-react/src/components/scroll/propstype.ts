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

export interface IPullToRefreshProps {
  barProps?: IBarProps;
  pullTxt?: string;
  releaseTxt?: string;
  loadingTxt?: string;
  threshold?: number;

  // The dragging resistance level; the higher the more you'll need to drag down.
  resistance?: number;

  // Number of pixels of dragging down until refresh will fire
  progressColor?: string;
  distanceToRefresh?: number;
  onReload?: () => any;
  onTransitionEnd?: () => any;
}
export interface IBarProps {
  size?: number;
  gap?: number;
  color?: string;
  shadowColor?: string;
  logo?: string;
}

export interface ILoadMoreProps {
  barProps?: IBarProps;
  enable?: boolean;
  visible?: boolean;
  threshold?: number;
  clickMode?: boolean;
  hasMoreData: boolean;
  defaultTxt?: string;
  loadingTxt?: string;
  noMoreDataTxt?: string;
  onLoadMore?: () => Promise<any>;
}

export interface IVisibleActionProps {
  data?: any;
  enable?: boolean;
  threshold?: number;
  visibleOnce?: boolean;
  onAction?: (visible, data) => any;
}

export interface ILazyloadProps {
  data?: any;
  enable?: boolean;
  threshold?: number;
  onFetchData?: (data) => any;
}