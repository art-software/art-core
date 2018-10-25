import './style/toast.less';
import Notice from './notice';
import { INoticeProps } from './propstype';

const defaultModalProps = {
  portalType: 'toast' as 'toast',
  mask: false,
  toastInline: false
};

const SHORT = 2000;
// const LONG = 8000;

export default {
  show(children: JSX.Element, duration: number = SHORT, onAfterClosed?, modalProps?: INoticeProps) {
    return Notice.show({
      children,
      onAfterClosed,
      ...Object.assign({}, defaultModalProps, modalProps)
    }, duration);
  }
};