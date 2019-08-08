/// <reference types="react" />
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { ITrebleColums, ISelectedTreble } from '../picker/propTypes';
import { IAreaProps } from './propTypes';
export default class Area extends CoreComponent<IAreaProps, any> {
    static defaultProps: {
        mask: boolean;
        isOpen: boolean;
    };
    state: {
        cacheModel: boolean;
    };
    componentDidUpdate(nextProps: any): void;
    componentDidMount(): void;
    private getColumnsData;
    updateDataSource: () => Promise<ITrebleColums>;
    onChange: (items: ISelectedTreble) => void;
    onConfirm: (items: ISelectedTreble) => void;
    render(): JSX.Element;
}
