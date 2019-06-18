import { SyncMapping } from '../typing';
import ArtScaffold from '../ArtScaffold';
import fs from 'fs-extra';
import { join } from 'path';

export const configMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  return [
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
  const commonFolderPath = join(process.cwd(), './client/common');
  let commonFolderExist = false;
  try {
    commonFolderExist = fs.pathExistsSync(commonFolderPath);
  } catch (e) {
    console.log(e);
    throw new Error('fs-extra pathExistsSync error');
  }

  return commonFolderExist ?
    [
      {
        name: `./client/${scaffoldType}/`,
        rename: `./client/${scaffoldInstance.moduleName}/`
      }
    ] :
    [
      {
        name: `./client/${scaffoldType}/`,
        rename: `./client/${scaffoldInstance.moduleName}/`
      },
      {
        name: `./client/common/`
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