"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRenderWebApi_1 = require("../BaseRenderWebApi");
class HomeService {
    requestRenderHome(req) {
        const jobs = {
            Home: {
                name: 'Home',
                data: {
                    url: req.url
                }
            }
        };
        return BaseRenderWebApi_1.aggregator.render(jobs).then((result) => {
            return result;
        });
    }
}
exports.HomeService = HomeService;
