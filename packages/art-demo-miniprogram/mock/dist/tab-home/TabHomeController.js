"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
let TabHomeController = class TabHomeController {
    portalGet() {
        return {
            success: true,
            code: '0000',
            message: 'success',
            data: {
                bannerInfoList: [
                    {
                        imgUrl: 'http://me.dev.com:8000/public/miniprogram/mkt/tab-home/assets/img-banner-test.png',
                        linkUrl: 'https://www.bing.com'
                    },
                    {
                        imgUrl: 'http://me.dev.com:8000/public/miniprogram/mkt/tab-home/assets/img-banner-test.png',
                        linkUrl: 'https://www.bing.com'
                    },
                    {
                        imgUrl: 'http://me.dev.com:8000/public/miniprogram/mkt/tab-home/assets/img-banner-test.png',
                        linkUrl: 'https://www.bing.com'
                    }
                ],
                introduceList: [
                    {
                        imgUrl: 'http://me.dev.com:8000/public/miniprogram/mkt/tab-home/assets/img-live-intro.png',
                        linkUrl: 'https://www.bing.com'
                    },
                    {
                        imgUrl: 'http://me.dev.com:8000/public/miniprogram/mkt/tab-home/assets/img-live-intro.png',
                        linkUrl: 'https://www.bing.com'
                    },
                    {
                        imgUrl: 'http://me.dev.com:8000/public/miniprogram/mkt/tab-home/assets/img-live-intro.png',
                        linkUrl: 'https://www.bing.com'
                    }
                ],
                recommendedList: [
                    {
                        albumName: '2018陆家嘴金融峰会暨颁奖晚会',
                        coverImgUrl: 'http://me.dev.com:8000/public/miniprogram/mkt/tab-home/assets/img-album-test.png',
                        dateTime: '2018.09.01',
                        viewCount: 1234,
                        creatorName: '杉菜',
                        creatorPortrait: 'http://me.dev.com:8000/public/miniprogram/mkt/tab-home/assets/icon-album-creator.png',
                        linkUrl: 'https://www.bing.com'
                    },
                    {
                        albumName: '2018陆家嘴金融峰会暨颁奖晚会',
                        coverImgUrl: 'http://me.dev.com:8000/public/miniprogram/mkt/tab-home/assets/img-album-test.png',
                        dateTime: '2018.09.01',
                        viewCount: 5678,
                        creatorName: '杉菜',
                        creatorPortrait: 'http://me.dev.com:8000/public/miniprogram/mkt/tab-home/assets/icon-album-creator.png',
                        linkUrl: 'https://www.bing.com'
                    },
                    {
                        albumName: '2018陆家嘴金融峰会暨颁奖晚会',
                        coverImgUrl: 'http://me.dev.com:8000/public/miniprogram/mkt/tab-home/assets/img-album-test.png',
                        dateTime: '2018.09.01',
                        viewCount: 391,
                        creatorName: '杉菜',
                        creatorPortrait: 'http://me.dev.com:8000/public/miniprogram/mkt/tab-home/assets/icon-album-creator.png',
                        linkUrl: 'https://www.bing.com'
                    },
                    {
                        albumName: '2018陆家嘴金融峰会暨颁奖晚会',
                        coverImgUrl: 'http://me.dev.com:8000/public/miniprogram/mkt/tab-home/assets/img-album-test.png',
                        dateTime: '2018.09.01',
                        viewCount: 663,
                        creatorName: '杉菜',
                        creatorPortrait: 'http://me.dev.com:8000/public/miniprogram/mkt/tab-home/assets/icon-album-creator.png',
                        linkUrl: 'https://www.bing.com'
                    }
                ]
            }
        };
    }
};
__decorate([
    routing_controllers_1.Get('/portal/get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TabHomeController.prototype, "portalGet", null);
TabHomeController = __decorate([
    routing_controllers_1.Controller()
], TabHomeController);
exports.default = TabHomeController;
