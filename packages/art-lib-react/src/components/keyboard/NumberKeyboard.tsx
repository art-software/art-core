import './styles/number.keyboard.less';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import React from 'react';
import FastClick from 'art-lib-react/src/components/fastclick';
import UnTouchable from 'art-lib-react/src/components/untouchable';
import { INumberKeyboardProps } from './propTypes';
import { Key, RightBtnKey, BottomMiddleKey } from './Key';

enum ExtraKeyText {
  delete = '删除',
  close = '完成',
  extra = '.'
}

enum KeyboardLayout {
  default = 'default',
  twoRightBtn = 'twoRightBtn'
}

enum KeyTypeName {
  bottomMiddleKey = 'bottomMiddleKey'
}

const CLASS_NAME = 'v-number-keyboard';
const baseNumberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export interface IKeyTplValue {
  text: string | number;
  type?: string;
  className?: string;
}

export default class NumberKeyboard extends CoreComponent<INumberKeyboardProps, any> {
  public static defaultProps = {
    extraText: ExtraKeyText.extra,
    deleteText: ExtraKeyText.delete,
    closeButtonText: ExtraKeyText.close
  };

  public state = {
    keys: [] as IKeyTplValue[]
  };

  public componentDidMount() {
    this.setWindowHandler(true);
    this.setState({
      keys: this.getKeys()
    });
  }

  public componentWillUnmount() {
    this.setWindowHandler(false);
  }

  public handlerStatus = false;
  public setWindowHandler(action: boolean) {
    if (action !== this.handlerStatus && this.props.hideOnClickOutside) {
      this.handlerStatus = action;
      window[(action ? 'add' : 'remove') + 'EventListener']('touchstart', this.onBlur);
    }
  }

  public onBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  public onClose = () => {
    if (this.props.onClickClose) {
      this.props.onClickClose();
    }
    this.onBlur();
  }

  public onPress = (text: string | number = ''): void => {
    if (text === '') {
      return;
    }
    const { deleteText, onClickDelete, closeButtonText, onInput  } = this.props;
    if (text === deleteText && onClickDelete) {
      onClickDelete();
    } else if (text === closeButtonText) {
      this.onClose();
    } else if (onInput) {
      onInput(text);
    }
  }

  public buildClassName = (additional: string, hasBaseClass?: boolean) => {
    return this.classNames({
      [CLASS_NAME]: hasBaseClass
    }, `${CLASS_NAME}-${additional}`);
  }

  private sortNumberKeys(): number[] {
    if (this.props.needSortKeys) {
      baseNumberKeys.sort(() => {
        return Math.random() > .5 ? -1 : 1;
      });
    }
    return baseNumberKeys;
  }

  private getKeys(): IKeyTplValue[] {
    const keys: IKeyTplValue[] = [];
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
        keys.push(
          { text: extraText, className: 'bg-glary' },
          { text: sortedKeys[sortedKeysLastIndex] },
          { text: deleteText, className: 'delete-key bg-glary' }
        );
        break;
      case KeyboardLayout.twoRightBtn:
        keys.push({ text: sortedKeys[sortedKeysLastIndex], type: KeyTypeName.bottomMiddleKey },
          { text: extraText });
        break;
    }
    return keys;
  }

  public render() {
    const { keyboardLayout, deleteText, closeButtonText } = this.props;
    const layout = keyboardLayout || KeyboardLayout.default;

    return (
      <UnTouchable >
        <FastClick>
          <div onTouchStart={(event) => event.stopPropagation()}
            className={this.buildClassName(layout, true)}>
            <div className={this.buildClassName('body')}>
              {this.state.keys.map((key, index) => {
                const { className, text, type } = key;
                switch (type) {
                  case KeyTypeName.bottomMiddleKey:
                    return <BottomMiddleKey key={index} text={text} onPress={this.onPress} />;
                  default:
                    return <Key className={className} key={index} text={text} onPress={this.onPress} />;
                }
              })}
            </div>
            {layout === KeyboardLayout.twoRightBtn && (
              <div className={this.buildClassName('sidebar')}>
                <RightBtnKey className="delete-key" text={deleteText} onPress={this.onPress} />
                <RightBtnKey className="close-key" text={closeButtonText} onPress={this.onPress} />
              </div>
            )}
          </div>
        </FastClick>
      </UnTouchable>
    );
  }
}