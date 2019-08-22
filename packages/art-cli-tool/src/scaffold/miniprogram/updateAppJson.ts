import { printInstructions } from '../printLog';
import fs from 'fs-extra';

module.exports = function (scaffoldTo, callback) {
  const scaffoldInstance = this;
  printInstructions(`Update all scaffold(${scaffoldInstance.scaffoldType}) [app JSON] files...`);
  console.log('scaffoldTo', scaffoldTo);
  fs.readFile(`${scaffoldTo}/client/app.json`, 'utf8', (err, data) => {
    if (err) {
      console.log('app.json update failed with following err, please maually modify it', err);
    } else {
      try {
        const appConfig = JSON.parse(data);
        const moduleName = this.moduleName.indexOf('/') === 0 ? this.moduleName.substr(1) : this.moduleName;
        appConfig.pages.push(`${moduleName}/pages/index`);
        fs.writeFileSync(`${scaffoldTo}/client/app.json`, JSON.stringify(appConfig, null, 2), 'utf8');
        printInstructions(`Update all scaffold(${scaffoldInstance.scaffoldType}) [app JSON] files ok`);
      } catch (err) { console.log('err', err); }
    }
    callback();
  });
};