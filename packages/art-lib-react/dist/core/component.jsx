import React from 'React';
import { isArray } from '../utils/lang';
import { trim } from '../utils/string';
export default class Component extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    applyArgs(prefix, ...args) {
        if (isArray(args[0])) {
            args = args[0];
        }
        return { [`v-${prefix}`]: args.length ? trim(args.join(' ')).replace(/\s+/ig, ' ') : '' };
    }
}
