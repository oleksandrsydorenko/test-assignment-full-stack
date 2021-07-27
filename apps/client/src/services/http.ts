import axios, { AxiosRequestConfig } from 'axios';

import { IHttpRequest } from '../ts';
import { API } from '../constants';

axios.defaults.baseURL = process.env.REACT_APP_BASE_API || API.BASE;

const request: IHttpRequest = async ({
  url,
  data,
  headers,
  method,
  params,
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
