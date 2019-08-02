"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerConfig {
    static get() {
        return ServerConfig.serverConfig;
    }
    static set(serverConfig) {
        return ServerConfig.serverConfig = serverConfig;
    }
}
exports.ServerConfig = ServerConfig;
