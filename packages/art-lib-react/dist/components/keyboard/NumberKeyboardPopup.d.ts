/// <reference types="react" />
import './styles/number.keyboard.popup.less';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { INumberKeyboardPopupProps } from './propTypes';
declare enum ExtraKeyText {
    delete = "\u5220\u9664",
    close = "\u5B8C\u6210",
    extra = "."
}
export default class NumberKeyboardPopup extends CoreComponent<INumberKeyboardPopupProps, any> {
    static defaultProps: {
        isOpen: boolean;
        mask: boolean;
        extraText: ExtraKeyText;
        deleteText: ExtraKeyText;
        closeButtonText: ExtraKeyText;
    };
    keyBoardAfterOpen: () => void;
    keyBoardAfterClosed: () => void;
    render(): JSX.Element;
}
export {};
