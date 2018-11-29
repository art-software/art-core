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
    onLoadMore: () => Promise<any>;
}
