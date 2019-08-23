/**
 * Forked and extended from GoogleChromeLabs/quicklink
 * https://github.com/GoogleChromeLabs/quicklink
 */
import prefetch from './prefetch';
import requestIdleCallback from './requestIdleCallback';
const toPrefetch = new Set();
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const link = entry.target;
            const prefetchHref = link.getAttribute('prefetch-href');
            if (toPrefetch.has(prefetchHref)) {
                observer.unobserve(link);
                toPrefetch.delete(prefetchHref);
                const urls = JSON.parse(prefetchHref);
                urls.forEach((url) => {
                    prefetcher(url);
                });
            }
        }
    });
});
/**
 * Prefetch a supplied URL. This will also remove
 * the URL from the toPrefetch Set.
 * @param {String} url - URL to prefetch
 */
function prefetcher(url) {
    // toPrefetch.delete(url);
    prefetch(new URL(url, location.href).toString(), observer.priority);
}
/**
 * Determine if the anchor tag should be prefetched.
 * A filter can be a RegExp, Function, or Array of both.
 *   - Function receives `node.href, node` arguments
 *   - RegExp receives `node.href` only (the full URL)
 * @param  {Element}  node    The anchor (<a>) tag.
 * @param  {Mixed}    filter  The custom filter(s)
 * @return {Boolean}          If true, then it should be ignored
 */
function isIgnored(node, filter) {
    return Array.isArray(filter)
        ? filter.some((x) => isIgnored(node, x))
        : (filter.test || filter).call(filter, node.href, node);
}
export default function (options) {
    if (!options) {
        options = {};
    }
    observer.priority = options.priority || false;
    const allowed = options.origins || [location.hostname];
    const ignores = options.ignores || [];
    const timeout = options.timeout || 2e3;
    const timeoutFn = options.timeoutFn || requestIdleCallback;
    timeoutFn(() => {
        // If URLs are given, prefetch them.
        if (options.urls) {
            options.urls.forEach(prefetcher);
        }
        else if (options.observerSelector) {
            Array.from((options.el || document).querySelectorAll(options.observerSelector), (link) => {
                observer.observe(link);
                // If the element matches a permitted origin
                // ~> A `[]` or `true` means everything is allowed
                const prefetchHostname = link.getAttribute('prefetch-hostname');
                const prefetchHref = link.getAttribute('prefetch-href');
                // @ts-ignore
                if (!allowed.length || allowed.includes(prefetchHostname)) {
                    if (!prefetchHref) {
                        return;
                    }
                    // tslint:disable-next-line:no-unused-expression
                    toPrefetch.add(link.getAttribute('prefetch-href'));
                }
            });
        }
        else {
            // If not, find all links and use IntersectionObserver.
            Array.from((options.el || document).querySelectorAll('a'), (link) => {
                observer.observe(link);
                // If the anchor matches a permitted origin
                // ~> A `[]` or `true` means everything is allowed
                // @ts-ignore
                if (!allowed.length || allowed.includes(link.hostname)) {
                    // If there are any filters, the link must not match any of them
                    // tslint:disable-next-line:no-unused-expression
                    isIgnored(link, ignores) || toPrefetch.add(link.href);
                }
            });
        }
    }, { timeout });
}
