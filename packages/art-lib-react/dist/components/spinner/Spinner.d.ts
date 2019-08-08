/// <reference types="react" />
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { ISpinnerProps } from './propTypes';
import './styles';
export default class Spinner extends CoreComponent<ISpinnerProps, any> {
    static defaultProps: {
        isOpen: boolean;
        circleColor: string;
    };
    private buildClassName;
    render(): false | JSX.Element;
}
