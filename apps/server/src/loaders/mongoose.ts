import { connect, connection, models } from 'mongoose';

import config from '../config';
import { log, terminateProcess } from '../utils';

const { dbName, isErasingEnabled, password, url, username } = config.mongoose;

export default async (): Promise<void> => {
  connection.on('error', log.error);
  connection.on('open', () => {
    log.info('Mongoose is connected to %s/%s', url, dbName);
  });

  try {
    await connect(url, {
      dbName,
      pass: password,
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: username,
    });

    if (isErasingEnabled) {
      await Promise.all(
        Object.values(models).map(async model => model.deleteMany({}))
      );
      log.info('Data erased successfully');
    }
  } catch (err) {
    terminateProcess(err);
  }
};
