/// <reference types="react" />
import './style/visible-action.less';
import CoreComponent from '../../core/CoreComponent';
import { IVisibleActionProps } from './propstype';
export default class VisibleAction extends CoreComponent<IVisibleActionProps, any> {
    static defaultProps: {
        enable: boolean;
        data: {};
        threshold: number;
        visibleOnce: boolean;
        onAction: (visible: any, data: any) => void;
    };
    private withIScroll;
    private visibleActionElem;
    private hasExecutedAction;
    state: {
        visible: boolean;
    };
    constructor(props: any, context: any);
    componentDidMount(): void;
    handleTouchMove: (iScroll: any) => void;
    isInViewport(iScroll: any): boolean;
    private execAction;
    private handleNodeElem;
    render(): JSX.Element;
}
