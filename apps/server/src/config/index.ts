import baseConfig from './base';
import expressConfig from './express';
import mongooseConfig from './mongoose';
import { IConfig } from '../ts';

const config: IConfig = {
  base: baseConfig,
  express: expressConfig,
  mongoose: mongooseConfig,
};

export default config;
