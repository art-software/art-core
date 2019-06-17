/// <reference types="react" />
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { IQuickLink } from './propsType';
export default class Quicklink extends CoreComponent<IQuickLink, any> {
    static defaultProps: {
        prfetchHref: never[];
        origins: boolean;
        observerSelector: string;
    };
    componentDidMount(): void;
    render(): JSX.Element;
}
