import { error } from './logger';

// eslint-disable-next-line import/prefer-default-export
export const terminateProcess = (err?: Error): void => {
  if (err) {
    error(err);
  }

  process.exit(1);
};
