import CoreComponent from '../../core/CoreComponent';
import { IConfirmProps } from './propstype';
import './style/confirm.less';
export default class Confirm extends CoreComponent<IConfirmProps, any> {
    static defaultProps: {
        title: string;
        okText: string;
        cancelText: string;
        onOk: () => void;
        onCancel: () => void;
    };
    private static ConfirmWrapper;
    static show: (props: IConfirmProps) => {
        close: () => void;
        instance: any;
    };
    static close: () => void;
    render(): JSX.Element;
}
