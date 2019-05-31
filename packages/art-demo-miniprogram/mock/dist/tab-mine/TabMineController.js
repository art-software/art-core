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
let TabMineController = class TabMineController {
    getMineInfo() {
        return {
            success: true,
            code: '0000',
            message: 'success',
            data: mockjs_1.default.mock({
                avatarUrl: 'http://me.dev.com:3001/public/miniprogram/mkt/album-setting/assets/img-member-test.png',
                memberType: '1',
                mobileNo: '13122005258',
                nickName: '钟鸡脖',
                openId: '3345671asdbk',
                totalCapacity: 5,
                'usedCapacity|1-5': 1,
                zone: '上海'
            })
        };
    }
};
__decorate([
    routing_controllers_1.Get('/my/info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TabMineController.prototype, "getMineInfo", null);
TabMineController = __decorate([
    routing_controllers_1.Controller()
], TabMineController);
exports.default = TabMineController;
