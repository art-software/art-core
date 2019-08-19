"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const aggregator_1 = require("../aggregator");
class MainService {
    requestRender(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('req.url: ', req.url);
            const jobs = {
                Main: {
                    name: 'Main',
                    data: {
                        url: req.url
                    }
                }
            };
            return aggregator_1.aggregator.render(jobs).then((result) => {
                console.log('result: ', result);
                return result;
            });
        });
    }
}
exports.default = MainService;
