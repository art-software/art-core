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
  return [
    {
      name: 'server.ts'
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

// const firstUpperCase = ([first, ...rest]) => first.toUpperCase() + rest.join('');

export const controllerServiceWebMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  return [
    {
      name: `./src/controllers/MainController.ts`,
      // rename: `./src/controllers/${scaffoldInstance.moduleName}Controller.ts/`
      rename: `./src/controllers/${scaffoldInstance.moduleName}/MainController.ts`
    }
  ];
};

export const databaseServiceWebMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  return [
    {
      name: `./src/database/redis.ts`,
      // rename: `./src/controllers/${scaffoldInstance.moduleName}Controller.ts/`
      rename: `./src/database/redis.ts`
    }
  ];
};

export const servicesServiceWebMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  return [
    {
      name: `./src/services/aggregator.ts`,
      rename: `./src/services/aggregator.ts`
    },
    {
      name: `./src/services/MainService.ts`,
      rename: `./src/services/${scaffoldInstance.moduleName}/MainService.ts`
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
        name: `./client/ssr/`,
        rename: `./client/${scaffoldInstance.moduleName}/`
      }
    ] :
    [
      {
        name: `./client/ssr/`,
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