import Module from './Module';

function load(file?, parent?) {
  if (!file) {
    return parent;
  }

  const module = new Module(file, parent);
  module.load(file);
  module.run(file);
  return module;
}

function resolve(require: any, name) {
  try {
    return require.resolve(name);
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      return null;
    }
    throw e;
  }
}

const loadModules = (require: any, files: string[]) => {
  return () => {
    return files.reduce((module, file) => {
      return load(resolve(require, file), module);
    }, null);
  };
};

export default loadModules;