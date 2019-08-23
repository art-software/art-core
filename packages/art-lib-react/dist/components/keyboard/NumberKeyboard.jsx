import './styles/number.keyboard.less';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import React from 'react';
import FastClick from 'art-lib-react/src/components/fastclick';
import UnTouchable from 'art-lib-react/src/components/untouchable';
import { Key, RightBtnKey, BottomMiddleKey } from './Key';
var ExtraKeyText;
(function (ExtraKeyText) {
    ExtraKeyText["delete"] = "\u5220\u9664";
    ExtraKeyText["close"] = "\u5B8C\u6210";
    ExtraKeyText["extra"] = ".";
})(ExtraKeyText || (ExtraKeyText = {}));
var KeyboardLayout;
(function (KeyboardLayout) {
    KeyboardLayout["default"] = "default";
    KeyboardLayout["twoRightBtn"] = "twoRightBtn";
})(KeyboardLayout || (KeyboardLayout = {}));
var KeyTypeName;
(function (KeyTypeName) {
    KeyTypeName["bottomMiddleKey"] = "bottomMiddleKey";
})(KeyTypeName || (KeyTypeName = {}));
const CLASS_NAME = 'v-number-keyboard';
const baseNumberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
export default class NumberKeyboard extends CoreComponent {
    constructor() {
        super(...arguments);
        this.state = {
            keys: []
        };
        this.handlerStatus = false;
        this.onBlur = () => {
            if (this.props.onBlur) {
                this.props.onBlur();
            }
        };
        this.onClose = () => {
            if (this.props.onClickClose) {
                this.props.onClickClose();
            }
            this.onBlur();
        };
        this.onPress = (text = '') => {
            if (text === '') {
                return;
            }
            const { deleteText, onClickDelete, closeButtonText, onInput } = this.props;
            if (text === deleteText && onClickDelete) {
                onClickDelete();
            }
            else if (text === closeButtonText) {
                this.onClose();
            }
            else if (onInput) {
                onInput(text);
            }
        };
        this.buildClassName = (additional, hasBaseClass) => {
            return this.classNames({
                [CLASS_NAME]: hasBaseClass
            }, `${CLASS_NAME}-${additional}`);
        };
    }
    componentDidMount() {
        this.setWindowHandler(true);
        this.setState({
            keys: this.getKeys()
        });
    }
    componentWillUnmount() {
        this.setWindowHandler(false);
    }
    setWindowHandler(action) {
        if (action !== this.handlerStatus && this.props.hideOnClickOutside) {
            this.handlerStatus = action;
            window[(action ? 'add' : 'remove') + 'EventListener']('touchstart', this.onBlur);
        }
    }
    sortNumberKeys() {
        if (this.props.needSortKeys) {
            baseNumberKeys.sort(() => {
                return Math.random() > .5 ? -1 : 1;
            });
        }
        return baseNumberKeys;
    }
    getKeys() {
        const keys = [];
        const sortedKeys = this.sortNumberKeys();
        const sortedKeysLastIndex = sortedKeys.length - 1;
        sortedKeys.forEach((key, index) => {
            if (index !== sortedKeysLastIndex) {
                keys.push({ text: key });
            }
        });
        const { keyboardLayout, extraText, deleteText } = this.props;
        const layout = keyboardLayout || KeyboardLayout.default;
        switch (layout) {
            case KeyboardLayout.default:
                keys.push({ text: extraText, className: 'bg-glary' }, { text: sortedKeys[sortedKeysLastIndex] }, { text: deleteText, className: 'delete-key bg-glary' });
                break;
            case KeyboardLayout.twoRightBtn:
                keys.push({ text: sortedKeys[sortedKeysLastIndex], type: KeyTypeName.bottomMiddleKey }, { text: extraText });
                break;
        }
        return keys;
    }
    render() {
        const { keyboardLayout, deleteText, closeButtonText } = this.props;
        const layout = keyboardLayout || KeyboardLayout.default;
        return (<UnTouchable>
        <FastClick>
          <div onTouchStart={(event) => event.stopPropagation()} className={this.buildClassName(layout, true)}>
            <div className={this.buildClassName('body')}>
              {this.state.keys.map((key, index) => {
            const { className, text, type } = key;
            switch (type) {
                case KeyTypeName.bottomMiddleKey:
                    return <BottomMiddleKey key={index} text={text} onPress={this.onPress}/>;
                default:
                    return <Key className={className} key={index} text={text} onPress={this.onPress}/>;
            }
        })}
            </div>
            {layout === KeyboardLayout.twoRightBtn && (<div className={this.buildClassName('sidebar')}>
                <RightBtnKey className="delete-key" text={deleteText} onPress={this.onPress}/>
                <RightBtnKey className="close-key" text={closeButtonText} onPress={this.onPress}/>
              </div>)}
          </div>
        </FastClick>
      </UnTouchable>);
    }
}
NumberKeyboard.defaultProps = {
    extraText: ExtraKeyText.extra,
    deleteText: ExtraKeyText.delete,
    closeButtonText: ExtraKeyText.close
};
