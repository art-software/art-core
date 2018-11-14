/// <reference types="react" />
import CoreComponent from '../../core/CoreComponent';
import { IModalPortalProps } from './propstype';
export default class ModalPortal extends CoreComponent<IModalPortalProps, any> {
    constructor(props: any, context: any);
    private content;
    focusAfterRender: boolean;
    private closeTimer;
    static defaultProps: {
        style: {
            overlay: {};
            content: {};
        };
    };
    state: {
        isOpen: boolean;
        afterOpen: boolean;
        beforeClose: boolean;
        closesAt: null;
    };
    /**
     * We don't use child componentDidMount lifecycle directly in modal-portal.tsx
     * cause of lifecycle componentDidMount (Child-->Parent)
     * so we should waiting Modal has been mounted here
     * @memberof ModalPortal
     */
    componentModalDidMount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    private setFocusAfterRender;
    open: () => void;
    close: () => void;
    closeWithTimeout: () => void;
    closeWithoutTimeout: () => void;
    private afterClose;
    private shouldReturnFocus;
    private beforeOpen;
    private shouldBeClosed;
    private setOverlayRef;
    private handleOverlayOnClick;
    private requestClose;
    private focusContent;
    private contentHasFocus;
    private buildClassName;
    private setContentRef;
    private handleKeyDown;
    render(): JSX.Element | null;
}
