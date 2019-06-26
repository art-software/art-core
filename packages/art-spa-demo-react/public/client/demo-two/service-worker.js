/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts(
  "https://cdn.qianshengqian.com/h5/client/demo-two/workbox/workbox-index.65f83cdfad992e2fcbfee42380513558.js",
  "https://cdn.qianshengqian.com/h5/client/demo-two/workbox/precache-manifest.fba15886f1b79cd2beabb37469323ce6.js"
);

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("https://cdn.qianshengqian.com/h5/client/demo-two/index.html"));

workbox.routing.registerRoute(/\/api3\//, new workbox.strategies.NetworkFirst({ "cacheName":"api-runtime-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 200, maxAgeSeconds: 604800, purgeOnQuotaError: false }), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
