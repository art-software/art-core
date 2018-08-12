#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
const version = require('../package.json').version;
const yargs = require('yargs');
// tslint:disable-next-line:no-unused-expression
yargs
    .commandDir('./commands', {
    extensions: ['js', 'ts']
})
    .usage(`${chalkColors_1.cyanBoldText('Usage:')} $0 <command> [options]`)
    .demandCommand(1, chalkColors_1.warningText(`You need at least one ${chalkColors_1.cyanBoldText('<command>')} before moving on`))
    .updateStrings({
    'Commands:': chalkColors_1.cyanBoldText('Commands:'),
    'Options:': chalkColors_1.cyanBoldText('Options:')
})
    .version(version)
    .alias('v', 'version')
    .alias('h', 'help')
    .argv;
