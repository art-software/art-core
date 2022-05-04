"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
exports.maxCpu = Math.max(1, os.cpus().length - 1);
