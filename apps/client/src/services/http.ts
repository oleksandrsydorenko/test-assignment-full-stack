import axios, { AxiosRequestConfig } from 'axios';

import { API_BASE } from '../constants';
import { IHttpRequest } from '../ts';

axios.defaults.baseURL = process.env.REACT_APP_BASE_API || API_BASE;

const request: IHttpRequest = async ({
  data,
  headers,
  method,
  params,
  url,
  onSuccess,
  onError,
}) => {
  const config: AxiosRequestConfig = {
    data,
    headers,
    method,
    params,
    url,
  };

  try {
    const response = await axios.request(config);

    onSuccess(response.data);
  } catch (err) {
    onError(err);
  }
};

export const get: IHttpRequest = async params =>
  request({
    ...params,
    method: 'GET',
  });

export const post: IHttpRequest = async params =>
  request({
    ...params,
    method: 'POST',
  });

export const put: IHttpRequest = async params =>
  request({
    ...params,
    method: 'PUT',
  });

export const del: IHttpRequest = async params =>
  request({
    ...params,
    method: 'DELETE',
  });
