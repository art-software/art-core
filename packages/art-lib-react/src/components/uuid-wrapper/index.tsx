import React from 'react';
import { uniqueFactory } from 'art-lib-utils/dist/utils/unique';

const componentUid = uniqueFactory('uuid_component_', 1);
export const uuidWrapper = (WrapperComponent): any => {
  return class ComponentWrapper extends React.Component<any, any> {
    public static uuid = componentUid();
    public render() {
      return (
        <WrapperComponent {...this.props} />
      );
    }
  };
};