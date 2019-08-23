"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
const WebApiServer_1 = __importDefault(require("art-lib-common/dist/core-server/WebApiServer"));
const Lifecycle_1 = require("./enums/Lifecycle");
function reduce(obj, func, init) {
    return Object.keys(obj)
        .reduce((a, b) => {
        return func(a, b);
    }, init);
}
function encode(obj) {
    return JSON.stringify(obj).replace(/-->/g, '--&gt;');
}
class AggregatorWebApiServer extends WebApiServer_1.default {
    constructor(config) {
        super(config);
    }
}
class Aggregator {
    constructor(options) {
        const { url, plugins, config } = options;
        this.url = url;
        this.plugins = plugins || [];
        this.config = Object.assign({
            timeout: 1000,
            headers: {
                'Content-Type': 'application/json',
            }
        }, config);
        this.aggregatorWebApiServer = new AggregatorWebApiServer(this.config);
    }
    addPlugin(plugin) {
        this.plugins.push(plugin);
    }
    pluginReduce(eventName, func, initial) {
        return this.plugins.reduce((res, plugin) => {
            if (plugin[eventName]) {
                return func(plugin[eventName], res);
            }
            return res;
        }, initial);
    }
    createJobs(jobs) {
        return reduce(jobs, (obj, name) => {
            let data = jobs[name];
            try {
                data = this.pluginReduce(Lifecycle_1.Lifecycle.getViewData, (plugin, newData) => {
                    return plugin(name, newData);
                }, jobs[name]);
            }
            catch (err) {
                this.pluginReduce(Lifecycle_1.Lifecycle.onError, (plugin) => {
                    return plugin(err);
                });
            }
            obj[name] = { name, data };
            return obj;
        }, {});
    }
    prepareRequest(jobs) {
        return Promise.resolve().then(() => {
            const jobsHash = this.pluginReduce(Lifecycle_1.Lifecycle.prepareRequest, (plugin, next) => plugin(next, jobs), jobs);
            const shouldSendRequest = this.pluginReduce(Lifecycle_1.Lifecycle.shouldSendRequest, (plugin, next) => {
                return next && plugin(jobsHash);
            }, true);
            return {
                shouldSendRequest,
                jobsHash
            };
        });
    }
    renderHTML(viewName, data) {
        const uuid = v4_1.default();
        return `
      <div data-ssr-key="${viewName}" data-ssr-id="${uuid}"></div>
      <script type="application/json" data-ssr-key="${viewName}" data-ssr-id="${uuid}"><!--${encode(data)}--></script>
    `;
    }
    fallback(error, jobs) {
        return {
            error,
            results: reduce(jobs, (obj, key) => {
                obj[key] = {
                    error: null,
                    html: this.renderHTML(key, jobs[key].data),
                    job: jobs[key]
                };
            }, {})
        };
    }
    toHTML(views) {
        return reduce(views, (res, name) => res + views[name].html, '');
    }
    toCss(views) {
        return reduce(views, (res, name) => res + views[name].css, '');
    }
    toState(views) {
        return reduce(views, (res, name) => res + views[name].state, '');
    }
    render(data) {
        const jobs = this.createJobs(data);
        return this.prepareRequest(jobs)
            .then((item) => {
            if (!item.shouldSendRequest) {
                return this.fallback(null, item.jobsHash);
            }
            this.pluginReduce(Lifecycle_1.Lifecycle.willSendRequest, (plugin) => plugin(item.jobsHash));
            return this.aggregatorWebApiServer.requestPost(this.url, {
                data: item.jobsHash
            }).then((res) => {
                const { results } = res.data;
                Object.keys(results).forEach((key) => {
                    const body = results[key];
                    body.job = item.jobsHash[key];
                    body.html = body.error ? this.renderHTML(key, data[key]) : body.html;
                });
                return res.data;
            })
                // if there is an error retrieving the result set or converting it then lets just fallback
                // to client rendering for all the jobs.
                .catch((err) => this.fallback(err, jobs))
                // Run our afterResponse plugins and send back our response.
                .then((res) => {
                const { results } = res;
                try {
                    if (res.error) {
                        return this.pluginReduce(Lifecycle_1.Lifecycle.onError, (plugin) => {
                            return plugin(res.error, results);
                        });
                    }
                    Object.values(results).forEach((job) => {
                        if (job.error) {
                            this.pluginReduce(Lifecycle_1.Lifecycle.onError, (plugin) => plugin(job.error, job));
                        }
                    });
                    const successfulJobs = reduce(res.results, (success, key) => {
                        return Object.assign(success, {
                            [key]: res.results[key].job,
                        });
                    }, {});
                    this.pluginReduce(Lifecycle_1.Lifecycle.onSuccess, (plugin) => plugin(successfulJobs));
                    return this.plugins.length ?
                        this.pluginReduce(Lifecycle_1.Lifecycle.afterResponse, (plugin, next) => plugin(next, results), results) :
                        {
                            html: this.toHTML(results),
                            css: this.toCss(results),
                            state: this.toState(results)
                        };
                }
                catch (err) {
                    this.pluginReduce(Lifecycle_1.Lifecycle.onError, (plugin) => plugin(err, results));
                    return {
                        html: this.toHTML(results),
                        css: this.toCss(results),
                        state: this.toState(results)
                    };
                }
            });
        });
    }
}
exports.default = Aggregator;
