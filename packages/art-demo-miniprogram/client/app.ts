// app.ts
export interface IMyApp {
  userInfoReadyCallback?(res: wx.UserInfo): void;
  globalData: {
    userInfo?: wx.UserInfo
  };
}

App<IMyApp>({
  globalData: {
  }
});