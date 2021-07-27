import { IErrorMongoose, IErrorResponse } from '../ts';

export const ERROR_MONGOOSE: IErrorMongoose = {
  DUPLICATE_KEY: 11000,
};

export const ERROR_RESPONSE: IErrorResponse = {
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
  },
};
