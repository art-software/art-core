const projectVirtualPath = 'asas';

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
            [`${ projectVirtualPath }/home`]: ['./client/home/main.ts'],
            [`${ projectVirtualPath }/mine`]: ['./client/mine/main.ts']
        },
    output: {
      // Config CDN path for static files, images ....
      intePublicPath: 'replace_it',
      prodPublicPath: 'replace_it'
    }
  },

  isCutOut: false
}

module.exports = artConfig;