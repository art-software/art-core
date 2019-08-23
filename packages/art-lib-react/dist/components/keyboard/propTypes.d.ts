export interface INumberKeyboardProps {
    needSortKeys?: boolean;
    keyboardLayout?: 'default' | 'twoRightBtn';
    extraText: string | number;
    deleteText: string;
    closeButtonText: string;
    hideOnClickOutside?: boolean;
    onClickDelete?: () => void;
    onClickClose?: () => void;
    onInput?: (text: string | number) => void;
    onBlur?: () => void;
}
export interface IKeyProps {
    text: string | number;
    onPress: (text: string | number) => void;
}
export interface INumberKeyboardPopupProps extends INumberKeyboardProps {
    isOpen: boolean;
    mask?: boolean;
    onClickMask?: () => void;
    onShow?: () => void;
    onHide?: () => void;
}
