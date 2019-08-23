const projectVirtualPath = 'demo/spa/react';

const artConfig = {

  projectVirtualPath,

  // The version 
  version: Date.now(),

  // If true will received `public/some/module/bundle229503e9d2e481b9223c.js`
  // If false will received `public/some/module/bundle.js`
  enableBundleHashName: false,

  devHost: {
    dev: "http://me.dev.com",
    prod: "http://me.dev.com"
  },

  webpack: {
    entry: {
      [`${projectVirtualPath}/home`]: ['./client/home/index.tsx'],
      [`${projectVirtualPath}/sw-demo`]: ['./client/sw-demo/index.tsx'],
      [`${projectVirtualPath}/mine`]: ['./client/mine/index.tsx']
    },
    output: {
      // Config CDN path for static files, images ....
      intePublicPath: 'https://dev.local.com/art-demo-test/',
      prodPublicPath: 'replace_it'
    },
    dll: {
      version: 'dll_version_01',
      vendors: [
        'polyfills',
        'react',
        'react-dom',
        'react-router-dom',
        'classnames',
        'axios',
        'workbox-window',
        'art-lib-react/src/components/scroll/lib/iscroll-probe'
      ] // modify this option cautiously
    }
  },

  sw: {
    enable: true,
    includeModules: [], // 需要使用service worker的模块
    workboxOutputDirectory: 'workbox', // 存放service worker相关文件的目录名
    workboxGenerateSWOptions: {
      // include: [/\.html$/],
      runtimeCaching: [
        {
          urlPattern: /art_framework\.\w+\.js$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'vendors-runtime-cache',
            expiration: {
              maxEntries: 2,
              maxAgeSeconds: 15 * 24 * 60 * 60
            }
          }
        }
      ]
    }
  },
  isRemoveMDToApiBegin: false
}

module.exports = artConfig;