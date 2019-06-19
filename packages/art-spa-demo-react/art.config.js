const projectVirtualPath = 'client';

const artConfig = {

  projectVirtualPath,

  // The version 
  version: Date.now(),

  // If true will received `public/some/module/bundle229503e9d2e481b9223c.js`
  // If false will received `public/some/module/bundle.js`
  enableBundleHashName: false,

  version: Date.now(),

  devHost: {
    dev: "http://me.dev.com",
    prod: "http://me.dev.com"
  },

  webpack: {
    entry: {
      [`${projectVirtualPath}/demo-one`]: ['./client/demo-one/index.tsx'],
      [`${projectVirtualPath}/demo-two`]: ['./client/demo-two/index.tsx']
    },
    output: {
      // Config CDN path for static files, images ....
      // intePublicPath: 'http://10.10.10.132:9090/frontend/',
      // intePublicPath: 'https://cdn.yuguomin.com/h5/',
      intePublicPath: 'https://dev.local.com/art-demo-test/',
      prodPublicPath: 'https://cdn.qianshengqian.com/h5/'
    },
    dll: {
      version: 'dll_version_01',
      vendors: [] // modify this option cautiously
    }
  },

  sw: {
    enable: true,
    isUpdateRuntimeCache: true,
    workboxGenerateSWOptions: {
      include: [/\.html$/],
      runtimeCaching: [
        {
          urlPattern: new RegExp('/api3/'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-response-runtime-cache',
            expiration: {
              maxEntries: 200,
              maxAgeSeconds: 7 * 24 * 60 * 60
            },
            cacheableResponse: {
              statuses: [200]
            }
          }
        },
        {
          urlPattern: new RegExp('https://dev.local.com/art-demo-test/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'cdn-assets-runtime-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 15 * 24 * 60 * 60
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: new RegExp('https://static.qianshengqian.com/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'third-party-assets-runtime-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 30 * 24 * 60 * 60
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: new RegExp('https://qsqweb-10000035.image.myqcloud.com/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'myqcloud-assets-runtime-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 15 * 24 * 60 * 60
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