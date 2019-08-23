/// <reference types="react" />
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { IPickerColumnProps, IColumnValue } from './propTypes';
import ScrollProbe from 'art-lib-react/src/components/scroll/lib/iscroll-probe';
import './styles';
export default class PickerColumn extends CoreComponent<IPickerColumnProps, any> {
    private scrollRef;
    private scroll;
    private placeholderPartsNum;
    private currentIndex;
    private isLastEnd;
    private isStopRun;
    constructor(props: any, context: any);
    /**
     * @description validate visibleItemCount
     */
    validateProps: () => void;
    static defaultProps: {
        itemHeight: number;
        visibleItemCount: number;
        updateDataSource: () => Promise<void>;
    };
    state: {
        dataList: never[];
        runningIndex: number;
    };
    /**
     * @description 重置running状态
     */
    handelScrollStart: () => void;
    handleScrollEnd: () => void;
    /**
     * @description judge is scroll at range frontier
     */
    isRangeFrontier: () => boolean;
    handleScrollCancel: () => void;
    handleScroll: () => void;
    getRunningSelected: () => void;
    /**
     * @description rest scroll position to the choose item
     * @returns {boolean} true will trigger scrollTo and selected
     */
    restScrollPosition: () => boolean;
    private getColumnHeight;
    emptyPlaceholderRender: () => JSX.Element[];
    getPickerItemRender: () => JSX.Element[];
    setScrollRef: (ref: any) => void;
    /**
     * @description load scroll and reset position
     */
    handelScrollReady: (currentIndex: any, callback?: ((scroll: ScrollProbe) => void) | undefined) => void;
    /**
     * @description will event trigger prop onSelected
     * @param  {IColumnValue} selectedItem, selected item
     * @param {boolean} isFirstChoose judge this selected is load trigger
     */
    handleSelected: (selectedItem: IColumnValue, isFirstChoose: boolean) => void;
    /**
     * @description 用于触发生成当前选择组件中的内容x
     * 通常通过外部 获取ref触发该方法，该方法触发prop.updateDataSource,并从中获取对应list数据
     * columnsData，中 dataList为list数据， selectedId 则可设置默认选中相
     */
    updateDataSource: () => Promise<void>;
    private buildClassName;
    private getpx2DPIpx;
    private getCoverLineStyle;
    private getCurrentIndex;
    render(): JSX.Element;
}
