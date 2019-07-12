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
  "https://dev.local.com/art-demo-test/client/demo-two/workbox/workbox-index.fe230b4ae964c4ca656ad3a93df7ab00.js",
  "https://dev.local.com/art-demo-test/client/demo-two/workbox/precache-manifest.e831c6b9a9fb71bbb679d4e94497fdcb.js"
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

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("https://dev.local.com/art-demo-test/client/demo-two/index.html"));

workbox.routing.registerRoute(/art_framework\.\w+\.js$/, new workbox.strategies.CacheFirst({ "cacheName":"vendors-runtime-cache", plugins: [new workbox.expiration.Plugin({ maxEntries: 2, maxAgeSeconds: 1296000, purgeOnQuotaError: false })] }), 'GET');
