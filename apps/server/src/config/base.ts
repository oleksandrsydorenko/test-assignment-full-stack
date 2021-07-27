import dotenv, { DotenvConfigOutput } from 'dotenv';

import { IBaseConfig } from '../ts';

const env: DotenvConfigOutput = dotenv.config();

if (env.error) {
  throw new Error('.env file is missing');
}

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const config: IBaseConfig = {
  env: {
    isDevelopment: process.env.NODE_ENV === 'development',
    type: process.env.NODE_ENV,
  },
};

export default config;
