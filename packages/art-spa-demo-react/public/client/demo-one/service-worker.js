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
  "https://cdn.qianshengqian.com/h5/client/demo-one/workbox/workbox-index.edca66664e4a9907230c26a5bc5360af.js",
  "https://cdn.qianshengqian.com/h5/client/demo-one/workbox/precache-manifest.02000c182f161f0f10ecdb5b913ce5df.js"
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

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("https://cdn.qianshengqian.com/h5/client/demo-one/index.html"));

workbox.routing.registerRoute(/\/api3\//, new workbox.strategies.NetworkFirst({ "cacheName":"api-runtime-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 200, maxAgeSeconds: 604800, purgeOnQuotaError: false }), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
