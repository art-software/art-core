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
  "https://dev.local.com/art-demo-test/demo/spa/react/sw-demo/workbox/workbox-index.f2bb4f36817d9d866e637db6c0d71846.js",
  "https://dev.local.com/art-demo-test/demo/spa/react/sw-demo/workbox/precache-manifest.4a650a58b1fa8ac7eae1b09cec20caef.js"
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("https://dev.local.com/art-demo-test/demo/spa/react/sw-demo/index.html"));

workbox.routing.registerRoute(/art_framework\.\w+\.js$/, new workbox.strategies.CacheFirst({ "cacheName":"vendors-runtime-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 2, maxAgeSeconds: 1296000, purgeOnQuotaError: false })] }), 'GET');
