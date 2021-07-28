import { error as logError } from './logger';

// eslint-disable-next-line import/prefer-default-export
export const terminateProcess = (err?: Error): void => {
  if (err) {
    logError(err);
  }

  process.exit(1);
};
