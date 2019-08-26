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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const MainService_1 = __importDefault(require("../../services/Main/MainService"));
const redis_1 = require("../../database/redis");
const redis_2 = __importDefault(require("redis"));
let HomeController = class HomeController {
    main(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const redisResult = yield new Promise((resolve) => {
                redis_1.redisClient.get('art-demo-ssr:/', (error, result) => {
                    console.log('get result from redis');
                    resolve(result);
                });
            });
            console.log('redisResult: ', redisResult);
            if (redisResult !== null) {
                console.log('response redis result');
                return res.send(redisResult);
            }
            console.log('handle request');
            const mainService = new MainService_1.default();
            const { html, css, state } = yield mainService.requestRender(req);
            const renderedHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="keywords" content="put your keyword here" />
        <meta name="description" content="put your content here" />
        <title>it is title</title>
        <style>${css}</style>
        <link rel="stylesheet" type="text/css" href="http://me.dev.com:3001/public/demo/ssr/main/bundle.css">
      </head>
      <body>
        <script>
          window.REDUX_DATA = ${state}
        </script>
        ${html}
        <script type="text/javascript" src="http://me.dev.com:3001/public/demo/ssr/main/bundle.js"></script>
      </body>
      </html>
    `;
            redis_1.redisClient.set('art-demo-ssr:/', renderedHtml, redis_2.default.print);
            return res.send(renderedHtml);
        });
    }
};
__decorate([
    routing_controllers_1.Get('/home'),
    routing_controllers_1.Get('/product'),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "main", null);
HomeController = __decorate([
    routing_controllers_1.Controller()
], HomeController);
exports.default = HomeController;
