"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var IndexService_1 = __importDefault(require("../services/IndexService"));

var indexService = new IndexService_1.default();
Page({
  onLoad: function onLoad() {
    wx.setNavigationBarTitle({
      title: 'Good Beginning'
    });
  },
  onClickBtn: function onClickBtn() {
    indexService.getData().then(function (result) {
      console.log('result:', result);
    }).catch(function (err) {
      console.log('err:', err);
    });
    wx.showToast({
      title: 'you have click this button',
      icon: 'none',
      duration: 1600
    });
  }
});