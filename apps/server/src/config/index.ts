import { IConfig } from '../ts';

import baseConfig from './base';
import expressConfig from './express';
import mongooseConfig from './mongoose';

const config: IConfig = {
  base: baseConfig,
  express: expressConfig,
  mongoose: mongooseConfig,
};

export default config;
