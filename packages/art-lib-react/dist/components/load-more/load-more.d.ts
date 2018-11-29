/// <reference types="react" />
import './styles/load-more.less';
import CoreComponent from '../../core/CoreComponent';
import { ILoadMoreProps } from './propstype';
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
    onVisibleAction: (visible?: any) => void;
    private handleClick;
    private reset;
    render(): JSX.Element;
}
