import { IPromotion } from '../models';

export interface IEditPromotion {
  ({
    params,
    onError,
    onSuccess,
  }: {
    params: IPromotion;
    onError: (error: Error) => void;
    onSuccess: (response: any) => void;
  }): void;
}

export interface IDeletePromotions {
  ({
    onError,
    onSuccess,
  }: {
    onError: (error: Error) => void;
    onSuccess: (response: any) => void;
  }): void;
}

export interface IDeletePromotion {
  ({
    params,
    onError,
    onSuccess,
  }: {
    params: {
      id: string;
      limit: number;
    };
    onError: (error: Error) => void;
    onSuccess: (response: any) => void;
  }): void;
}

export interface IDuplicatePromotion {
  ({
    params,
    onError,
    onSuccess,
  }: {
    params: {
      id: string;
      page: number;
      limit: number;
    };
    onError: (error: Error) => void;
    onSuccess: (response: any) => void;
  }): void;
}
export interface IFetchPromotions {
  ({
    params,
    onError,
    onSuccess,
  }: {
    params: {
      page: number;
      limit: number;
    };
    onError: (error: Error) => void;
    onSuccess: (response: any) => void;
  }): void;
}

export interface IGeneratePromotions {
  ({
    params,
    onError,
    onSuccess,
  }: {
    params: {
      count: number;
      limit: number;
    };
    onError: (error: Error) => void;
    onSuccess: (response: any) => void;
  }): void;
}
