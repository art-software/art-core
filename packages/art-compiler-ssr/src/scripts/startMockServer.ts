import App from 'art-server-mock-miniprogram/dist/index';
import { warningText } from 'art-dev-utils/lib/chalkColors';
import appConfig from '../config/appConfig';

const MOCK_SERVER_PORT = appConfig.get('MOCK_SERVER_PORT');

const app = new App({
  port: MOCK_SERVER_PORT
});

app.start()
  .catch((err) => {
    return console.log(warningText('Error: '), err);
  });

process.on('uncaughtException', (err) => {
  console.log(warningText('uncaughtException: '), err);
});