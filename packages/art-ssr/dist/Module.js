"use strict";
// import { ok } from 'assert';
// import NativeModule from 'module';
// import path from 'path';
// import has from 'has';
// import { runInNewContext } from 'vm';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // Creates a sandbox so we don't share globals across different runs.
// function createContext() {
//   const sandbox = {
//     Buffer,
//     clearImmediate,
//     clearInterval,
//     clearTimeout,
//     setImmediate,
//     setInterval,
//     setTimeout,
//     console,
//     process
//   };
//   // @ts-ignore
//   sandbox.global = sandbox;
//   return sandbox;
// }
// // This means that you won't be able to affect VM extensions by mutating require.extensions
// // this is cool since we can now have different extensions for VM than for where your program is
// // running.
// // If you want to add an extension then you can use addExtension defined and exported below.
// const moduleExtensions = { ...(NativeModule as any)._extensions };
// function isNativeModule(id) {
//   return has(NativeModule, id);
// }
// export default class Module {
//   constructor(id, parent?) {
//     const cache = parent ? parent.cache : null;
//     this.id = id;
//     this.exports = {};
//     this.cache = cache || {};
//     this.parent = parent;
//     this.filename = null;
//     this.loaded = false;
//     this.context = parent ? parent.context : createContext();
//   }
//   public id: string;
//   public exports: any;
//   public cache: any;
//   public parent: any;
//   public filename: string | null;
//   public loaded: boolean;
//   public context: any;
//   public paths: any;
//   public load(filename: string) {
//     ok(!this.loaded);
//     this.filename = filename;
//     this.paths = (NativeModule as any)._nodeModulePaths(path.dirname(filename));
//   }
//   public run(filename: string) {
//     const ext = path.extname(filename);
//     const extension = moduleExtensions[ext] ? ext : '.js';
//     moduleExtensions[extension](this, filename);
//     this.loaded = true;
//   }
//   public require(filePath: string) {
//     ok(typeof filePath === 'string', 'path must be a string');
//     return Module.loadFile(filePath, this);
//   }
//   public _compile(content, filename) {
//     const self = this;
//     function require(filePath) {
//       return self.require(filePath);
//     }
//     (require as any).resolve = (request) => {
//       return (NativeModule as any)._resolveFilename(request, this);
//     };
//     (require as any).main = process.mainModule;
//     (require as any).extensions = moduleExtensions;
//     (require as any).cache = this.cache;
//     const dirname = path.dirname(filename);
//     // create wrapper function
//     const wrapper = NativeModule.wrap(content);
//     const options = {
//       filename,
//       displayErrors: true,
//     };
//     const compiledWrapper = runInNewContext(wrapper, this.context, options);
//     return compiledWrapper.call(this.exports, this.exports, require, this, filename, dirname);
//   }
//   public static load(id, filename) {
//     const module = new Module(id);
//     module.load(filename);
//     module.run(filename);
//     return module;
//   }
//   public static loadFile(file, parent) {
//     const fileName = (NativeModule as any)._resolveFilename(file, parent);
//     if (parent) {
//       const cacheModule = parent.cache[fileName];
//       if (cacheModule) {
//         return cacheModule.exports;
//       }
//     }
//     if (isNativeModule(fileName)) {
//       return require(fileName);
//     }
//     const module = new Module(fileName, parent);
//     module.cache[fileName] = module;
//     let hadException = true;
//     try {
//       module.load(fileName);
//       module.run(fileName);
//       hadException = false;
//     } finally {
//       if (hadException) {
//         delete module.cache[fileName];
//       }
//     }
//     return module.exports;
//   }
//   public static addExtension(ext, f) {
//     moduleExtensions[ext] = f;
//   }
// }
const module_1 = __importDefault(require("module"));
const has_1 = __importDefault(require("has"));
const path_1 = __importDefault(require("path"));
const assert_1 = require("assert");
const vm_1 = require("vm");
// @ts-ignore
const NativeModules = process.binding('natives');
// This means that you won't be able to affect VM extensions by mutating require.extensions
// this is cool since we can now have different extensions for VM than for where your program is
// running.
// If you want to add an extension then you can use addExtension defined and exported below.
// @ts-ignore
const moduleExtensions = { ...module_1.default._extensions };
function isNativeModule(id) {
    return has_1.default(NativeModules, id);
}
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
        process,
    };
    // @ts-ignore
    sandbox.global = sandbox;
    return sandbox;
}
// This class should satisfy the Module interface that NodeJS defines in their native module.js
// implementation.
class Module {
    constructor(id, parent) {
        const cache = parent ? parent.cache : null;
        // @ts-ignore
        this.id = id;
        // @ts-ignore
        this.exports = {};
        // @ts-ignore
        this.cache = cache || {};
        // @ts-ignore
        this.parent = parent;
        // @ts-ignore
        this.filename = null;
        // @ts-ignore
        this.loaded = false;
        // @ts-ignore
        this.context = parent ? parent.context : createContext();
    }
    load(filename) {
        // @ts-ignore
        assert_1.ok(!this.loaded);
        // @ts-ignore
        this.filename = filename;
        // @ts-ignore
        this.paths = module_1.default._nodeModulePaths(path_1.default.dirname(filename));
    }
    run(filename) {
        const ext = path_1.default.extname(filename);
        const extension = moduleExtensions[ext] ? ext : '.js';
        moduleExtensions[extension](this, filename);
        // @ts-ignore
        this.loaded = true;
    }
    require(filePath) {
        assert_1.ok(typeof filePath === 'string', 'path must be a string');
        return Module.loadFile(filePath, this);
    }
    _compile(content, filename) {
        const self = this;
        function require(filePath) {
            return self.require(filePath);
        }
        // @ts-ignore
        require.resolve = (request) => module_1.default._resolveFilename(request, this);
        // @ts-ignore
        require.main = process.mainModule;
        // @ts-ignore
        require.extensions = moduleExtensions;
        // @ts-ignore
        require.cache = this.cache;
        const dirname = path_1.default.dirname(filename);
        // create wrapper function
        const wrapper = module_1.default.wrap(content);
        const options = {
            filename,
            displayErrors: true,
        };
        // @ts-ignore
        const compiledWrapper = vm_1.runInNewContext(wrapper, this.context, options);
        // @ts-ignore
        return compiledWrapper.call(this.exports, this.exports, require, this, filename, dirname);
    }
    static load(id, filename = id) {
        // @ts-ignore
        const module = new Module(id);
        module.load(filename);
        module.run(filename);
        return module;
    }
    static loadFile(file, parent) {
        // @ts-ignore
        const filename = module_1.default._resolveFilename(file, parent);
        if (parent) {
            const cachedModule = parent.cache[filename];
            // @ts-ignore
            if (cachedModule) {
                return cachedModule.exports;
            }
        }
        if (isNativeModule(filename)) {
            // eslint-disable-next-line global-require, import/no-dynamic-require
            return require(filename);
        }
        const module = new Module(filename, parent);
        // @ts-ignore
        module.cache[filename] = module;
        let hadException = true;
        try {
            module.load(filename);
            module.run(filename);
            hadException = false;
        }
        finally {
            if (hadException) {
                // @ts-ignore
                delete module.cache[filename];
            }
        }
        // @ts-ignore
        return module.exports;
    }
    static addExtension(ext, f) {
        moduleExtensions[ext] = f;
    }
}
exports.default = Module;