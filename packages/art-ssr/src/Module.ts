import { ok } from 'assert';
import NativeModule from 'module';
import path from 'path';
import has from 'has';
import { runInNewContext } from 'vm';

// @ts-ignore
const NativeModules = process.binding('natives');

// This means that you won't be able to affect VM extensions by mutating require.extensions
// this is cool since we can now have different extensions for VM than for where your program is
// running.
// If you want to add an extension then you can use addExtension defined and exported below.
const moduleExtensions = { ...(NativeModule as any)._extensions };

// Creates a sandbox so we don't share globals across different runs.
function createContext() {
  const sandbox = {
    Buffer,
    clearImmediate,
    clearInterval,
    clearTimeout,
    setImmediate,
    setInterval,
    setTimeout,
    console,
    process
  };

  // @ts-ignore
  sandbox.global = sandbox;
  return sandbox;
}

function isNativeModule(id) {
  return has(NativeModules, id);
}

export default class Module {
  constructor(id, parent?) {
    const cache = parent ? parent.cache : null;
    this.id = id;
    this.exports = {};
    this.cache = cache || {};
    this.parent = parent;
    this.filename = null;
    this.loaded = false;
    this.context = parent ? parent.context : createContext();
  }

  public id: string;
  public exports: any;
  public cache: any;
  public parent: any;
  public filename: string | null;
  public loaded: boolean;
  public context: any;
  public paths: any;

  public load(filename: string) {
    ok(!this.loaded);
    this.filename = filename;
    this.paths = (NativeModule as any)._nodeModulePaths(path.dirname(filename));
  }

  public run(filename: string) {
    const ext = path.extname(filename);
    const extension = moduleExtensions[ext] ? ext : '.js';
    moduleExtensions[extension](this, filename);
    this.loaded = true;
  }

  public require(filePath: string) {
    ok(typeof filePath === 'string', 'path must be a string');
    return Module.loadFile(filePath, this);
  }

  public _compile(content, filename) {
    const self = this;

    function require(filePath) {
      return self.require(filePath);
    }
    (require as any).resolve = (request) => {
      return (NativeModule as any)._resolveFilename(request, this);
    };
    (require as any).main = process.mainModule;
    (require as any).extensions = moduleExtensions;
    (require as any).cache = this.cache;

    const dirname = path.dirname(filename);

    // create wrapper function
    const wrapper = NativeModule.wrap(content);

    const options = {
      filename,
      displayErrors: true,
    };

    const compiledWrapper = runInNewContext(wrapper, this.context, options);
    return compiledWrapper.call(this.exports, this.exports, require, this, filename, dirname);
  }

  public static load(id, filename) {
    const module = new Module(id);
    module.load(filename);
    module.run(filename);
    return module;
  }

  public static loadFile(file, parent) {
    const fileName = (NativeModule as any)._resolveFilename(file, parent);

    if (parent) {
      const cacheModule = parent.cache[fileName];
      if (cacheModule) {
        return cacheModule.exports;
      }
    }

    if (isNativeModule(fileName)) {
      return require(fileName);
    }

    const module = new Module(fileName, parent);

    module.cache[fileName] = module;

    let hadException = true;

    try {
      module.load(fileName);
      module.run(fileName);
      hadException = false;
    } finally {
      if (hadException) {
        delete module.cache[fileName];
      }
    }

    return module.exports;
  }

  public static addExtension(ext, f) {
    moduleExtensions[ext] = f;
  }
}