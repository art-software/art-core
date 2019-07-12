const projectVirtualPath = 'client';

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
      [`${projectVirtualPath}/demo-one`]: ['./client/demo-one/index.tsx'],
      [`${projectVirtualPath}/demo-two`]: ['./client/demo-two/index.tsx'],
      [`${projectVirtualPath}/demo-three`]: ['./client/demo-three/index.tsx']
    },
    output: {
      // Config CDN path for static files, images ....
      // intePublicPath: 'http://10.10.10.132:9090/frontend/',
      // intePublicPath: 'https://cdn.yuguomin.com/h5/',
      intePublicPath: 'https://dev.local.com/art-demo-test/',
      prodPublicPath: 'https://cdn.qianshengqian.com/h5/'
    },
    dll: {
      version: 'dll_version_04',
      vendors: [
        'polyfills',
        'react',
        'react-dom',
        'react-router-dom',
        'classnames',
        'axios',
        'workbox-window',
        'art-lib-react/src/components/scroll/lib/iscroll-probe'
      ]
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
  }
}

module.exports = artConfig;