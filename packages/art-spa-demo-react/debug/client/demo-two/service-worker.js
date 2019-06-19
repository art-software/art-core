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
  "https://dev.local.com/art-demo-test/client/demo-two/workbox-index.a8d089a8f66878509d4bb94b49803bc7.js",
  "https://dev.local.com/art-demo-test/client/demo-two/precache-manifest.fc4810007fe44ecea05ecbcb9d27054b.js"
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

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("https://dev.local.com/art-demo-test/client/demo-two/index.html"));

workbox.routing.registerRoute(/\/api3\//, new workbox.strategies.NetworkFirst({ "cacheName":"api-response-runtime-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 200, maxAgeSeconds: 604800, purgeOnQuotaError: false }), new workbox.cacheableResponse.Plugin({ statuses: [ 200 ] })] }), 'GET');
workbox.routing.registerRoute(/https:\/\/dev.local.com\/art-demo-test\//, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"cdn-assets-runtime-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 50, maxAgeSeconds: 1296000, purgeOnQuotaError: false }), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
workbox.routing.registerRoute(/https:\/\/static.qianshengqian.com\//, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"third-party-assets-runtime-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 10, maxAgeSeconds: 2592000, purgeOnQuotaError: false }), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
workbox.routing.registerRoute(/https:\/\/qsqweb-10000035.image.myqcloud.com\//, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"myqcloud-assets-runtime-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 100, maxAgeSeconds: 1296000, purgeOnQuotaError: false }), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
