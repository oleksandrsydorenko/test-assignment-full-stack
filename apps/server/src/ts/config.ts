export interface IBaseConfig {
  env: {
    isDevelopment: boolean;
    type: string;
  };
}

export interface IExpressUrlScheme {
  host: string;
  port: number | null;
  protocol: string;
}

export interface IExpressConfig extends IExpressUrlScheme {
  url: string;
}

export interface IMongooseUrlScheme {
  host: string;
  port: number | null;
  protocol: string;
}

export interface IMongooseConfig extends IMongooseUrlScheme {
  dbName: string;
  isErasingEnabled: boolean;
  password: string | undefined;
  url: string;
  username: string | undefined;
}

export interface IProcessEnv {
  [key: string]: string | undefined;
}

export interface IConfig {
  base: IBaseConfig;
  express: IExpressConfig;
  mongoose: IMongooseConfig;
}
