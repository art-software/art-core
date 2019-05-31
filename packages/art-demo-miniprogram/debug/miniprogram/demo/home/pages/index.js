"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var HomeService_1 = require("../services/HomeService");

Page({
  data: {
    name: ''
  },
  onLoad: function onLoad() {
    var _this = this;

    wx.setNavigationBarTitle({
      title: 'Home'
    });
    var homeService = new HomeService_1.HomeService();
    homeService.demoGet().then(function (result) {
      var data = result.data || {};

      if (!_this.setData) {
        return;
      }

      _this.setData({
        name: data.name
      });
    }).catch(function (err) {
      console.log('err: ', err);
    });
  }
});