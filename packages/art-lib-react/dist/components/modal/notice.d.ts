import CoreComponent from '../../core/CoreComponent';
import { INoticeProps } from './propstype';
export default class Notice extends CoreComponent<INoticeProps, any> {
    static defaultProps: {
        type: undefined;
        toastInline: boolean;
    };
    private static NoticeWrapper;
    static show: (props: INoticeProps, duration?: number) => {
        close: () => void;
        instance: any;
    };
    static close: (instance?: null) => void;
    render(): any;
}
