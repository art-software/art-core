"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRenderWebApi_1 = require("../BaseRenderWebApi");
class ProductService {
    requestRenderProduct(req) {
        const jobs = {
            Product: {
                name: 'Product',
                data: {
                    url: req.url
                }
            }
        };
        return BaseRenderWebApi_1.aggregator.render(jobs).then((result) => {
            console.log('result: ', result);
            return result;
        });
    }
}
exports.ProductService = ProductService;
