/// <reference types="react" />
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { IPickerBarProps } from './propTypes';
export default class PickerBar extends CoreComponent<IPickerBarProps, any> {
    static defaultProps: {
        title: string;
        confirmButtonText: string;
        cancelButtonText: string;
        confirmStatus: boolean;
        onCancel: () => void;
        onConfirm: () => void;
    };
    render(): JSX.Element;
}
