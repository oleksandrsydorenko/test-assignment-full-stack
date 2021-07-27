import baseConfig from './base';
import { CONFIG_DEFAULT } from '../constants';
import { IMongooseConfig, IMongooseUrlScheme, IProcessEnv } from '../ts';

const {
  DB_HOST,
  DB_ERASING_ENABLED,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_PROTOCOL,
  DB_USERNAME,
}: IProcessEnv = process.env;

if (!DB_NAME) {
  throw new Error('DB_NAME is missing in .env file');
}

const urlScheme: IMongooseUrlScheme = {
  host: DB_HOST || CONFIG_DEFAULT.DB_HOST,
  port: DB_PORT ? parseInt(DB_PORT, 10) : CONFIG_DEFAULT.DB_PORT,
  protocol: DB_PROTOCOL || CONFIG_DEFAULT.DB_PROTOCOL,
};

const config: IMongooseConfig = {
  ...urlScheme,
  dbName: DB_NAME,
  isErasingEnabled:
    baseConfig.env.isDevelopment && DB_ERASING_ENABLED === 'true',
  password: DB_PASSWORD,
  url: `${urlScheme.protocol}://${urlScheme.host}:${urlScheme.port}`,
  username: DB_USERNAME,
};

export default config;
