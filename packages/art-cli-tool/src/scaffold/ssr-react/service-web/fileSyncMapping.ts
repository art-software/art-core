import { SyncMapping } from '../../typing';
import ArtScaffold from '../../ArtScaffold';
import { firstWordUpperCase } from '../../../helpers/firstWordUpperCase';

export const controllerMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  const { moduleName, projectVirtualPath } = scaffoldInstance;
  return [
    {
      name: `./src/controllers/Main/MainController.ts`,
      rename: `./src/controllers/${moduleName}/${firstWordUpperCase(moduleName)}Controller.ts`,
      replace: [
        { from: 'Main', to: firstWordUpperCase(moduleName) },
        { from: 'main', to:  moduleName},
        { from: 'demo/ssr', to:  projectVirtualPath }
      ]
    }
  ];
};

export const servicesMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  const { moduleName } = scaffoldInstance;
  return [
    {
      name: `./src/services/Main/MainService.ts`,
      rename: `./src/services/${moduleName}/${firstWordUpperCase(moduleName)}Service.ts`,
      replace: [
        { from: 'Main', to: firstWordUpperCase(moduleName) },
        { from: 'main', to:  moduleName}
      ]
    }
  ];
};

export const srcMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  return [
    {
      name: `./src/index.ts`
    },
    {
      name: `./src/server.ts`
    },
    {
      name: `./src/services/aggregator.ts`
    },
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
    },
    {
      name: '.artignore',
      rename: '.gitignore'
    }
  ];
};