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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const mockjs_1 = __importDefault(require("mockjs"));
var AlbumListStatus;
(function (AlbumListStatus) {
    AlbumListStatus["willShoot"] = "0";
    AlbumListStatus["shooting"] = "1";
    AlbumListStatus["over"] = "2";
    AlbumListStatus["all"] = "";
})(AlbumListStatus || (AlbumListStatus = {}));
let TabAlbumController = class TabAlbumController {
    albumQueryAlbumList() {
        return {
            success: true,
            code: '0000',
            message: 'success',
            data: mockjs_1.default.mock({
                'content|0-8': [
                    {
                        address: '万达酒店',
                        albumName: '2018陆家嘴金融峰会年度峰会暨颁奖晚会 ',
                        coverImgUrl: 'http://me.dev.com:3001/public/miniprogram/mkt/tab-home/assets/img-album-test.png',
                        date: '2019.08.02',
                        id: 0,
                        photoCount: 0,
                        albumMemberToken: 1938412,
                        'status|1': [
                            AlbumListStatus.willShoot,
                            AlbumListStatus.shooting,
                            AlbumListStatus.over
                        ],
                        viewCount: 0
                    }
                ],
                extData: {
                    ownCount: 13,
                    participantCount: 15
                },
                pageNo: 1,
                pageSize: 10,
                totalPage: 3,
                totalRecord: 30
            })
        };
    }
    // @Post('/album/create')
    // public albumCreate() {
    //   return {
    //     success: true,
    //     code: '0000',
    //     message: 'success',
    //     data: {}
    //   };
    // }
    albumDelete() {
        return {
            success: true,
            code: '0000',
            message: 'success',
            data: {}
        };
    }
    albumEnd() {
        return {
            success: true,
            code: '0000',
            message: 'success',
            data: {}
        };
    }
    albumGroupQuery() {
        return {
            code: '0000',
            message: 'success',
            data: {
                content: [
                    {
                        albumGroupName: '2018陆家嘴金融峰会年度峰会暨颁奖晚会',
                        albumGroupToken: 'albumGroupToken1234',
                        coverImgUrl: 'http://localhost:9080/john-o-nolan-644335-unsplash.jpg',
                        photoCount: 1230,
                        viewCount: 19990,
                        date: '2019.08.02',
                        address: '万达酒店'
                    },
                    {
                        albumGroupName: '2018陆家嘴金融峰会年度峰会暨颁奖晚会',
                        albumGroupToken: 'albumGroupToken1234',
                        coverImgUrl: 'http://localhost:9080/photo-1555686422-f27082669831.jpeg',
                        photoCount: 1230,
                        viewCount: 19990,
                        date: '2019.08.01',
                        address: '万达酒店'
                    },
                    {
                        albumGroupName: '2018陆家嘴金融峰会年度峰会暨颁奖晚会',
                        albumGroupToken: 'albumGroupToken1234',
                        coverImgUrl: 'http://localhost:9080/photo-1556401002-9ff3ed3197b5.jpeg',
                        photoCount: 1230,
                        viewCount: 19990,
                        date: '2019.06.02',
                        address: '万达酒店'
                    },
                    {
                        albumGroupName: '2018陆家嘴金融峰会年度峰会暨颁奖晚会',
                        albumGroupToken: 'albumGroupToken1234',
                        coverImgUrl: 'http://localhost:9080/photo-1554600515-f2d59590429b.jpeg',
                        photoCount: 1230,
                        viewCount: 19990,
                        date: '2019.05.02',
                        address: '万达酒店'
                    },
                    {
                        albumGroupName: '2018陆家嘴金融峰会年度峰会暨颁奖晚会',
                        albumGroupToken: 'albumGroupToken1234',
                        coverImgUrl: 'http://localhost:9080/photo-1554558424-4a02a6451c4b.jpeg',
                        photoCount: 1230,
                        viewCount: 19990,
                        date: '2019.10.02',
                        address: '万达酒店'
                    }
                ],
                extData: {
                    albumGroupCreateCount: 10,
                    albumGroupDeleteCount: 2
                },
                pageNo: 1,
                pageSize: 10,
                totalPage: 10,
                totalRecord: 100
            }
        };
    }
};
__decorate([
    routing_controllers_1.Post('/album/queryAlbumList'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TabAlbumController.prototype, "albumQueryAlbumList", null);
__decorate([
    routing_controllers_1.Post('/album/delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TabAlbumController.prototype, "albumDelete", null);
__decorate([
    routing_controllers_1.Post('/album/end'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TabAlbumController.prototype, "albumEnd", null);
__decorate([
    routing_controllers_1.Post('/albumGroup/query'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TabAlbumController.prototype, "albumGroupQuery", null);
TabAlbumController = __decorate([
    routing_controllers_1.Controller()
], TabAlbumController);
exports.default = TabAlbumController;
