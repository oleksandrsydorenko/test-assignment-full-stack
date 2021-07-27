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
    data,
    onError,
    onSuccess,
  }: {
    data: {
      count: number;
      limit: number;
    };
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
