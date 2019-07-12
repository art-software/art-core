const modulePathPrefix = 'https://static.qianshengqian.com/workbox-v4.2.0';

importScripts(modulePathPrefix + '/workbox-sw.js');

// 设置workbox资源所在的路径前缀，否则无法找到workbox资源
workbox.setConfig({ modulePathPrefix, debug: false });

// 设置在install阶段需要缓存的precache资源的缓存仓库名称
workbox.core.setCacheNameDetails({
  prefix: 'demo-three',
  suffix: 'v1',
  precache: 'install-time-precache',
  runtime: 'runtime-cache'
});

// Supply a handler for requests that don’t match a route.
workbox.routing.setDefaultHandler(({ url, event, params }) => { });

// Any of your routes throwing an error while handling a request,
// you can capture and degrade gracefully there.
workbox.routing.setCatchHandler(({ url, event, params }) => { });
