const projectVirtualPath = 'demo/miniprogram';

const artConfig = {

  projectType: 'miniprogram',

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
      [`${projectVirtualPath}/`]: ["./client/"]
    },
    output: {
      // Config CDN path for static files, images ....
      intePublicPath: 'replace_it',
      prodPublicPath: 'replace_it'
    }
  }
}

module.exports = artConfig;