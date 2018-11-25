"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
const webpackTask_1 = require("../helpers/webpackTask");
class ServeCommand {
    constructor() {
        this.command = 'serve';
        this.desc = chalkColors_1.grayText('Serve one or more modules');
    }
    builder(args) {
        return args.usage(`${chalkColors_1.cyanBoldText('Usage:')} $0 serve --modules="modulePath1, modulePath2, ..."`)
            .options('modules', {
            alias: 'm',
            describe: 'the modules you would like to serve',
            // demandOption: true
            demandOption: false,
            default: ''
        })
            .example(`${chalkColors_1.greenText('$0 serve -modules="client/test"')}`, 'Serve the client/test module');
    }
    handler(args) {
        webpackTask_1.webpackTask('serve', { modules: args.modules });
    }
}
module.exports = new ServeCommand();
