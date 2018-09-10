import { printInstructions } from '../printLog';

module.exports = function (scaffoldFrom: string, scaffoldTo: string, callback) {
  console.log('syncArtConfig');

  const configFiles = [
    `${scaffoldFrom}/.babelrc`,
    `${scaffoldFrom}/.eslintignore`,
    `${scaffoldFrom}/.eslintrc.json`,
    // npm publish . can't upload .gitignore to npmjs.org using .venusignore instead
    // `${scaffoldFrom}/.venusignore`,
    `${scaffoldFrom}/jest.config.js`,
    `${scaffoldFrom}/tsconfig.json`,
    `${scaffoldFrom}/tslint.json`,
    `${scaffoldFrom}/package.json`,
    `${scaffoldFrom}/README.md`
  ];

  const scaffoldInstance = this;
  printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [config] files...`);

};