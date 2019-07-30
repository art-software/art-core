const projectVirtualPath = 'demo/test';

const artConfig = {
  projectVirtualPath,

  // The version 
  version: Date.now(),

  // If true will received `public/some/module/bundle229503e9d2e481b9223c.js`
  // If false will received `public/some/module/bundle.js`
  enableBundleHashName: false,

  devHost: {
    dev: 'http://me.dev.com',
    prod: 'http://me.dev.com'
  },

  webpack: {
    entry: {
      [`${projectVirtualPath}/home`]: ['./client/home/index.tsx'],
      [`${projectVirtualPath}/test`]: ['./client/test/index.tsx']
    },

    output: {
      // Config CDN path for static files, images ....
      intePublicPath: 'replace_it',

      prodPublicPath: 'replace_it'
    },

    dll: {
      'version': 'dll_version_01',

      'vendors': [
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

  'sw': {
    'enable': true,
    'includeModules': [],
    'workboxOutputDirectory': 'workbox',

    'workboxGenerateSWOptions': {
      'runtimeCaching': [{
        'urlPattern': {},
        'handler': 'CacheFirst',

        'options': {
          'cacheName': 'vendors-runtime-cache',

          'expiration': {
            'maxEntries': 2,
            'maxAgeSeconds': 1296000
          }
        }
      }]
    }
  }
};

module.exports = artConfig;