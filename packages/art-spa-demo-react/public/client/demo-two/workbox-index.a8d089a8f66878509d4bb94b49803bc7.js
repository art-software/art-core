const modulePathPrefix = 'https://static.qianshengqian.com/workbox-v4.2.0';

importScripts(modulePathPrefix + '/workbox-sw.js');

// 设置workbox资源所在的路径前缀，否则无法找到workbox资源
workbox.setConfig({ modulePathPrefix });

// 设置在install阶段需要缓存的precache资源的缓存仓库名称
workbox.core.setCacheNameDetails({
  prefix: 'workbox',
  suffix: '',
  precache: 'install-time-precache',
  runtime: 'runtime-cache'
});

// 设置统一的fetch事件的异常处理函数
// chrome72测试发现，该函数只会在service-worker.js文件更新时生效
workbox.routing.setCatchHandler((error) => {
  // TODO fetch事件异常统计(url, event, err)
  console.log(error);
});
