/**
 * Forked and extended from GoogleChromeLabs/quicklink
 * https://github.com/GoogleChromeLabs/quicklink
 */
/**
 * Prefetch an array of URLs if the user's effective
 * connection type and data-saver preferences suggests
 * it would be useful. By default, looks at in-viewport
 * links for `document`. Can also work off a supplied
 * DOM element or static array of URLs.
 * @param {Object} options - Configuration options for quicklink
 * @param {Array} options.urls - Array of URLs to prefetch (override)
 * @param {Object} options.el - DOM element to prefetch in-viewport links of
 * @param {Boolean} options.priority - Attempt higher priority fetch (low or high)
 * @param {Array} options.origins - Allowed origins to prefetch (empty allows all)
 * @param {Array|RegExp|Function} options.ignores - Custom filter(s) that run after origin checks
 * @param {Number} options.timeout - Timeout after which prefetching will occur
 * @param {Function} options.timeoutFn - Custom timeout function
 */
interface IOptions {
    urls?: string[];
    el?: Element;
    priority?: boolean;
    origins?: string[] | boolean;
    ignores?: any[] | RegExp | Function;
    timeout?: number;
    timeoutFn?: Function;
    observerSelector?: string;
}
export default function (options: IOptions): void;
export {};
