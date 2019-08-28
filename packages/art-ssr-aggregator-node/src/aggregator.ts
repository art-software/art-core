import uuidV4 from 'uuid/v4';
import WebApiServer from 'art-lib-common/dist/core-server/WebApiServer';
import { AxiosRequestConfig } from 'axios';
import { Lifecycle } from './enums/Lifecycle';

function reduce(obj: any, func: any, init: any) {
  return Object.keys(obj)
    .reduce((a, b) => {
      return func(a, b);
    }, init);
}

function encode(obj) {
  return JSON.stringify(obj).replace(/-->/g, '--&gt;');
}

class AggregatorWebApiServer extends WebApiServer {
  constructor(config: Partial<AxiosRequestConfig>) {
    super(config);
  }
}

interface IOptions {
  url: string;
  plugins?: any[];
  config?: Partial<AxiosRequestConfig>;
}

export default class Aggregator {
  constructor(options: IOptions) {
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

  private url: string;
  private plugins: any[];
  private config: any;
  protected aggregatorWebApiServer: {
    requestPost: (url: string, options: { data: any }) => Promise<any>;
  };

  public addPlugin(plugin: any) {
    this.plugins.push(plugin);
  }

  private pluginReduce(eventName: string, func: any, initial?: any) {
    return this.plugins.reduce((res, plugin) => {
      if (plugin[eventName]) {
        return func(plugin[eventName], res);
      }
      return res;
    }, initial);
  }

  public createJobs(jobs: any) {
    return reduce(jobs, (obj, name) => {
      let data = jobs[name];

      try {
        data = this.pluginReduce(
          Lifecycle.getViewData,
          (plugin, newData) => {
            return plugin(name, newData);
          },
          jobs[name]
        );
      } catch (err) {
        this.pluginReduce(Lifecycle.onError, (plugin) => {
          return plugin(err);
        });
      }

      obj[name] = { name, data };
      return obj;
    }, {});
  }

  public prepareRequest(jobs) {
    return Promise.resolve().then(() => {
      const jobsHash = this.pluginReduce(
        Lifecycle.prepareRequest,
        (plugin, next) => plugin(next, jobs),
        jobs
      );

      const shouldSendRequest = this.pluginReduce(Lifecycle.shouldSendRequest, (plugin, next) => {
        return next && plugin(jobsHash);
      }, true);

      return {
        shouldSendRequest,
        jobsHash
      };
    });
  }

  private renderHTML(viewName, data) {
    const uuid = uuidV4();

    return `
      <div data-ssr-key="${viewName}" data-ssr-id="${uuid}"></div>
      <script type="application/json" data-ssr-key="${viewName}" data-ssr-id="${uuid}"><!--${encode(data)}--></script>
    `;
  }

  private fallback(error, jobs) {
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

  private toHTML(views) {
    return reduce(views, (res, name) => res + views[name].html, '');
  }

  private toCss(views) {
    return reduce(views, (res, name) => res + views[name].css, '');
  }

  private toState(views) {
    return reduce(views, (res, name) => res + views[name].state, '');
  }

  public render(data) {
    const jobs = this.createJobs(data);

    return this.prepareRequest(jobs)
      .then((item) => {
        if (!item.shouldSendRequest) {
          return this.fallback(null, item.jobsHash);
        }

        this.pluginReduce(Lifecycle.willSendRequest, (plugin) => plugin(item.jobsHash));

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
                return this.pluginReduce(Lifecycle.onError, (plugin) => {
                  return plugin(res.error, results);
                });
              }

              Object.values(results).forEach((job: any) => {
                if (job.error) {
                  this.pluginReduce(Lifecycle.onError, (plugin) => plugin(job.error, job));
                }
              });

              const successfulJobs = reduce(res.results, (success, key) => {
                return Object.assign(success, {
                  [key]: res.results[key].job,
                });
              }, {});

              this.pluginReduce(Lifecycle.onSuccess, (plugin) => plugin(successfulJobs));

              return this.plugins.length ?
                this.pluginReduce(Lifecycle.afterResponse, (plugin, next) => plugin(next, results), results) :
                {
                  html: this.toHTML(results),
                  css: this.toCss(results),
                  state: this.toState(results)
                };
            } catch (err) {
              this.pluginReduce(Lifecycle.onError, (plugin) => plugin(err, results));
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