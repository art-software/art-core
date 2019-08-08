/// <reference types="react" />
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { IPickerTrebleProps, IColumnValue, ISingleColumns } from './propTypes';
export default class PickerTreble extends CoreComponent<IPickerTrebleProps, any> {
    private selectedLeftItem;
    private selectedCenterItem;
    private selectedRightItem;
    private centerPickerList;
    private rightPickerList;
    private centerPickerRef;
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
    setLeftPickerRef: (ref: any) => void;
    setCenterPickerRef: (ref: any) => void;
    setRightPickerRef: (ref: any) => void;
    handleUpdateLeftDataSource: () => Promise<ISingleColumns>;
    handleUpdateCenterDataSource: () => Promise<ISingleColumns>;
    handleUpdateRightDataSource: () => Promise<ISingleColumns>;
    handelLeftSelected: (leftItem: IColumnValue | undefined, isFirstChoose: any) => void;
    handelCenterSelected: (centerItem: IColumnValue | undefined, isFirstChoose: any) => void;
    handelRightSelected: (rightItem: {} | undefined, isFirstChoose: any) => void;
    handleColumnsRunning: (status: any) => void;
    handleCancel: () => void;
    handleConfirm: () => void;
    handleRunning: (status: any) => void;
    private buildClassName;
    render(): JSX.Element;
}
