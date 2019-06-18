import { HomeService } from '../services/HomeService';

Page({

  data: {
    name: ''
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: 'Home Page'
    });

    const homeService = new HomeService();
    homeService.demoGet()
      .then((result) => {
        const data = result.data || {};
        if (!this.setData) { return; }
        this.setData({
          name: data.name
        });
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  }
});