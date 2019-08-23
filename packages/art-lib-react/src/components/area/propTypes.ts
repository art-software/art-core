import { IColumnValue } from '../picker/propTypes';

export interface IAreaProps {
  itemHeight?: number; // 每一个值的高度
  visibleItemCount?: number; // 显示条数
  isOpen: boolean;
  mask: boolean;
  title?: string;
  pickerBarHeight?: number;
  confirmButtonText?: string;
  cancelButtonText?: string;
  cacheModal?: boolean; // no cache will lose your choose record
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