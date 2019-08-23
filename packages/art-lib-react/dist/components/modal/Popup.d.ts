/// <reference types="react" />
import './style/popup.less';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { IModalProps } from 'art-lib-react/src/components/modal/propstype';
export default class Popup extends CoreComponent<IModalProps, any> {
    static defaultProps: {
        closeTimeoutMS: number;
        mask: boolean;
    };
    render(): JSX.Element;
}
