const projectVirtualPath = 'art/finance';

const artConfig = {

  projectVirtualPath,

  // If true will received `public/some/module/bundle229503e9d2e481b9223c.js`
  // If false will received `public/some/module/bundle.js`
  enableBundleHashName: false,

  version: Date.now(),

  webpack: {
    entry: {
      [`${projectVirtualPath}/app/201804/mainPage`]: ["./client/app/201804/mainPage/index.tsx"],
      [`${projectVirtualPath}/app/201808/xwNewsList`]: ["./client/app/201808/xwNewsList/index.tsx"]
    },
    output: {
      // Config CDN path for static files, images ....
      publicPath: '//example.com/images/'
    }
  }
}

module.exports = artConfig;