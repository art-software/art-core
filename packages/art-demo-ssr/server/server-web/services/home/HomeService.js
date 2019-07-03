"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRenderWebApi_1 = require("../BaseRenderWebApi");
class HomeService {
    requestRenderHome() {
        return BaseRenderWebApi_1.baseRenderWebApi.requestPost('/batch', {
            data: {
                Home: {
                    name: 'Home',
                    data: {}
                }
            }
        }).then((result) => {
            if (!result) {
                return {};
            }
            return result.data && result.data.results.Home;
        });
    }
    requestRenderAbout() {
        return BaseRenderWebApi_1.baseRenderWebApi.requestPost('/batch', {
            data: {
                About: {
                    name: 'About',
                    data: {}
                }
            }
        }).then((result) => {
            if (!result) {
                return {};
            }
            return result.data && result.data.results.About;
        });
    }
}
exports.HomeService = HomeService;
