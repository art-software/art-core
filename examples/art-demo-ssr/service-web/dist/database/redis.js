"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
exports.redisClient = redis_1.default.createClient();
exports.redisClient.on('error', (err) => {
    console.log('redis error: ', err);
});
exports.redisClient.on('connect', () => {
    console.log('Redis client connected');
});
