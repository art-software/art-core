"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
const npmUpdate_1 = require("../helpers/npmUpdate");
const chalk_1 = __importDefault(require("chalk"));
class UpdateCommand {
    constructor() {
        this.command = 'update';
        this.desc = chalk_1.default.black.bold('Check project art dependencies updates, conforming to Semantic Versioning');
    }
    builder(args) {
        return args.usage(`${chalkColors_1.cyanBoldText('Usage:')} $0 upgrade`)
            .example(`${chalkColors_1.greenText('$0 update')}`, 'Update project art dependencies');
    }
    handler() {
        npmUpdate_1.npmUpdate();
    }
}
module.exports = new UpdateCommand();
