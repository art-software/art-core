var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from 'react';
import './styles/number.keyboard.popup.less';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import Popup from '../modal/Popup';
import NumberKeyboard from './NumberKeyboard';
var ExtraKeyText;
(function (ExtraKeyText) {
    ExtraKeyText["delete"] = "\u5220\u9664";
    ExtraKeyText["close"] = "\u5B8C\u6210";
    ExtraKeyText["extra"] = ".";
})(ExtraKeyText || (ExtraKeyText = {}));
export default class NumberKeyboardPopup extends CoreComponent {
    constructor() {
        super(...arguments);
        this.keyBoardAfterOpen = () => {
            if (this.props.onShow) {
                this.props.onShow();
            }
        };
        this.keyBoardAfterClosed = () => {
            if (this.props.onHide) {
                this.props.onHide();
            }
        };
    }
    render() {
        const _a = this.props, { isOpen, mask, onClickMask } = _a, numberKeyboardPopupProps = __rest(_a, ["isOpen", "mask", "onClickMask"]);
        return (<Popup className={`${!mask && 'v-keyboard-popup'}`} isOpen={isOpen} mask={mask} onRequestClose={onClickMask} onAfterOpen={this.keyBoardAfterOpen} onAfterClosed={this.keyBoardAfterClosed}>
        <NumberKeyboard {...this.restProps(numberKeyboardPopupProps)}></NumberKeyboard>
      </Popup>);
    }
}
NumberKeyboardPopup.defaultProps = {
    isOpen: false,
    mask: false,
    extraText: ExtraKeyText.extra,
    deleteText: ExtraKeyText.delete,
    closeButtonText: ExtraKeyText.close
};
