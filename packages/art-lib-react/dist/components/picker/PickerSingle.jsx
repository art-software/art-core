var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import PickerColumn from './PickerColumn';
import Popup from '../modal/Popup';
import Spinner from '../spinner';
import PickerBar from './PickerBar';
import viewport from 'art-lib-utils/src/utils/viewport';
const CLASS_NAME = 'v-picker-single';
export default class PickerSingle extends CoreComponent {
    constructor() {
        super(...arguments);
        this.state = {
            defaultIndex: 0,
            running: false,
            spinner: true
        };
        this.setPickerRef = (ref) => {
            if (ref) {
                ref.updateDataSource();
            }
        };
        this.handleUpdateDataSource = () => {
            if (this.state.spinner === false) {
                this.setState({ spinner: true });
            }
            return this.props.updateDataSource();
        };
        this.handleCancel = () => {
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        };
        this.handleConfirm = () => {
            if (this.state.running === false && !this.state.spinner && this.props.onConfirm) {
                this.props.onConfirm(this.selectedItem);
            }
        };
        this.handelSelected = (selectedItem, isFirstChoose) => {
            if (this.state.spinner === true) {
                this.setState({ spinner: false });
            }
            this.selectedItem = selectedItem;
            // is first load will trigger onChange base of selectImmediate
            if (this.props.onChange && (this.props.selectImmediate || !isFirstChoose)) {
                this.props.onChange(this.selectedItem);
            }
        };
        this.handleRunning = (status) => {
            if (status === true && this.state.running === true) {
                return;
            }
            this.setState({ running: status });
        };
        this.buildClassName = (additional, hasBaseClass = false) => {
            return this.classNames({
                [CLASS_NAME]: hasBaseClass,
                [`${CLASS_NAME}-${additional}`]: additional
            });
        };
    }
    render() {
        const state = this.state;
        const _a = this.props, { isOpen, mask, className, onAfterClosed, onRequestClose, onAfterOpen, title, cancelButtonText, confirmButtonText, cacheModal, pickerBarHeight } = _a, restProps = __rest(_a, ["isOpen", "mask", "className", "onAfterClosed", "onRequestClose", "onAfterOpen", "title", "cancelButtonText", "confirmButtonText", "cacheModal", "pickerBarHeight"]);
        const popupProps = Object.assign({ isOpen, mask, className, onAfterClosed, onRequestClose, onAfterOpen, cacheModal }, { className: `${!mask ? 'v-picker-popup' : ''} ${CLASS_NAME}` });
        const PickerBarProps = {
            pickerBarHeight,
            title,
            confirmButtonText,
            cancelButtonText,
            confirmStatus: state.running || state.spinner,
            onCancel: this.handleCancel,
            onConfirm: this.handleConfirm
        };
        const pickerColumnProps = Object.assign(restProps, {
            onSelected: this.handelSelected,
            updateDataSource: this.handleUpdateDataSource,
            onRunning: this.handleRunning
        });
        const spinnerStyle = {
            top: viewport.px2rem(pickerBarHeight)
        };
        return (<Popup {...popupProps}>
        <PickerBar className={this.buildClassName('bar')} {...PickerBarProps}/>
        <PickerColumn {...pickerColumnProps} ref={this.setPickerRef}/>
        <Spinner style={spinnerStyle} isOpen={this.state.spinner}/>
      </Popup>);
    }
}
PickerSingle.defaultProps = {
    isOpen: true,
    mask: true,
    visibleItemCount: 5,
    itemHeight: 88,
    pickerBarHeight: 80,
    selectImmediate: false,
    updateDataSource: () => Promise.resolve(),
};
