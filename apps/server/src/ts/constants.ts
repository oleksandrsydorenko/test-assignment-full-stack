import { IError } from './base';

export interface IConfigDefault {
  DB_HOST: string;
  DB_PORT: number;
  DB_PROTOCOL: string;
  SERVER_HOST: string;
  SERVER_PORT: number;
  SERVER_PROTOCOL: string;
}

export interface IErrorMongoose {
  DUPLICATE_KEY: number;
}

export interface IErrorResponse {
  INTERNAL_SERVER_ERROR: IError;
}

export interface IPromotionType {
  BASIC: 'Basic';
  COMMON: 'Common';
  EPIC: 'Epic';
}

export interface IPromotionUserGroupName {
  STANDARD: 'Standard';
  VIP: 'VIP';
}
