/**
 * Prefetch a given URL with an optional preferred fetch priority
 * @param {String} url - the URL to fetch
 * @param {Boolean} isPriority - if is "high" priority
 * @param {Object} conn - navigator.connection (internal)
 * @return {Object} a Promise
 */
declare function prefetcher(url: string, isPriority: boolean, conn?: any): Promise<void> | undefined;
export default prefetcher;
