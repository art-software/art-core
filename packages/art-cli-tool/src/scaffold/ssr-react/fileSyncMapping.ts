import { SyncMapping } from '../typing';
import ArtScaffold from '../ArtScaffold';
import fs from 'fs-extra';
import { join } from 'path';
import { firstWordUpperCase } from '../../helpers/firstWordUpperCase';

export const ignoreMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  return [
    {
      name: '.artignore',
      rename: '.gitignore'
    }
  ];
};

export const serverServiceRenderMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
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

export const controllerServiceWebMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  const { moduleName } = scaffoldInstance;
  return [
    {
      name: `./src/controllers/Main/MainController.ts`,
      rename: `./src/controllers/${moduleName}/${firstWordUpperCase(moduleName)}Controller.ts`,
      replace: [
        { from: 'Main', to: firstWordUpperCase(moduleName) },
        { from: 'main', to:  moduleName}
      ]
    }
  ];
};

export const servicesServiceWebMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
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

export const srcServiceWebMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
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
  const { moduleName } = scaffoldInstance;
  const commonFolderPath = join(process.cwd(), './client/common');
  let commonFolderExist = false;
  try {
    commonFolderExist = fs.pathExistsSync(commonFolderPath);
  } catch (e) {
    console.log(e);
    throw new Error('fs-extra pathExistsSync error');
  }

  const clientList = [
    {
      name: `./client/main/ssr.tsx`,
      rename: `./client/${moduleName}/ssr.tsx`,
      replace: [
        { from: 'Main', to: firstWordUpperCase(moduleName) },
        { from: 'main', to:  moduleName}
      ]
    },
    {
      name: `./client/main/routes.tsx`,
      rename: `./client/${moduleName}/routes.tsx`
    },
    {
      name: `./client/main/index.tsx`,
      rename: `./client/${moduleName}/index.tsx`,
      replace: [
        { from: 'Main', to: firstWordUpperCase(moduleName) },
        { from: 'main', to:  moduleName}
      ]
    },
    {
      name: `./client/main/views/home.tsx`,
      rename: `./client/${moduleName}/views/home.tsx`,
      replace: [
        { from: 'Main', to: firstWordUpperCase(moduleName) },
        { from: 'main', to:  moduleName}
      ]
    },
    {
      name: `./client/main/views/Product.tsx`,
      rename: `./client/${moduleName}/views/Product.tsx`
    },
    {
      name: `./client/main/styles/`,
      rename: `./client/${moduleName}/styles/`
    },
    {
      name: `./client/main/store/store.ts`,
      rename: `./client/${moduleName}/store/store.ts`,
      replace: [
        { from: 'Main', to: firstWordUpperCase(moduleName) },
        { from: 'main', to:  moduleName}
      ]
    },

    {
      name: `./client/main/services/MainService.ts`,
      rename: `./client/${moduleName}/services/${firstWordUpperCase(moduleName)}Service.ts`,
      replace: [
        { from: 'Main', to: firstWordUpperCase(moduleName) },
        { from: 'main', to:  moduleName}
      ]
    },

    {
      name: `./client/main/services/interfaces/IMainService.ts`,
      rename: `./client/${moduleName}/services/interfaces/I${firstWordUpperCase(moduleName)}Service.ts`,
      replace: [
        { from: 'Main', to: firstWordUpperCase(moduleName) },
        { from: 'main', to:  moduleName}
      ]
    },

    {
      name: `./client/main/reducer/`,
      rename: `./client/${moduleName}/reducer/`
    },

    {
      name: `./client/main/assets/`,
      rename: `./client/${moduleName}/assets/`
    },
  ];

  return commonFolderExist ?
    clientList :
    [
      ...clientList,
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