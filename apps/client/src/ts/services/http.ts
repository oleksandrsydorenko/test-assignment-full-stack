import { AxiosResponse, Method } from 'axios';

export interface IHttpRequest {
  ({
    data,
    headers,
    method,
    params,
    url,
    onSuccess,
    onError,
  }: {
    data?: { [value: string]: any };
    headers?: { [value: string]: string };
    method?: Method;
    params?: { [value: string]: any };
    url: string;
    onSuccess: (data: AxiosResponse) => void;
    onError: (err: Error) => void;
  }): Promise<void>;
}
