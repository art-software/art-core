import './style/modal.less';
import CoreComponent from '../../core/CoreComponent';
import React from 'react';
import { createPortal } from 'react-dom';
import { canUseDOM } from './helper/safeHTMLElement';
import { IModalProps } from './propstype';
import ModalPortal from './modal-portal';
import getModalZIndex from './helper/zIndex';

function getParentElement(parentSelector) {
  return parentSelector();
}

export default class Modal extends CoreComponent<IModalProps, any> {
  public static defaultProps = {
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

  private node: HTMLElement | null = null;

  public static defaultStyles = {
    overlay: {},
    content: {
      WebkitOverflowScrolling: 'touch'
    }
  };

  public componentDidMount() {
    if (!canUseDOM || !this.node) { return; }
    this.node.className = this.classNameWithProps(this.props.portalClassName);
    this.node.setAttribute('v-modal-portal', this.props.portalType as string);
    Object.assign(this.node.style, this.mergeStyles({ zIndex: getModalZIndex() }));
    const parent = getParentElement(this.props.parentSelector);
    if (parent) {
      parent.appendChild(this.node);
    } else {
      console.warn(`modal parent node is not available ${this.props.parentSelector}`);
    }
    if (this.props.onModalReady) {
      this.props.onModalReady(this);
    }
    this.portal.componentModalDidMount();
  }

  public componentDidUpdate(prevProps) {
    if (!canUseDOM || !this.node) { return; }
    const { isOpen, portalClassName } = this.props;
    if (prevProps.portalClassName !== portalClassName && portalClassName) {
      this.node.className = portalClassName;
    }
    // Stop unnecessary renders if modal is remaining closed
    if (!this.props.isOpen && !isOpen) { return; }

    const prevParent = getParentElement(prevProps.parentSelector);
    const nextParent = getParentElement(this.props.parentSelector);

    if (nextParent !== prevParent) {
      prevParent.removeChild(this.node);
      nextParent.appendChild(this.node);
    }
  }

  public componentWillUnmount() {
    console.log('modal componentWillUnmount...');
    this.destroy();
  }

  public destroy(callback?) {
    if (!canUseDOM || !this.node || !this.portal) { return; }
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

    } else {
      this.removePortal(callback);
    }
  }

  private removePortal = (callback?) => {
    const parent = getParentElement(this.props.parentSelector);
    // render([], this.node);
    if (parent) {
      parent.removeChild(this.node);
    }
    this.node = null;
    if (callback) { callback(); }
  }

  private portal: ModalPortal;
  private portalRef = (ref) => {
    this.portal = ref;
  }

  private handleAfterClosed = () => {
    if (!this.node) { return; }
    this.node.classList.remove('active');
    if (this.props.onAfterClosed) {
      this.props.onAfterClosed();
    }
  }

  private handleBeforeOpen = () => {
    if (!this.node) { return; }
    this.node.classList.add('active');
  }

  public render() {
    if (!canUseDOM) { return null; }
    if (!this.node) {
      this.node = document.createElement('div');
    }
    const { parentSelector, portalType, portalClassName, ...restProps } = this.props;

    return (
      createPortal(
        <ModalPortal
          {...this.restProps(restProps)}
          ref={this.portalRef}
          defaultStyles={Modal.defaultStyles}
          onAfterClosed={this.handleAfterClosed}
          onBeforeOpen={this.handleBeforeOpen}
        />,
        this.node
      )
    );
  }
}