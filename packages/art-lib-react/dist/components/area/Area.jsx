import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { areaData } from './assets/area-data';
import PickerTreble from '../picker/PickerTreble';
export default class Area extends CoreComponent {
    constructor() {
        super(...arguments);
        this.state = {
            cacheModel: false
        };
        this.getColumnsData = () => {
            const { provinceList, cityList, countyList } = areaData;
            const defaultChooseId = String(this.props.defaultChooseId) || '';
            const provinceDefaultChooseId = defaultChooseId.slice(0, 2);
            const cityDefaultChooseId = defaultChooseId.slice(0, 4);
            const countyDefaultChooseId = defaultChooseId.slice(0, 6);
            const columnsData = {
                firstRow: [],
                secondRow: [],
                trebleRow: [],
                firstSelectId: provinceDefaultChooseId,
                secondSelectId: cityDefaultChooseId,
                trebleSelectId: countyDefaultChooseId
            };
            for (const provinceKey in provinceList) {
                const province = provinceList[provinceKey];
                const columnValue = {
                    id: provinceKey.slice(0, 2),
                    value: province
                };
                columnsData.firstRow.push(columnValue);
            }
            for (const cityKey in cityList) {
                const city = cityList[cityKey];
                const columnValue = {
                    id: cityKey.slice(0, 4),
                    value: city,
                    parentId: cityKey.slice(0, 2),
                };
                columnsData.secondRow.push(columnValue);
            }
            for (const countyKey in countyList) {
                const county = countyList[countyKey];
                const columnValue = {
                    id: countyKey.slice(0, 6),
                    value: county,
                    parentId: countyKey.slice(0, 4)
                };
                columnsData.trebleRow.push(columnValue);
            }
            return columnsData;
        };
        this.updateDataSource = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(this.getColumnsData());
                }, this.props.loadTime || 0);
            });
        };
        this.onChange = (items) => {
            if (this.props.onChange) {
                const { firstItem, secondItem, trebleItem } = items;
                const areaItems = {
                    province: firstItem,
                    city: secondItem,
                    county: trebleItem
                };
                this.props.onChange(areaItems);
            }
        };
        this.onConfirm = (items) => {
            if (this.props.onConfirm) {
                const { firstItem, secondItem, trebleItem } = items;
                const areaItems = {
                    province: firstItem,
                    city: secondItem,
                    county: trebleItem
                };
                this.props.onConfirm(areaItems);
            }
        };
    }
    componentDidUpdate(nextProps) {
        if (nextProps.isOpen && !this.state.cacheModel) {
            this.setState({
                cacheModel: true
            });
        }
    }
    componentDidMount() {
        if (this.props.isOpen) {
            this.setState({
                cacheModel: true
            });
        }
    }
    render() {
        return (<PickerTreble {...this.props} selectImmediate={true} updateDataSource={this.updateDataSource} onChange={this.onChange} onConfirm={this.onConfirm} cacheModal={this.state.cacheModel || this.props.cacheModal}/>);
    }
}
Area.defaultProps = {
    mask: true,
    isOpen: true
};
