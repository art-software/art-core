import React from 'react';
import { IComponentProps } from './proptype';
import 'art-lib-utils/dist/utils/viewport';
export default class CoreComponent<P, S> extends React.Component<P & IComponentProps, S> {
    constructor(props?: any, context?: any);
    mergeProps(deep: boolean | undefined, target: object, ...source: Array<object | null | undefined>): any;
    mergeStyles(args: object | object[]): any;
    applyArgs(prefix: any, ...args: any[]): {
        [x: string]: any;
    };
    classNames(...args: any[]): string;
    classNameWithProps(...args: any[]): string;
    restProps(props: any, ...excludedKeys: any[]): any;
}
