import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import PickerColumn from './PickerColumn';
import Popup from '../modal/Popup';
import Spinner from '../spinner';
import PickerBar from './PickerBar';
import viewport from 'art-lib-utils/src/utils/viewport';
const CLASS_NAME = 'v-picker-treble';
export default class PickerTreble extends CoreComponent {
    constructor() {
        super(...arguments);
        this.selectedLeftItem = {};
        this.selectedCenterItem = {};
        this.selectedRightItem = {};
        this.centerPickerList = [];
        this.rightPickerList = [];
        this.state = {
            defaultIndex: 0,
            running: false,
            spinner: true
        };
        this.setLeftPickerRef = (ref) => {
            if (ref) {
                ref.updateDataSource();
            }
        };
        this.setCenterPickerRef = (ref) => {
            this.centerPickerRef = ref;
        };
        this.setRightPickerRef = (ref) => {
            this.rightPickerRef = ref;
        };
        this.handleUpdateLeftDataSource = () => {
            if (this.state.spinner === false) {
                this.setState({ spinner: true });
            }
            return this.props.updateDataSource().then((pickersData) => {
                const { firstSelectId, secondSelectId, trebleSelectId, firstRow } = pickersData;
                this.pickersData = pickersData;
                this.selectedLeftItem = { id: firstSelectId };
                this.selectedCenterItem = { id: secondSelectId };
                this.selectedRightItem = { id: trebleSelectId };
                return { dataList: firstRow, selectedId: this.selectedLeftItem.id };
            });
        };
        this.handleUpdateCenterDataSource = () => {
            return new Promise((resolve) => {
                resolve({ dataList: this.centerPickerList, selectedId: this.selectedCenterItem.id });
            });
        };
        this.handleUpdateRightDataSource = () => {
            return new Promise((resolve) => {
                resolve({ dataList: this.rightPickerList, selectedId: this.selectedRightItem.id });
            });
        };
        this.handelLeftSelected = (leftItem = {}, isFirstChoose) => {
            this.selectedLeftItem = leftItem;
            const { secondRow } = this.pickersData;
            const centerPickerList = [];
            for (let i = 0; i < secondRow.length; i++) {
                const rightItem = secondRow[i];
                if (leftItem.id === rightItem.parentId) {
                    centerPickerList.push(rightItem);
                }
            }
            this.centerPickerList = centerPickerList;
            this.centerPickerRef.updateDataSource();
        };
        this.handelCenterSelected = (centerItem = {}, isFirstChoose) => {
            this.selectedCenterItem = centerItem;
            const { trebleRow } = this.pickersData;
            const rightPickerList = [];
            for (let i = 0; i < trebleRow.length; i++) {
                const rightItem = trebleRow[i];
                if (centerItem.id === rightItem.parentId) {
                    rightPickerList.push(rightItem);
                }
            }
            this.rightPickerList = rightPickerList;
            this.rightPickerRef.updateDataSource().then(() => {
                if (this.props.onChange && (this.props.selectImmediate || !isFirstChoose)) {
                    this.props.onChange({ firstItem: this.selectedLeftItem, secondItem: this.selectedCenterItem, trebleItem: this.selectedRightItem });
                }
            });
        };
        this.handelRightSelected = (rightItem = {}, isFirstChoose) => {
            if (this.state.spinner === true) {
                this.setState({ spinner: false });
            }
            this.selectedRightItem = rightItem;
            if (this.props.onChange && !isFirstChoose) {
                this.props.onChange({ firstItem: this.selectedLeftItem, secondItem: this.selectedCenterItem, trebleItem: this.selectedRightItem });
            }
        };
        this.handleColumnsRunning = (status) => {
            if (status === true && this.state.running === true) {
                return;
            }
            this.setState({ running: status });
        };
        this.handleCancel = () => {
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        };
        this.handleConfirm = () => {
            if (this.state.running === false && !this.state.spinner && this.props.onConfirm) {
                this.props.onConfirm({ firstItem: this.selectedLeftItem, secondItem: this.selectedCenterItem, trebleItem: this.selectedRightItem });
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
        const { isOpen, mask, className, onAfterClosed, onRequestClose, onAfterOpen, title, cancelButtonText, confirmButtonText, cacheModal, pickerBarHeight, visibleItemCount, itemHeight } = this.props;
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
        const leftPickerProps = {
            visibleItemCount,
            itemHeight,
            onSelected: this.handelLeftSelected,
            updateDataSource: this.handleUpdateLeftDataSource,
            onRunning: this.handleColumnsRunning,
            className: 'left-picker'
        };
        const centerPickerProps = {
            visibleItemCount,
            itemHeight,
            onSelected: this.handelCenterSelected,
            updateDataSource: this.handleUpdateCenterDataSource,
            onRunning: this.handleColumnsRunning,
            className: 'center-picker'
        };
        const rightPickerProps = {
            visibleItemCount,
            itemHeight,
            onSelected: this.handelRightSelected,
            updateDataSource: this.handleUpdateRightDataSource,
            onRunning: this.handleColumnsRunning,
            className: 'right-picker'
        };
        const spinnerStyle = {
            top: viewport.px2rem(pickerBarHeight)
        };
        return (<Popup {...popupProps}>
        <PickerBar className={this.buildClassName('bar')} {...PickerBarProps}/>
        <div className="picker-content">
          <PickerColumn {...leftPickerProps} ref={this.setLeftPickerRef}></PickerColumn>
          <PickerColumn {...centerPickerProps} ref={this.setCenterPickerRef}></PickerColumn>
          <PickerColumn {...rightPickerProps} ref={this.setRightPickerRef}></PickerColumn>
        </div>
        <Spinner style={spinnerStyle} isOpen={this.state.spinner}/>
      </Popup>);
    }
}
PickerTreble.defaultProps = {
    isOpen: true,
    mask: true,
    visibleItemCount: 5,
    itemHeight: 88,
    pickerBarHeight: 80,
    selectImmediate: false,
    updateDataSource: () => Promise.resolve(),
};
