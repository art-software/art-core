import React from 'react';
import { isArray } from 'art-lib-utils/src/utils/lang';
import { trim } from 'art-lib-utils/src/utils/string';
import merge from 'art-lib-utils/src/utils/merge';
import { IComponentProps } from './proptype';
import classnames from 'classnames';
import 'art-lib-utils/src/utils/viewport';
import omit from 'art-lib-utils/src/utils/omit';

export default class CoreComponent<P, S> extends React.Component<P & IComponentProps, S> {
  constructor(props?, context?) {
    super(props, context);
  }

  public mergeProps(deep = true, target: object, ...source: Array<object | null | undefined>) {
    return merge(deep, target, ...source);
  }

  public mergeStyles(args: object | object[]) {
    const style = {};
    if (isArray(args)) {
      args.forEach((s) => this.mergeProps(true, style, s));
    } else {
      this.mergeProps(true, style, args);
    }
    return this.mergeProps(true, style, this.props.style);
  }

  public applyArgs(prefix, ...args) {
    if (isArray(args[0])) {
      args = args[0];
    }
    return { [`v-${prefix}`]: args.length ? trim(args.join(' ')).replace(/\s+/ig, ' ') : '' };
  }

  public classNames(...args): string {
    const result = classnames(args);
    return result;
  }

  public classNameWithProps (...args): string {
    return this.classNames.apply(this, args.concat([this.props.className]));
  }

  public restProps(props, ...excludedKeys) {
    return omit(excludedKeys, props);
  }
}
