"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const module_1 = __importDefault(require("module"));
const path_1 = __importDefault(require("path"));
const has_1 = __importDefault(require("has"));
const vm_1 = require("vm");
// @ts-ignore
const NativeModules = process.binding('natives');
// This means that you won't be able to affect VM extensions by mutating require.extensions
// this is cool since we can now have different extensions for VM than for where your program is
// running.
// If you want to add an extension then you can use addExtension defined and exported below.
const moduleExtensions = { ...module_1.default._extensions };
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
    return has_1.default(NativeModules, id);
}
class Module {
    constructor(id, parent) {
        const cache = parent ? parent.cache : null;
        this.id = id;
        this.exports = {};
        this.cache = cache || {};
        this.parent = parent;
        this.filename = null;
        this.loaded = false;
        this.context = parent ? parent.context : createContext();
    }
    load(filename) {
        assert_1.ok(!this.loaded);
        this.filename = filename;
        this.paths = module_1.default._nodeModulePaths(path_1.default.dirname(filename));
    }
    run(filename) {
        const ext = path_1.default.extname(filename);
        const extension = moduleExtensions[ext] ? ext : '.js';
        moduleExtensions[extension](this, filename);
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
        require.resolve = (request) => {
            return module_1.default._resolveFilename(request, this);
        };
        require.main = process.mainModule;
        require.extensions = moduleExtensions;
        require.cache = this.cache;
        const dirname = path_1.default.dirname(filename);
        // create wrapper function
        const wrapper = module_1.default.wrap(content);
        const options = {
            filename,
            displayErrors: true,
        };
        const compiledWrapper = vm_1.runInNewContext(wrapper, this.context, options);
        return compiledWrapper.call(this.exports, this.exports, require, this, filename, dirname);
    }
    static load(id, filename) {
        const module = new Module(id);
        module.load(filename);
        module.run(filename);
        return module;
    }
    static loadFile(file, parent) {
        const fileName = module_1.default._resolveFilename(file, parent);
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
        }
        finally {
            if (hadException) {
                delete module.cache[fileName];
            }
        }
        return module.exports;
    }
    static addExtension(ext, f) {
        moduleExtensions[ext] = f;
    }
}
exports.default = Module;
