import React from 'react';
import { uniqueFactory } from '../../utils/unique';
const componentUid = uniqueFactory('uuid_component_', 1);
export const uuidWrapper = (WrapperComponent) => {
    var _a;
    return _a = class ComponentWrapper extends React.Component {
            render() {
                return (<WrapperComponent {...this.props}/>);
            }
        },
        _a.uuid = componentUid(),
        _a;
};
