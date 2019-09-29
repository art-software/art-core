import { SyncMapping } from '../../typing';
import ArtScaffold from '../../ArtScaffold';
import { firstWordUpperCase } from '../../../helpers/firstWordUpperCase';

export const serverMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  const { moduleName, projectVirtualPath } = scaffoldInstance;
  return [
    {
      name: 'server.ts',
      replace: [
        { from: 'Main', to: firstWordUpperCase(moduleName) },
        { from: 'main', to:  moduleName },
        { from: 'demo/ssr', to:  projectVirtualPath }
      ]
    }
  ];
};

export const configMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  return [
    {
      name: 'tsconfig.json'
    },
    {
      name: 'tslint.json'
    },
    {
      name: 'package.json'
    }
  ];
};