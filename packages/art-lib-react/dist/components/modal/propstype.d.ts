export interface IModalBaseProps {
    className?: string;
    children?: any;
    isOpen?: boolean;
    style?: {
        content: any;
        overlay: any;
    };
    closeTimeoutMS?: number;
    mask?: boolean;
    bodyOpenClassName?: string;
    overlayClassName?: string;
    cacheModal?: boolean;
    shouldFocusAfterRender?: boolean;
    shouldReturnFocusAfterClose?: boolean;
    shouldCloseOnOverlayClick?: boolean;
    shouldCloseOnEsc?: boolean;
    onModalReady?: (modal: any) => void;
    onBeforeOpen?: () => void;
    onAfterOpen?: (modalPortal: any, portalDom?: any) => void;
    onAfterClosed?: () => void;
    onRequestClose?: (e: any) => void;
    overlayRef?: (overlayDom: any) => void;
    contentRef?: (portalDom: any) => void;
}
export interface IModalProps extends IModalBaseProps {
    parentSelector?: () => any;
    portalType?: 'normal' | 'toast' | 'confirm' | 'alert' | 'fullscreen' | 'actionsheet' | 'popover' | 'popup';
    portalClassName?: string;
}
export interface IModalPortalProps extends IModalBaseProps {
    closeTimeoutMS?: number;
    style: {
        content: any;
        overlay: any;
    };
    defaultStyles: {
        overlay?: {};
        content?: {};
    };
}
export interface INoticeProps extends IModalProps {
    type?: string | undefined;
    toastInline?: boolean;
}
export interface IConfirmProps extends INoticeProps {
    title?: string;
    okText?: string;
    cancelText?: string;
    onOk?: () => any;
    onCancel?: () => any;
    onClosed?: () => any;
}
