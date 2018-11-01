import React from 'react';
import { isArray } from 'art-lib-utils/dist/utils/lang';
import { trim } from 'art-lib-utils/dist/utils/string';
import merge from 'art-lib-utils/dist/utils/merge';
import classnames from 'classnames';
import 'art-lib-utils/dist/utils/viewport';
import omit from 'art-lib-utils/dist/utils/omit';
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
