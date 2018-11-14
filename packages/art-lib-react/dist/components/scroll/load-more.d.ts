/// <reference types="react" />
import CoreComponent from '../../core/CoreComponent';
import { ILoadMoreProps } from './propstype';
import './style/load-more.less';
export default class LoadMore extends CoreComponent<ILoadMoreProps, any> {
    static defaultProps: {
        threshold: number;
        defaultTxt: string;
        loadingTxt: string;
        noMoreDataTxt: string;
        enable: boolean;
        clickMode: boolean;
        visible: boolean;
        barProps: {
            size: number;
            gap: number;
            color: undefined;
            shadowColor: undefined;
            logo: undefined;
        };
        onLoadMore: () => Promise<{}>;
    };
    state: {
        loading: boolean;
    };
    onVisibleAction: (visible?: any, data?: any) => void;
    private handleClick;
    private reset;
    render(): JSX.Element;
}
