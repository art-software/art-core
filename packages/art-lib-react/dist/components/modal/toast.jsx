import './style/toast.less';
import Notice from './notice';
const defaultModalProps = {
    portalType: 'toast',
    mask: false,
    toastInline: false
};
const SHORT = 2000;
// const LONG = 8000;
export default {
    show(children, duration = SHORT, onAfterClosed, modalProps) {
        return Notice.show(Object.assign({ children,
            onAfterClosed }, Object.assign({}, defaultModalProps, modalProps)), duration);
    }
};
