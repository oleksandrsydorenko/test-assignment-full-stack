export interface IError {
  code: string;
  message: string;
}

export interface IErrorMongoose {
  DUPLICATE_KEY: number;
}

export interface IErrorResponse {
  INTERNAL_SERVER_ERROR: IError;
}
