import express, { Application } from 'express';

import config from './config';
import loaders from './loaders';
import { log, terminateProcess } from './utils';

const startServer = async (): Promise<void> => {
  const app: Application = express();

  try {
    await loaders(app);
  } catch (err) {
    terminateProcess(err);
  }

  app
    .listen(config.express.port, () => {
      log.info('Express Server is running on %s', config.express.url);
    })
    .on('error', err => {
      terminateProcess(err);
    });
};

startServer();
