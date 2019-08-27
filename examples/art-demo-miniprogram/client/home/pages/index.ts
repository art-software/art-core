import IndexService from '../services/IndexService';

const indexService = new IndexService();

Page<any, any>({

  onLoad() {
    wx.setNavigationBarTitle({
      title: 'Good Beginning'
    });
  },

  onClickBtn: () => {
    indexService.getData()
      .then((result) => {
        console.log('result:', result);
      })
      .catch((err) => { console.log('err:', err); });
    wx.showToast({
      title: 'you have click this button',
      icon: 'none',
      duration: 1600
    });
  }

});