export interface IModalBaseProps {
  className?: string;
  children?: any;
  isOpen?: boolean;
  style?: { content: any, overlay: any };
  closeTimeoutMS?: number;
  mask?: boolean;
  bodyOpenClassName?: string;
  overlayClassName?: string;
  cacheModal?: boolean;
  shouldFocusAfterRender?: boolean;
  shouldReturnFocusAfterClose?: boolean;
  shouldCloseOnOverlayClick?: boolean; // whether close modal when click on overlay
  shouldCloseOnEsc?: boolean;
  onModalReady?: (modal) => void; // on modal already mounted
  onBeforeOpen?: () => void;
  onAfterOpen?: (modalPortal, portalDom?) => void;
  onAfterClosed?: () => void;
  onRequestClose?: (e) => void;
  overlayRef?: (overlayDom) => void;
  contentRef?: (portalDom) => void;
}

export interface IModalProps extends IModalBaseProps {
  parentSelector?: () => any; // function which return the dom element the modal should be appended to
  portalType?: 'normal' | 'toast' | 'confirm' | 'alert' | 'fullscreen' | 'actionsheet' | 'popover' | 'popup';
  portalClassName?: string;
}

export interface IModalPortalProps extends IModalBaseProps {
  closeTimeoutMS?: number;
  style: { content: any, overlay: any };
  defaultStyles: {
    overlay?: {},
    content?: {}
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