import React from 'react';
import { isArray } from '../utils/lang';
import { trim } from '../utils/string';
import merge from '../utils/merge';
import { IComponentProps } from './proptype';
import classnames from 'classnames';
import './viewport';

export default class CoreComponent<P, S> extends React.Component<P & IComponentProps, S> {
  constructor(props?, context?) {
    super(props, context);
  }

  public mergeProps(deep = true, target: object, ...source: Array<object | null | undefined>) {
    return merge(deep, target, ...source);
  }

  public applyArgs(prefix, ...args) {
    if (isArray(args[0])) {
      args = args[0];
    }
    return { [`v-${prefix}`]: args.length ? trim(args.join(' ')).replace(/\s+/ig, ' ') : '' };
  }

  public classNames(...args) {
    const result = classnames(args);
    return result;
  }

  public className(...args) {
    return this.classNames.apply(this, args.concat([this.props.className]));
  }
}