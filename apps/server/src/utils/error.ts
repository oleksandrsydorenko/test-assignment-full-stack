import { Response } from 'express';

import { error as logError } from './logger';
import { ERROR_RESPONSE } from '../constants';

export const handleInternalServerError = (err: Error, res: Response): void => {
  logError(err);
  res.status(500).json(ERROR_RESPONSE.INTERNAL_SERVER_ERROR);
};

export const terminateProcess = (err?: Error): void => {
  if (err) {
    logError(err);
  }

  process.exit(1);
};
