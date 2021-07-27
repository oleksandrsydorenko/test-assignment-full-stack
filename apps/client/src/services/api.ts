import { API_ROUTE } from '../constants';
import { del, get, post } from './http';

import {
  IDeletePromotions,
  IFetchPromotions,
  IGeneratePromotions,
} from '../ts';

export const fetchPromotions: IFetchPromotions = ({
  params,
  onError,
  onSuccess,
}) =>
  get({
    params,
    url: API_ROUTE.PROMOTIONS,
    onError,
    onSuccess,
  });

export const generatePromotions: IGeneratePromotions = ({
  data,
  onError,
  onSuccess,
}) =>
  post({
    data,
    url: API_ROUTE.PROMOTIONS,
    onError,
    onSuccess,
  });

export const deletePromotions: IDeletePromotions = ({ onError, onSuccess }) =>
  del({
    url: API_ROUTE.PROMOTIONS,
    onError,
    onSuccess,
  });
