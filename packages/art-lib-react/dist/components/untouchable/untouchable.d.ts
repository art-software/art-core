/// <reference types="react" />
import './style.less';
import CoreComponent from '../../core/CoreComponent';
import { IUnTouchableProps } from './propstype';
export default class UnTouchable extends CoreComponent<IUnTouchableProps, any> {
    constructor(props: any);
    private service;
    private handleTouchStart;
    private handleTouchMove;
    private touchableEl;
    componentDidMount(): void;
    componentWillUnmount(): void;
    setTouchableRef: (el: HTMLElement | null) => any;
    render(): JSX.Element;
}
