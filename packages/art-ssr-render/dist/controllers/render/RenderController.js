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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const ServerConfig_1 = require("../../config/ServerConfig");
const BatchRenderService_1 = __importDefault(require("../../services/BatchRenderService"));
const processBatch_1 = require("./processBatch");
let RenderController = class RenderController {
    render(req, res) {
        console.log('req.body: ', req.body);
        // TODO
        // if (isClosing()) {
        //   Logger.info('Starting request when closing!');
        // }
        const serverConfig = ServerConfig_1.ServerConfig.get();
        const batchRenderService = new BatchRenderService_1.default(req, res, serverConfig);
        return processBatch_1.processBatch(req.body, serverConfig.plugins, batchRenderService, serverConfig.processJobsConcurrent)
            .then(() => {
            // TODO
            // if (isClosing()) {
            //   Logger.info('Ending request when closing!');
            // }
            return res.status(batchRenderService.statusCode)
                .json(batchRenderService.getResults());
        })
            .catch(() => {
            res.status(batchRenderService.statusCode).end();
        });
    }
};
__decorate([
    routing_controllers_1.Post(ServerConfig_1.ServerConfig.get().endpoint),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RenderController.prototype, "render", null);
RenderController = __decorate([
    routing_controllers_1.Controller()
], RenderController);
exports.RenderController = RenderController;
