"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const nconf_1 = __importDefault(require("nconf"));
const paths_1 = __importDefault(require("./paths"));
const path = __importStar(require("path"));
const artConfig = require(paths_1.default.appArtConfig);
nconf_1.default.argv().env()
    .file({
    file: path.resolve(__dirname, '../../environment.json')
})
    .merge('art', artConfig);
exports.default = nconf_1.default;
