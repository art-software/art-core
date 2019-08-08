/// <reference types="react" />
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { IPickerDoubleProps, IColumnValue } from './propTypes';
export default class PickerDouble extends CoreComponent<IPickerDoubleProps, any> {
    private selectedLeftItem;
    private selectedRightItem;
    private rightPickerList;
    private rightPickerRef;
    private pickersData;
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
    setRightPickerRef: (ref: any) => void;
    setLeftPickerRef: (ref: any) => void;
    handleUpdateLeftDataSource: () => Promise<{
        dataList: IColumnValue[];
        selectedId: string | undefined;
    }>;
    handleUpdateRightDataSource: () => Promise<{}>;
    handelLeftSelected: (leftItem: IColumnValue | undefined, isFirstChoose: any) => void;
    handelRightSelected: (rightItem: {} | undefined, isFirstChoose: any) => void;
    handleCancel: () => void;
    handleConfirm: () => void;
    handleRunning: (status: any) => void;
    private buildClassName;
    render(): JSX.Element;
}
