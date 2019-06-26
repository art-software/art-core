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
            [`${ projectVirtualPath }/demo-one`]: ['./client/demo-one/index.tsx'],
            [`${ projectVirtualPath }/demo-two`]: ['./client/demo-two/index.tsx'],
            [`${ projectVirtualPath }/demo-three`]: ['./client/demo-three/index.tsx']
        },
    output: {
      // Config CDN path for static files, images ....
      // intePublicPath: 'http://10.10.10.132:9090/frontend/',
      // intePublicPath: 'https://cdn.yuguomin.com/h5/',
      intePublicPath: 'https://dev.local.com/art-demo-test/',
      prodPublicPath: 'https://cdn.qianshengqian.com/h5/'
    },
    dll: {
      version: 'dll_version_02',
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
    workboxOutputDirectory: 'workbox',
    workboxGenerateSWOptions: {
      // include: [/\.html$/],
      runtimeCaching: [
        {
          urlPattern: new RegExp('/api3/'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-runtime-cache',
            expiration: {
              maxEntries: 200,
              maxAgeSeconds: 7 * 24 * 60 * 60
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
}

module.exports = artConfig;