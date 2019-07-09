"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scaffolds_1 = require("../enums/Scaffolds");
exports.DependencyPackages = {
    [Scaffolds_1.Scaffolds.react]: ['art-lib-common', 'art-lib-react', 'art-lib-utils', 'art-server-mock', 'art-webpack'],
    [Scaffolds_1.Scaffolds.miniprogram]: ['art-lib-common', 'art-lib-react', 'art-lib-utils']
};
