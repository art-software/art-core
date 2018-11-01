import './style/toast.less';
import { INoticeProps } from './propstype';
declare const _default: {
    show(children: JSX.Element, duration?: number, onAfterClosed?: any, modalProps?: INoticeProps | undefined): {
        close: () => void;
        instance: any;
    };
};
export default _default;
