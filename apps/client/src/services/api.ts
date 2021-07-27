import { API } from '../constants';
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
    url: API.PROMOTIONS,
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
    url: API.PROMOTIONS,
    onError,
    onSuccess,
  });

export const deletePromotions: IDeletePromotions = ({ onError, onSuccess }) =>
  del({
    url: API.PROMOTIONS,
    onError,
    onSuccess,
  });
