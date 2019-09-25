import { SyncMapping } from '../typing';
import ArtScaffold from '../ArtScaffold';
import fs from 'fs-extra';
import { join } from 'path';

export const ignoreMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  return [
    {
      name: '.artignore',
      rename: '.gitignore'
    }
  ];
};

export const serverServiceRenderMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  const { moduleName } = scaffoldInstance;
  return [
    {
      name: 'server.ts',
      replace: [
        { from: 'Main', to: getFirstCodeUpper(moduleName) },
        { from: 'main', to:  moduleName}
      ]
    }
  ];
};

export const configServiceRenderMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
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

export const configServiceWebMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
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
    ...this.ignoreMapping()
  ];
};

// TODO replace
export const controllerServiceWebMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  const { moduleName } = scaffoldInstance;
  return [
    {
      name: `./src/controllers/Main/MainController.ts`,
      rename: `./src/controllers/${moduleName}/${getFirstCodeUpper(moduleName)}Controller.ts`,
      replace: [
        { from: 'Main', to: getFirstCodeUpper(moduleName) },
        { from: 'main', to:  moduleName}
      ]
    }
  ];
};

export const servicesServiceWebMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  const { moduleName } = scaffoldInstance;
  return [
    {
      name: `./src/services/aggregator.ts`,
      rename: `./src/services/aggregator.ts`
    },
    {
      name: `./src/services/Main/MainService.ts`,
      rename: `./src/services/${moduleName}/${getFirstCodeUpper(moduleName)}Service.ts`,
      replace: [
        { from: 'Main', to: getFirstCodeUpper(moduleName) },
        { from: 'main', to:  moduleName}
      ]
    }
  ];
};

export const srcServiceWebMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  return [
    {
      name: `./src/index.ts`
    },
    {
      name: `./src/server.ts`
    }
  ];
};

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
        { from: 'art-ssr-client', to: scaffoldInstance.projectName },
        { from: 'art ssr client', to: scaffoldInstance.projectDescription }
      ]
    },
    {
      name: 'README.md'
    }
  ];
};

export const clientMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  // const scaffoldType = scaffoldInstance.scaffoldChoosen.replace('react/', '');
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
        name: `./client/main/`,
        rename: `./client/${scaffoldInstance.moduleName}/`
      }
    ] :
    [
      {
        name: `./client/main/`,
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
        { from: /\/main/g, to: `/${scaffoldInstance.moduleName}` }
      ]
    }
  ];
};

const getFirstCodeUpper = (sourceString: string = '') => {
  if (sourceString) {
    const arr = sourceString.split('');
    const firstUpper = arr[0].toLocaleUpperCase();
    arr.splice(0, 1, firstUpper);
    return arr.join('');
  } else {
    return '';
  }
};