const projectVirtualPath = 'art/finance';

const artConfig = {

  projectVirtualPath,

  webpack: {
    entry: {
      [`${projectVirtualPath}/app/201804/mainPage`]: ["./client/app/201804/mainPage/index.tsx"],
      [`${projectVirtualPath}/h5/201805/finance`]: ["./client/app/201805/finance/index.tsx"]
    }
  }
}

module.exports = artConfig;