const projectVirtualPath = 'art';

const artConfig = {

  projectVirtualPath,

  // The version 
  version: Date.now(),

  // If true will received `public/some/module/bundle229503e9d2e481b9223c.js`
  // If false will received `public/some/module/bundle.js`
  enableBundleHashName: false,

  version: Date.now(),

  devHost: {
    dev: "http://me.ly.com",
    prod: "http://me.ly.com"
  },

  webpack: {
    entry: {
      [`${projectVirtualPath}/h5/mainPage`]: ["./client/h5/mainPage/index.tsx"]
    },
    output: {
      // Config CDN path for static files, images ....
      publicPath: '//example.com/images/'
    }
  }
}

module.exports = artConfig;