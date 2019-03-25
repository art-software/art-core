import { SyncMapping } from '../typing';
import ArtScaffold from '../ArtScaffold';

// TODO not working now
export const configMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  return [
    {
      name: '.babelrc'
    },
    {
      name: '.eslintrc.json'
    },
    {
      name: '.artignore',
      rename: '.gitignore'
    },
    {
      name: 'tsconfig.json'
    },
    {
      name: 'tsconfig-mock.json'
    },
    {
      name: 'tslint.json'
    },
    {
      name: 'package.json',
      replace: [
        { from: 'art-app', to: scaffoldInstance.projectName },
        { from: 'application based on art frontend development framework', to: scaffoldInstance.projectDescription }
      ]
    },
    {
      name: 'README.md'
    }
  ];
};

export const clientMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  const scaffoldType = scaffoldInstance.scaffoldChoosen.replace('react/', '');

  return [
    {
      name: `./client/${scaffoldType}/`,
      rename: `./client/${scaffoldInstance.moduleName}/`
    }
  ];
};

export const serverMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {

  return [
    {
      name: `./mock/IndexController.ts`,
      rename: `./mock/${scaffoldInstance.moduleName}/IndexController.ts`,
      replace: [
        { from: /\/mock_request/g, to: `/${scaffoldInstance.moduleName}` }
      ]
    }
  ];
};

export const artConfigMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  return [
    {
      name: `art.config.js`,
      replace: [
        { from: /art\/virtual\/path/g, to: scaffoldInstance.projectVirtualPath },
        { from: /\/h5/g, to: `/${scaffoldInstance.moduleName}` }
      ]
    }
  ];
};