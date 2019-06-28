"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorToSerializable_1 = require("../../utils/errorToSerializable");
function now() {
    return process.hrtime();
}
function msSince(start) {
    const diff = process.hrtime(start);
    return (diff[0] * 1e3) + (diff[1] / 1e6);
}
const noHTMLError = new TypeError('HTML was not returned to SSR render server, this is most likely an error within your application. Check your logs for any uncaught errors and/or rejections.');
noHTMLError.stack = undefined;
class BatchManager {
    constructor(request, response, config) {
        const jobs = request.body;
        const tokens = Object.keys(jobs);
        this.config = config;
        this.plugins = config.plugins;
        this.error = null;
        this.statusCode = 200;
        // An object that all of the contexts will inherit from... one per instance.
        this.baseContext = {
            request,
            response,
            batchMeta: {}
        };
        // An object that will be passed into the context for batch-level methods,
        // but not for job-level methods.
        this.batchContext = {
            tokens,
            jobs
        };
        // A map of token => JobContext, where JobContext is an object of data that is per-job,
        // and will be passed into plugins and used for the final result.
        this.jobContexts = tokens.reduce((obj, token) => {
            const { name, data, metadata } = jobs[token];
            obj[token] = {
                name,
                token,
                props: data,
                metadata,
                statusCode: 200,
                duration: null,
                html: null,
                returnMeta: {},
            };
            return obj;
        }, {});
        this.pluginContexts = new Map();
        this.plugins.forEach((plugin) => {
            this.pluginContexts.set(plugin, { data: new Map() });
        });
    }
    /**
     * Returns a context object scoped to a specific plugin and job (based on the plugin and
     * job token passed in).
     */
    getRequestContext(plugin, token) {
        return {
            ...this.baseContext,
            ...this.jobContexts[token],
            ...this.pluginContexts.get(plugin)
        };
    }
    /**
     * Returns a context object scoped to a specific plugin and batch.
     */
    getBatchContext(plugin) {
        return {
            ...this.baseContext,
            ...this.batchContext,
            ...this.pluginContexts.get(plugin),
        };
    }
    contextFor(plugin, token) {
        return token ? this.getRequestContext(plugin, token) : this.getBatchContext(plugin);
    }
    notFound(name) {
        const error = new ReferenceError(`Component "${name}" not registered`);
        const stack = (error.stack || '').split('\n');
        error.stack = [stack[0]]
            .concat(`    at YOUR-COMPONENT-DID-NOT-REGISTER_${name}:1:1`, stack.slice(1))
            .join('\n');
        return error;
    }
    recordError(error, token) {
        if (token && this.jobContexts[token]) {
            const context = this.jobContexts[token];
            context.statusCode = context.statusCode === 200 ? 500 : context.statusCode;
            context.error = error;
        }
        else {
            this.error = error;
            this.statusCode = 500;
        }
    }
    render(token) {
        const start = now();
        const context = this.jobContexts[token];
        const { name } = context;
        const { getComponent } = this.config;
        const component = getComponent(name, context);
        const result = typeof component === 'function' ? component : component.default[name];
        // render html using render function returned from getComponent
        return Promise.resolve(result)
            .then((renderFn) => {
            if (!renderFn || typeof renderFn !== 'function') {
                // component not registered
                context.statusCode = 404;
                return Promise.reject(this.notFound(name));
            }
            return renderFn(context.props);
        })
            .then((html) => {
            if (!html) {
                return Promise.reject(noHTMLError);
            }
            context.html = html;
            context.duration = msSince(start);
            return Promise.resolve(context);
        })
            .catch((err) => {
            context.duration = msSince(start);
            return Promise.reject(err);
        });
    }
    getResults() {
        return {
            success: this.error === null,
            error: this.error,
            results: Object.keys(this.jobContexts).reduce((result, token) => {
                const context = this.jobContexts[token];
                result[token] = {
                    name: context.name,
                    html: context.html,
                    meta: context.returnMeta,
                    duration: context.duration,
                    statusCode: context.statusCode,
                    success: context.html !== null,
                    error: context.error ? errorToSerializable_1.errorToSerializable(context.error) : null,
                };
                return result;
            }, {})
        };
    }
}
exports.default = BatchManager;
