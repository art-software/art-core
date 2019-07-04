"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRenderWebApi_1 = require("../BaseRenderWebApi");
class HomeService {
    requestRenderHome() {
        // return baseRenderWebApi.requestPost('/batch', {
        //   data: {
        //     Home: {
        //       name: 'Home',
        //       data: {}
        //     }
        //   }
        // }).then((result) => {
        //   if (!result) { return {}; }
        //   return result.data && result.data.results.Home;
        // });
        const jobs = {
            Home: {
                name: 'Home',
                data: {}
            }
        };
        return BaseRenderWebApi_1.aggregator.render(jobs).then((result) => {
            console.log('result: ', result);
            // return result.data && result.data.results.Home;
            return result;
        });
    }
    requestRenderAbout() {
        // return baseRenderWebApi.requestPost('/batch', {
        //   data: {
        //     About: {
        //       name: 'About',
        //       data: {}
        //     }
        //   }
        // }).then((result) => {
        //   if (!result) { return {}; }
        //   return result.data && result.data.results.About;
        // });
        const jobs = {
            About: {
                name: 'About',
                data: {}
            }
        };
        return BaseRenderWebApi_1.aggregator.render(jobs).then((result) => {
            console.log('result: ', result);
            return result;
        });
    }
}
exports.HomeService = HomeService;
