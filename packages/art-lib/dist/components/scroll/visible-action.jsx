var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import './style/visible-action.less';
import CoreComponent from '../../core/CoreComponent';
import { inviewport } from './inviewport';
export default class VisibleAction extends CoreComponent {
    constructor(props, context) {
        super(props, context);
        this.hasExecutedAction = false;
        this.state = {
            visible: false
        };
        this.handleTouchMove = (iScroll) => {
            if (this.props.enable === false) {
                return;
            }
            this.setState({
                visible: this.isInViewport(iScroll)
            }, () => {
                this.execAction();
            });
        };
        this.handleNodeElem = (node) => {
            if (node) {
                this.visibleActionElem = node;
            }
        };
        this.withIScroll = context.withIScroll;
    }
    componentDidMount() {
        if (!this.withIScroll) {
            return console.error('`visible-action` must be wrapped within Scrollbar');
        }
        this.withIScroll(true, (iScroll) => {
            this.handleTouchMove(iScroll);
            iScroll.on('scroll', (e) => {
                this.handleTouchMove(iScroll);
            });
        });
    }
    isInViewport(iScroll) {
        return inviewport(this.visibleActionElem, { container: iScroll, threshold: this.props.threshold });
    }
    execAction() {
        const onAction = this.props.onAction;
        if (this.props.visibleOnce) {
            if (this.hasExecutedAction === false && this.state.visible === true) {
                this.hasExecutedAction = true;
                onAction(this.state.visible, this.props.data);
            }
        }
        else {
            onAction(this.state.visible, this.props.data);
        }
    }
    render() {
        const _a = this.props, { children, ref } = _a, restProps = __rest(_a, ["children", "ref"]);
        return (<div ref={this.handleNodeElem} {...this.applyArgs('visible-action')} {...restProps}>
        {children}
      </div>);
    }
}
VisibleAction.defaultProps = {
    enable: true,
    data: {},
    threshold: 0,
    // only run action onece.
    visibleOnce: true,
    onAction: (visible, data) => { console.log('data:', visible, data); }
};
