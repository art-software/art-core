"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nconf_1 = __importDefault(require("nconf"));
const paths_1 = __importDefault(require("./paths"));
const artConfig = require(paths_1.default.appArtConfig);
nconf_1.default.argv().env().file({ file: artConfig });
exports.default = nconf_1.default;
