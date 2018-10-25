import React from 'react';
import { isArray } from '../utils/lang';
import { trim } from '../utils/string';
import merge from '../utils/merge';
import classnames from 'classnames';
import './viewport';
import omit from '../utils/omit';
export default class CoreComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    mergeProps(deep = true, target, ...source) {
        return merge(deep, target, ...source);
    }
    mergeStyles(args) {
        const style = {};
        if (isArray(args)) {
            args.forEach((s) => this.mergeProps(true, style, s));
        }
        else {
            this.mergeProps(true, style, args);
        }
        return this.mergeProps(true, style, this.props.style);
    }
    applyArgs(prefix, ...args) {
        if (isArray(args[0])) {
            args = args[0];
        }
        return { [`v-${prefix}`]: args.length ? trim(args.join(' ')).replace(/\s+/ig, ' ') : '' };
    }
    classNames(...args) {
        const result = classnames(args);
        return result;
    }
    classNameWithProps(...args) {
        return this.classNames.apply(this, args.concat([this.props.className]));
    }
    restProps(props, ...excludedKeys) {
        return omit(excludedKeys, props);
    }
}
// const componentUid = uniqueFactory('uuid_component_', 1);
// export const uuidWrapper = (WrapperComponent): any => {
//   return class ComponentWrapper extends React.Component<any, any> {
//     public static uuid = componentUid();
//     public render() {
//       return (
//         <WrapperComponent {...this.props} />
//       );
//     }
//   };
// };
