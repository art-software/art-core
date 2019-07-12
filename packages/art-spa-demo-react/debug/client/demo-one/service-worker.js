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
  "https://dev.local.com/art-demo-test/client/demo-one/workbox/workbox-index.be1f3e8f8d487bc71191a5cb960c986a.js",
  "https://dev.local.com/art-demo-test/client/demo-one/workbox/precache-manifest.3653a44f85d13d4f31d856f29d850a56.js"
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

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("https://dev.local.com/art-demo-test/client/demo-one/index.html"));

workbox.routing.registerRoute(/art_framework\.\w+\.js$/, new workbox.strategies.CacheFirst({ "cacheName":"vendors-runtime-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 2, maxAgeSeconds: 1296000, purgeOnQuotaError: false })] }), 'GET');
