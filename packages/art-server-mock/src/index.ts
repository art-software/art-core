import { config } from 'dotenv';
config();
import 'reflect-metadata';
import { Container } from 'typedi';
import { useContainer } from 'routing-controllers';
import App from './Application';
import { warningText } from 'art-dev-utils/lib/chalkColors';

useContainer(Container);

const app = new App();

app.start().catch((err) => {
  return console.log(warningText('Error: '), err);
});

process.on('uncaughtException', (err) => {
  console.log(warningText('uncaughtException: '), err);
});