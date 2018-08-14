import { confirmModules } from '../utils/inquirer';
import appConfig from '../config/appConfig';
import choosePort from '../../../art-dev-utils/lib/choosePort';

const envName = appConfig.get('NODE_ENV');
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = appConfig.get(`devPort:${envName}`);

const confirmModulesCb = (answer) => {
  if (answer.availableModulesOk === false) { return; }

  choosePort(HOST, DEFAULT_PORT)
    .then((port) => {
      if (port === null) { return; }

      appConfig.set(`devPort:${envName}`, port);
    })
    .catch((error) => {
      if (error && error.message) {
        console.log(error.message);
      }
      process.exit(1);
    });
};

confirmModules(confirmModulesCb);