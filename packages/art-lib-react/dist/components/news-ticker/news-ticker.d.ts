/// <reference types="react" />
import './style.less';
import CoreComponent from '../../core/CoreComponent';
import { INewsTicker } from './propstype';
export default class NewsTicker extends CoreComponent<INewsTicker, any> {
    constructor(props: any, context: any);
    private running;
    private needUpdateItemSource;
    private totalNeedItems;
    private timeoutId;
    static defaultProps: {
        duration: number;
        timePeriod: number;
        easing: (x: any) => number;
        itemHeight: number;
        itemsOneRolling: number;
        itemSource: never[];
    };
    state: {
        items: never[];
        start: boolean;
        style: any;
    };
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    private getItemHeight;
    private getTransformStyle;
    handleStep: (delta: number) => void;
    handleDelta: (progress: any) => any;
    handleComplete: () => void;
    private convertItems;
    private startAnimation;
    getNewSortedItems(oldItems: any[]): any[];
    renderItems(): any[];
    render(): JSX.Element;
}
