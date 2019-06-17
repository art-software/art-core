export interface IPickerColumnProps {
    itemHeight: number;
    visibleItemCount: number;
    onRunning?: (isLastRun: boolean) => void;
    onSelected?: (selectedItem: IColumnValue, isFirstChoose: boolean) => void;
    updateDataSource: () => Promise<any>;
}
export interface IPickerBaseProps {
    itemHeight: number;
    visibleItemCount: number;
    isOpen: boolean;
    mask: boolean;
    title?: string;
    pickerBarHeight: number;
    confirmButtonText?: string;
    cancelButtonText?: string;
    cacheModal?: boolean;
    selectImmediate?: boolean;
    onCancel?: () => void;
    onAfterClosed?: () => void;
    onRequestClose?: () => void;
    onAfterOpen?: () => void;
}
export interface IPickerSingleProps extends IPickerBaseProps {
    updateDataSource: () => Promise<ISingleColumns>;
    onConfirm?: (selectedItem: IColumnValue) => void;
    onChange?: (selectedItem: IColumnValue) => void;
}
export interface IPickerDoubleProps extends IPickerBaseProps {
    updateDataSource: () => Promise<IDoubleColums>;
    onConfirm?: (selectedItems: ISelectedDouble) => void;
    onChange?: (selectedItems: ISelectedDouble) => void;
}
export interface IPickerTrebleProps extends IPickerBaseProps {
    updateDataSource: () => Promise<ITrebleColums>;
    onConfirm?: (selectedItems: ISelectedTreble) => void;
    onChange?: (selectedItems: ISelectedTreble) => void;
}
export interface IPickerBarProps {
    pickerBarHeight: number;
    title: string;
    confirmButtonText: string;
    cancelButtonText: string;
    confirmStatus: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
}
export interface IColumnValue {
    id?: string;
    value?: string;
    className?: string;
    parentId?: string;
}
export interface ISingleColumns {
    dataList: IColumnValue[];
    selectedId?: string;
}
export interface IDoubleColums {
    firstRow: IColumnValue[];
    secondRow: IColumnValue[];
    firstSelectId?: string;
    secondSelectId?: string;
}
export interface ISelectedDouble {
    firstItem: IColumnValue;
    secondItem: IColumnValue;
}
export interface ITrebleColums {
    firstRow: IColumnValue[];
    secondRow: IColumnValue[];
    trebleRow: IColumnValue[];
    firstSelectId?: string;
    secondSelectId?: string;
    trebleSelectId?: string;
}
export interface ISelectedTreble {
    firstItem: IColumnValue;
    secondItem: IColumnValue;
    trebleItem: IColumnValue;
}
