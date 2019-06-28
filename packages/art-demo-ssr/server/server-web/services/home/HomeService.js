"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRenderWebApi_1 = require("../BaseRenderWebApi");
class HomeService {
    requestRender() {
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
}
exports.HomeService = HomeService;
