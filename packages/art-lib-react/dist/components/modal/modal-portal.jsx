import CoreComponent from '../../core/CoreComponent';
import React from 'react';
import UnTouchable from '../untouchable';
import FastClick from '../fastclick';
import * as bodyClassList from './helper/body-class-list';
import * as focusManager from './helper/focus-manager';
import { isFunction } from 'art-lib-utils/dist/utils/lang';
// so that our CSS is statically analyzable
const CLASS_NAMES = {
    overlay: 'modal-portal-overlay',
    content: 'modal-portal-content'
};
const ESC_KEY = 27;
export default class ModalPortal extends CoreComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpen: false,
            afterOpen: false,
            beforeClose: false,
            closesAt: null
        };
        this.setFocusAfterRender = (focus) => {
            this.focusAfterRender = this.props.shouldFocusAfterRender && focus;
        };
        // open modal
        this.open = () => {
            this.beforeOpen();
            if (this.state.afterOpen && this.state.beforeClose) {
                clearTimeout(this.closeTimer);
                this.setState({ beforeClose: false });
            }
            else {
                if (this.shouldReturnFocus()) {
                    focusManager.markForFocusLater();
                }
                this.setState({ isOpen: true }, () => {
                    this.setState({ afterOpen: true });
                    if (this.props.isOpen && this.props.onAfterOpen) {
                        this.props.onAfterOpen(this, this.content);
                    }
                });
            }
        };
        this.close = () => {
            if (this.props.closeTimeoutMS && this.props.closeTimeoutMS > 0) {
                this.closeWithTimeout();
            }
            else {
                this.closeWithoutTimeout();
            }
        };
        this.closeWithTimeout = () => {
            const closesAt = Date.now() + this.props.closeTimeoutMS;
            this.setState({ beforeClose: true, closesAt }, () => {
                this.closeTimer = window.setTimeout(this.closeWithoutTimeout, closesAt - Date.now());
            });
        };
        this.closeWithoutTimeout = () => {
            this.setState({
                beforeClose: false,
                isOpen: false,
                afterOpen: false,
                closesAt: null
            }, this.afterClose);
            // closed.
            if (this.props.onAfterClosed) {
                this.props.onAfterClosed();
            }
        };
        this.afterClose = () => {
            // Remove body class
            // console.log('afterClose(): remove class name bodyOpenClassName', this.props.bodyOpenClassName);
            if (!this.props.bodyOpenClassName) {
                return;
            }
            bodyClassList.remove(this.props.bodyOpenClassName);
            if (this.shouldReturnFocus()) {
                focusManager.returnFocus();
            }
        };
        this.shouldReturnFocus = () => {
            // Don't restore focus to the element that had focus prior to
            // the modal's display if:
            // 1. Focus was never shifted to the modal in the first place
            //    (shouldFocusAfterRender = false)
            // 2. Explicit not restore focus
            return (this.props.shouldFocusAfterRender ||
                this.props.shouldReturnFocusAfterClose);
        };
        this.shouldBeClosed = () => {
            return !this.state.isOpen && !this.state.beforeClose && !this.props.cacheModal;
        };
        this.setOverlayRef = (overlay) => {
            if (this.props.overlayRef) {
                this.props.overlayRef(overlay);
            }
        };
        // handle clicks on overlay element
        this.handleOverlayOnClick = (event) => {
            if (this.props.shouldCloseOnOverlayClick) {
                if (isFunction(this.props.onRequestClose)) {
                    this.requestClose(event);
                }
                else {
                    this.focusContent();
                }
            }
        };
        this.requestClose = (event) => {
            if (isFunction(this.props.onRequestClose) && this.props.onRequestClose) {
                this.props.onRequestClose(event);
            }
        };
        // Don't steal focus from inner elements
        this.focusContent = () => {
            return this.content && !this.contentHasFocus() && this.content.focus();
        };
        this.contentHasFocus = () => {
            return document.activeElement === this.content
                || this.content.contains(document.activeElement);
        };
        // private ownerHandlesClose = () => {
        //   return this.props.onRequestClose;
        // }
        this.buildClassName = (which, additional) => {
            return this.classNames(CLASS_NAMES[which], additional, {
                [`${CLASS_NAMES[which]}-after-open`]: this.state.afterOpen,
                [`${CLASS_NAMES[which]}-before-close`]: this.state.beforeClose || (!this.state.isOpen && this.props.cacheModal)
            });
        };
        // modal content element ref
        this.setContentRef = (content) => {
            this.content = content;
            if (this.props.contentRef) {
                this.props.contentRef(content);
            }
        };
        this.handleKeyDown = (event) => {
            if (this.props.shouldCloseOnEsc && event.keyCode === ESC_KEY) {
                event.preventDefault();
                this.requestClose(event);
            }
        };
    }
    /**
     * We don't use child componentDidMount lifecycle directly in modal-portal.tsx
     * cause of lifecycle componentDidMount (Child-->Parent)
     * so we should waiting Modal has been mounted here
     * @memberof ModalPortal
     */
    componentModalDidMount() {
        // Focus needs to be set when mounting and already open
        if (this.props.isOpen) {
            this.setFocusAfterRender(true);
            this.open();
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.isOpen && !prevProps.isOpen) {
            this.open();
        }
        else if (!this.props.isOpen && prevProps.isOpen) {
            this.close();
        }
        if (this.focusAfterRender && this.state.isOpen && !prevState.isOpen) {
            this.focusContent();
            this.setFocusAfterRender(false);
        }
    }
    beforeOpen() {
        // console.log('beforeOpen(): add class name bodyOpenClassName', this.props.bodyOpenClassName);
        if (!this.props.bodyOpenClassName) {
            return;
        }
        bodyClassList.add(this.props.bodyOpenClassName);
        if (this.props.onBeforeOpen) {
            this.props.onBeforeOpen();
        }
    }
    render() {
        const { className, overlayClassName, children, style, defaultStyles } = this.props;
        const contentStyles = className ? {} : defaultStyles.content;
        const overlayStyles = overlayClassName ? {} : defaultStyles.overlay;
        const overlayMaskStyles = this.props.mask ? {} : {
            backgroundColor: 'transparent'
        };
        return this.shouldBeClosed() ? null : (<UnTouchable>
        <FastClick ref={this.setOverlayRef} onClick={this.handleOverlayOnClick} className={this.buildClassName('overlay', overlayClassName)} style={Object.assign({}, overlayStyles, style.overlay, overlayMaskStyles)}/>
        <div className="modal-portal-wrap" style={Object.assign({}, contentStyles, style.content)} ref={this.setContentRef}>
          <div className={this.buildClassName('content')} onKeyDown={this.handleKeyDown}>
            {children}
          </div>
        </div>

      </UnTouchable>);
    }
}
ModalPortal.defaultProps = {
    style: {
        overlay: {},
        content: {}
    }
};
