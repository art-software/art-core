import React from 'react';
import CoreComponent from '../core/CoreComponent';
import Toast from '../components/modal/toast';
export default class CoreComponentAll extends CoreComponent {
    constructor(props, context) {
        super(props, context);
        this.showMessage = (message, onAfterClosed, duration) => {
            const toastChildren = <div>{message}</div>;
            const { close } = Toast.show(toastChildren, duration || 2000, onAfterClosed, {
                onRequestClose: () => { close(); }
            });
        };
        this.setPageTitle = (name, JSBridge) => {
            document.title = name;
            const isApp = JSBridge.isApp();
            if (isApp) {
                return JSBridge.setPageTitle(name);
            }
        };
    }
}
