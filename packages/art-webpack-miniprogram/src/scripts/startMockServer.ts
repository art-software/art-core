import App from 'art-server-mock-miniprogram/dist/index';
import { warningText } from 'art-dev-utils/lib/chalkColors';
import appConfig from '../config/appConfig';

const PORT = appConfig.get('PORT');

const app = new App({
  port: PORT
});

app.start()
  .catch((err) => {
    return console.log(warningText('Error: '), err);
  });

process.on('uncaughtException', (err) => {
  console.log(warningText('uncaughtException: '), err);
});