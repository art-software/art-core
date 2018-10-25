var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import './style/modal.less';
import CoreComponent from '../../core/CoreComponent';
import React from 'react';
import { createPortal } from 'react-dom';
import { canUseDOM } from './helper/safeHTMLElement';
import ModalPortal from './modal-portal';
import getModalZIndex from './helper/zIndex';
function getParentElement(parentSelector) {
    return parentSelector();
}
export default class Modal extends CoreComponent {
    constructor() {
        super(...arguments);
        this.node = null;
        this.removePortal = (callback) => {
            const parent = getParentElement(this.props.parentSelector);
            // render([], this.node);
            if (parent) {
                parent.removeChild(this.node);
            }
            this.node = null;
            if (callback) {
                callback();
            }
        };
        this.portalRef = (ref) => {
            this.portal = ref;
        };
        this.handleAfterClosed = () => {
            if (!this.node) {
                return;
            }
            this.node.classList.remove('active');
            if (this.props.onAfterClosed) {
                this.props.onAfterClosed();
            }
        };
        this.handleBeforeOpen = () => {
            if (!this.node) {
                return;
            }
            this.node.classList.add('active');
        };
    }
    componentDidMount() {
        if (!canUseDOM || !this.node) {
            return;
        }
        this.node.className = this.classNameWithProps(this.props.portalClassName);
        this.node.setAttribute('v-modal-portal', this.props.portalType);
        Object.assign(this.node.style, this.mergeStyles({ zIndex: getModalZIndex() }));
        const parent = getParentElement(this.props.parentSelector);
        if (parent) {
            parent.appendChild(this.node);
        }
        else {
            console.warn(`modal parent node is not available ${this.props.parentSelector}`);
        }
        if (this.props.onModalReady) {
            this.props.onModalReady(this);
        }
        this.portal.componentModalDidMount();
    }
    componentDidUpdate(prevProps) {
        if (!canUseDOM || !this.node) {
            return;
        }
        const { isOpen, portalClassName } = this.props;
        if (prevProps.portalClassName !== portalClassName && portalClassName) {
            this.node.className = portalClassName;
        }
        // Stop unnecessary renders if modal is remaining closed
        if (!this.props.isOpen && !isOpen) {
            return;
        }
        const prevParent = getParentElement(prevProps.parentSelector);
        const nextParent = getParentElement(this.props.parentSelector);
        if (nextParent !== prevParent) {
            prevParent.removeChild(this.node);
            nextParent.appendChild(this.node);
        }
    }
    componentWillUnmount() {
        console.log('modal componentWillUnmount...');
        this.destroy();
    }
    destroy(callback) {
        if (!canUseDOM || !this.node || !this.portal) {
            return;
        }
        // Make sure removePortal run after modalPortal.close();
        const now = Date.now();
        const state = this.portal.state;
        const closesAt = state.isOpen
            && this.props.closeTimeoutMS
            && (state.closesAt || now + this.props.closeTimeoutMS);
        if (closesAt) {
            if (!state.beforeClose) {
                this.portal.closeWithTimeout();
            }
            setTimeout(() => {
                this.removePortal(callback);
            }, closesAt - now);
        }
        else {
            this.removePortal(callback);
        }
    }
    render() {
        if (!canUseDOM) {
            return null;
        }
        if (!this.node) {
            this.node = document.createElement('div');
        }
        const _a = this.props, { parentSelector, portalType, portalClassName } = _a, restProps = __rest(_a, ["parentSelector", "portalType", "portalClassName"]);
        return (createPortal(<ModalPortal {...this.restProps(restProps)} ref={this.portalRef} defaultStyles={Modal.defaultStyles} onAfterClosed={this.handleAfterClosed} onBeforeOpen={this.handleBeforeOpen}/>, this.node));
    }
}
Modal.defaultProps = {
    mask: true,
    isOpen: false,
    portalType: 'normal',
    portalClassName: 'modal-portal',
    bodyOpenClassName: 'modal-portal-body-open',
    style: { overlay: {}, content: {} },
    closeTimeoutMS: 400,
    shouldFocusAfterRender: true,
    shouldCloseOnEsc: true,
    shouldCloseOnOverlayClick: true,
    shouldReturnFocusAfterClose: true,
    parentSelector() {
        return document.body;
    }
};
Modal.defaultStyles = {
    overlay: {},
    content: {
        WebkitOverflowScrolling: 'touch'
    }
};
