/// <reference types="react" />
import './styles/number.keyboard.less';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { INumberKeyboardProps } from './propTypes';
declare enum ExtraKeyText {
    delete = "\u5220\u9664",
    close = "\u5B8C\u6210",
    extra = "."
}
export interface IKeyTplValue {
    text: string | number;
    type?: string;
    className?: string;
}
export default class NumberKeyboard extends CoreComponent<INumberKeyboardProps, any> {
    static defaultProps: {
        extraText: ExtraKeyText;
        deleteText: ExtraKeyText;
        closeButtonText: ExtraKeyText;
    };
    state: {
        keys: IKeyTplValue[];
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    handlerStatus: boolean;
    setWindowHandler(action: boolean): void;
    onBlur: () => void;
    onClose: () => void;
    onPress: (text?: import("csstype").AnimationIterationCountProperty) => void;
    buildClassName: (additional: string, hasBaseClass?: boolean | undefined) => string;
    private sortNumberKeys;
    private getKeys;
    render(): JSX.Element;
}
export {};
