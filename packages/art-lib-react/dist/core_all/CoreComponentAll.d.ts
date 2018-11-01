import CoreComponent from '../core/CoreComponent';
export default class CoreComponentAll<P, S> extends CoreComponent<P, S> {
    constructor(props: any, context: any);
    showMessage: (message: string, onAfterClosed?: any, duration?: number | undefined) => void;
    setPageTitle: (name: string, JSBridge: any) => any;
}
