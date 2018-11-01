import './style/modal.less';
import CoreComponent from '../../core/CoreComponent';
import React from 'react';
import { IModalProps } from './propstype';
export default class Modal extends CoreComponent<IModalProps, any> {
    static defaultProps: {
        mask: boolean;
        isOpen: boolean;
        portalType: string;
        portalClassName: string;
        bodyOpenClassName: string;
        style: {
            overlay: {};
            content: {};
        };
        closeTimeoutMS: number;
        shouldFocusAfterRender: boolean;
        shouldCloseOnEsc: boolean;
        shouldCloseOnOverlayClick: boolean;
        shouldReturnFocusAfterClose: boolean;
        parentSelector(): HTMLElement;
    };
    private node;
    static defaultStyles: {
        overlay: {};
        content: {
            WebkitOverflowScrolling: string;
        };
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    destroy(callback?: any): void;
    private removePortal;
    private portal;
    private portalRef;
    private handleAfterClosed;
    private handleBeforeOpen;
    render(): React.ReactPortal | null;
}
