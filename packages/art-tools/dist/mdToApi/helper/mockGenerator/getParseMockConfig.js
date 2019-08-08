"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMockDocConfig_1 = require("./getMockDocConfig");
exports.getParseMockConfig = (moduleList) => {
    return moduleList.map((module) => {
        return getMockDocConfig_1.getModuleDocToMockConfig(module);
    });
};
