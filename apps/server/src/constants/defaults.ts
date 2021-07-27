import { IConfigDefault, IParamsDefault } from '../ts';

export const CONFIG_DEFAULT: IConfigDefault = {
  DB_HOST: 'localhost',
  DB_PROTOCOL: 'mongodb',
  DB_PORT: 27017,
  SERVER_HOST: 'localhost',
  SERVER_PORT: 8000,
  SERVER_PROTOCOL: 'http',
};

export const PARAMS_DEFAULT: IParamsDefault = {
  PROMOTIONS_CHUNK_SIZE: 100,
  PROMOTIONS_COUNT: 1000,
  PROMOTIONS_LIMIT: 50,
  PROMOTIONS_PAGE: 1,
};
