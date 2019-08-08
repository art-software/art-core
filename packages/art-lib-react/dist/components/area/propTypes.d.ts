import { IColumnValue } from '../picker/propTypes';
export interface IAreaProps {
    itemHeight?: number;
    visibleItemCount?: number;
    isOpen: boolean;
    mask: boolean;
    title?: string;
    pickerBarHeight?: number;
    confirmButtonText?: string;
    cancelButtonText?: string;
    cacheModal?: boolean;
    loadTime?: number;
    defaultChooseId?: string;
    onCancel?: () => void;
    onAfterClosed?: () => void;
    onRequestClose?: () => void;
    onAfterOpen?: () => void;
    onChange?: (selectedItem: IAreaSeleted) => void;
    onConfirm?: (selectedItems: IAreaSeleted) => void;
}
export interface IAreaSeleted {
    province: IColumnValue;
    city: IColumnValue;
    county: IColumnValue;
}
