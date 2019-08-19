"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorToSerializable_1 = require("../utils/errorToSerializable");
function now() {
    return process.hrtime();
}
function msSince(start) {
    const diff = process.hrtime(start);
    return (diff[0] * 1e3) + (diff[1] / 1e6);
}
const noHTMLError = new TypeError('HTML was not returned to SSR render server, this is most likely an error within your application. Check your logs for any uncaught errors and/or rejections.');
noHTMLError.stack = undefined;
class BatchRenderService {
    constructor(request, response, config) {
        // request.body example:
        // { Home: { name: 'home', data: { url: '/home' }, metadata: { desc: 'it is desc' } }, Detail: { name: 'detail', data: { url: '/detail' },
        // metadata: { title: 'it is title' } } }
        const jobs = request.body;
        const jobTokens = Object.keys(jobs);
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
        // An object that will be passed into the context for batch-level(request-level) methods,
        // but not for job-level methods.
        this.batchContext = {
            tokens: jobTokens,
            jobs
        };
        // A map of token => JobContext, where JobContext is an object of data that is per-job,
        // and will be passed into plugins and used for the final result.
        this.jobContexts = jobTokens.reduce((obj, token) => {
            const { name, data, metadata } = jobs[token];
            obj[token] = {
                name,
                token,
                props: data,
                metadata,
                statusCode: 200,
                duration: null,
                html: null,
                css: null,
                state: null,
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
    getJobContext(plugin, jobToken) {
        return {
            ...this.baseContext,
            ...this.jobContexts[jobToken],
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
        return token ? this.getJobContext(plugin, token) : this.getBatchContext(plugin);
    }
    notFound(name) {
        const error = new ReferenceError(`Component "${name}" not registered`);
        const stack = (error.stack || '').split('\n');
        error.stack = [stack[0]]
            .concat(`    at YOUR-COMPONENT-DID-NOT-REGISTER_${name}:1:1`, stack.slice(1))
            .join('\n');
        return error;
    }
    recordError(error, jobToken) {
        if (jobToken && this.jobContexts[jobToken]) {
            const jobContext = this.jobContexts[jobToken];
            jobContext.statusCode = jobContext.statusCode === 200 ? 500 : jobContext.statusCode;
            jobContext.error = error;
        }
        else {
            this.error = error;
            this.statusCode = 500;
        }
    }
    render(token) {
        const start = now();
        const jobContext = this.jobContexts[token];
        console.log('jobContext: ', jobContext);
        const { name } = jobContext;
        const { getComponent } = this.config;
        const component = getComponent(name, jobContext).default;
        const result = typeof component === 'function' ? component : component[name];
        // render html using render function returned from getComponent
        return Promise.resolve(result)
            .then((renderFn) => {
            if (!renderFn || typeof renderFn !== 'function') {
                jobContext.statusCode = 404;
                return Promise.reject(this.notFound(name));
            }
            return renderFn(jobContext.props);
        })
            .then((renderToString) => {
            return Promise.resolve(renderToString(jobContext.props));
        })
            .then(({ html, css, state }) => {
            if (!html) {
                return Promise.reject(noHTMLError);
            }
            console.log('rendered style: ', css);
            console.log('state: ', state);
            jobContext.html = html;
            jobContext.css = css;
            jobContext.state = state;
            jobContext.duration = msSince(start);
            return Promise.resolve(jobContext);
        })
            .catch((err) => {
            jobContext.duration = msSince(start);
            return Promise.reject(err);
        });
    }
    getResults() {
        return {
            success: this.error === null,
            error: this.error,
            results: Object.keys(this.jobContexts).reduce((result, jobToken) => {
                const context = this.jobContexts[jobToken];
                result[jobToken] = {
                    name: context.name,
                    html: context.html,
                    css: context.css,
                    state: context.state,
                    meta: context.returnMeta,
                    duration: context.duration,
                    statusCode: context.statusCode,
                    success: context.html !== null,
                    error: context.error ? errorToSerializable_1.errorToSerializable(context.error) : null
                };
                return result;
            }, {})
        };
    }
}
exports.default = BatchRenderService;
