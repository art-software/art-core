import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import React from 'react';
import { IKeyProps } from './propTypes';
export declare class Key extends CoreComponent<IKeyProps, any> {
    state: {
        active: boolean;
    };
    onFocus: () => void;
    onBlur: (event: React.TouchEvent<HTMLElement>) => void;
    buildClassName: (additional?: any) => string;
    render(): JSX.Element;
}
export declare class RightBtnKey extends CoreComponent<IKeyProps, any> {
    render(): JSX.Element;
}
export declare class BottomMiddleKey extends CoreComponent<IKeyProps, any> {
    render(): JSX.Element;
}
