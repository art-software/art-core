import { sep } from 'path';

export const excludeNodeModulesExcept = (...modules: string[]): (path: string) => boolean => {
  const pathSep = sep === '\\' ? '\\\\' : sep;
  const moduleRegExps = modules.map((moduleName) => {
    return new RegExp('node_modules' + pathSep + moduleName);
  });

  return function (modulePath: string) {
    if (/node_modules/.test(modulePath)) {
      for (let i = 0; i < moduleRegExps.length; i++) {
        if (moduleRegExps[i].test(modulePath)) {
          return false;
        }
      }
      return true;
    }
    return false;
  };
};