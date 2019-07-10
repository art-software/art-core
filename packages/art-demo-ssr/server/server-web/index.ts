import { join } from 'path';
import { config } from 'dotenv';
config({
  path: join(__dirname, '.env')
});
import 'reflect-metadata';
import { Container } from 'typedi';
import { useContainer } from 'routing-controllers';
import Server from './server';
import { warningText } from 'art-dev-utils/lib/chalkColors';

useContainer(Container);

const server = new Server();

server.start().catch((err) => {
  return console.log(warningText('Error: '), err);
});

process.on('uncaughtException', (err) => {
  console.log(warningText('uncaughtException: '), err);
});