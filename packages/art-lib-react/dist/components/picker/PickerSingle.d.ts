/// <reference types="react" />
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { IPickerSingleProps } from './propTypes';
export default class PickerSingle extends CoreComponent<IPickerSingleProps, any> {
    private selectedItem;
    static defaultProps: {
        isOpen: boolean;
        mask: boolean;
        visibleItemCount: number;
        itemHeight: number;
        pickerBarHeight: number;
        selectImmediate: boolean;
        updateDataSource: () => Promise<void>;
    };
    state: {
        defaultIndex: number;
        running: boolean;
        spinner: boolean;
    };
    setPickerRef: (ref: any) => void;
    handleUpdateDataSource: () => Promise<import("art-lib-react/src/components/picker/propTypes").ISingleColumns>;
    handleCancel: () => void;
    handleConfirm: () => void;
    handelSelected: (selectedItem: any, isFirstChoose: any) => void;
    handleRunning: (status: any) => void;
    private buildClassName;
    render(): JSX.Element;
}
