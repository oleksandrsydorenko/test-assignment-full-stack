import { CONFIG_DEFAULT } from '../constants';
import { IExpressConfig, IExpressUrlScheme, IProcessEnv } from '../ts';

const { SERVER_HOST, SERVER_PORT, SERVER_PROTOCOL }: IProcessEnv = process.env;

const urlScheme: IExpressUrlScheme = {
  host: SERVER_HOST || CONFIG_DEFAULT.SERVER_HOST,
  port: SERVER_PORT ? parseInt(SERVER_PORT, 10) : CONFIG_DEFAULT.SERVER_PORT,
  protocol: SERVER_PROTOCOL || CONFIG_DEFAULT.SERVER_PROTOCOL,
};

const config: IExpressConfig = {
  ...urlScheme,
  url: `${urlScheme.protocol}://${urlScheme.host}:${urlScheme.port}`,
};

export default config;
