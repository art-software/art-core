import React from 'react';
import CoreComponent from '../core/CoreComponent';
import Toast from '../components/modal/toast';

export default class CoreComponentAll<P, S> extends CoreComponent<P, S> {
  constructor(props, context) {
    super(props, context);
  }

  public showMessage = (message: string, onAfterClosed?, duration?: number) => {
    const toastChildren = <div>{message}</div>;
    const { close } = Toast.show(toastChildren, duration || 2000, onAfterClosed, {
      onRequestClose: () => { close(); }
    });
  }

  public setPageTitle = (name: string, JSBridge: any) => {
    document.title = name;
    const isApp = JSBridge.isApp();
    if (isApp) {
      return JSBridge.setPageTitle(name);
    }
  }
}