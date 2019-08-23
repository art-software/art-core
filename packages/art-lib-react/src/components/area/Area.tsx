import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { areaData } from './assets/area-data';
import { ITrebleColums, IColumnValue, ISelectedTreble } from '../picker/propTypes';
import PickerTreble from '../picker/PickerTreble';
import { IAreaProps, IAreaSeleted } from './propTypes';

export default class Area extends CoreComponent<IAreaProps, any> {

  public static defaultProps = {
    mask: true,
    isOpen: true
  };

  public state = {
    cacheModel: false
  };

  public componentDidUpdate(nextProps) {
    if (nextProps.isOpen && !this.state.cacheModel) {
      this.setState({
        cacheModel: true
      });
    }
  }

  public componentDidMount() {
    if (this.props.isOpen) {
      this.setState({
        cacheModel: true
      });
    }
  }

  private getColumnsData: () => ITrebleColums = () => {
    const { provinceList, cityList, countyList } = areaData;
    const defaultChooseId = String(this.props.defaultChooseId) || '';
    const provinceDefaultChooseId = defaultChooseId.slice(0, 2);
    const cityDefaultChooseId = defaultChooseId.slice(0, 4);
    const countyDefaultChooseId = defaultChooseId.slice(0, 6);
    const columnsData: ITrebleColums = {
      firstRow: [],
      secondRow: [],
      trebleRow: [],
      firstSelectId: provinceDefaultChooseId,
      secondSelectId: cityDefaultChooseId,
      trebleSelectId: countyDefaultChooseId
    };
    for (const provinceKey in provinceList) {
      const province = provinceList[provinceKey];
      const columnValue: IColumnValue = {
        id: provinceKey.slice(0, 2),
        value: province
      };
      columnsData.firstRow.push(columnValue);
    }
    for (const cityKey in cityList) {
      const city = cityList[cityKey];
      const columnValue: IColumnValue = {
        id: cityKey.slice(0, 4),
        value: city,
        parentId: cityKey.slice(0, 2),
      };
      columnsData.secondRow.push(columnValue);
    }
    for (const countyKey in countyList) {
      const county = countyList[countyKey];
      const columnValue: IColumnValue = {
        id: countyKey.slice(0, 6),
        value: county,
        parentId: countyKey.slice(0, 4)
      };
      columnsData.trebleRow.push(columnValue);
    }
    return columnsData;
  }

  public updateDataSource: () => Promise<ITrebleColums> = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getColumnsData());
      }, this.props.loadTime || 0);
    });
  }

  public onChange = (items: ISelectedTreble) => {
    if (this.props.onChange) {
      const { firstItem, secondItem, trebleItem } = items;
      const areaItems: IAreaSeleted = {
        province: firstItem,
        city: secondItem,
        county: trebleItem
      };
      this.props.onChange(areaItems);
    }
  }

  public onConfirm = (items: ISelectedTreble) => {
    if (this.props.onConfirm) {
      const { firstItem, secondItem, trebleItem } = items;
      const areaItems: IAreaSeleted = {
        province: firstItem,
        city: secondItem,
        county: trebleItem
      };
      this.props.onConfirm(areaItems);
    }
  }

  public render() {
    return (
      <PickerTreble
        {...this.props}
        selectImmediate={true}
        updateDataSource={this.updateDataSource}
        onChange={this.onChange}
        onConfirm={this.onConfirm}
        cacheModal={this.state.cacheModel || this.props.cacheModal} />
    );
  }
}