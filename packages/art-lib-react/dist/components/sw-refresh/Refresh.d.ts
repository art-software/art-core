/// <reference types="react" />
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import './style.less';
export default class Refresh extends CoreComponent<any, any> {
    constructor(props: any, context: any);
    refresh: () => void;
    render(): JSX.Element;
}
