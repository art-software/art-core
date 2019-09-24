import 'reflect-metadata';
import Server from './server';

const startServer = async () => {
  const server = new Server();

  // start server
  server.start().catch((serverErr) => {
    return console.log('Error: ', serverErr);
  });

  process.on('uncaughtException', (err) => {
    console.log('uncaughtException: ', err);
  });
};

startServer();