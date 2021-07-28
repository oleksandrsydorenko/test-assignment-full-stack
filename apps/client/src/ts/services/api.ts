export interface IFetchPromotions {
  ({
    page,
    limit,
    onError,
    onSuccess,
  }: {
    page: number;
    limit: number;
    onError: (error: Error) => void;
    onSuccess: (response: any) => void;
  }): void;
}

export interface IGeneratePromotions {
  ({
    count,
    limit,
    onError,
    onSuccess,
  }: {
    count: number;
    limit: number;
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
    id,
    onError,
    onSuccess,
  }: {
    id: string;
    onError: (error: Error) => void;
    onSuccess: (response: any) => void;
  }): void;
}

export interface IDuplicatePromotion {
  ({
    id,
    page,
    limit,
    onError,
    onSuccess,
  }: {
    id: string;
    page: number;
    limit: number;
    onError: (error: Error) => void;
    onSuccess: (response: any) => void;
  }): void;
}
