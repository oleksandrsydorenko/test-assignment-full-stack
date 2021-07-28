import { API_ROUTE } from '../constants';
import { del, get, post } from './http';

import {
  IDeletePromotions,
  IDeletePromotion,
  IDuplicatePromotion,
  IFetchPromotions,
  IGeneratePromotions,
} from '../ts';

export const fetchPromotions: IFetchPromotions = ({
  limit,
  page,
  onError,
  onSuccess,
}) =>
  get({
    params: {
      limit,
      page,
    },
    url: API_ROUTE.PROMOTIONS,
    onError,
    onSuccess,
  });

export const generatePromotions: IGeneratePromotions = ({
  count,
  limit,
  onError,
  onSuccess,
}) =>
  post({
    data: {
      count,
      limit,
    },
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

export const deletePromotion: IDeletePromotion = ({ id, onError, onSuccess }) =>
  del({
    data: {
      id,
    },
    url: API_ROUTE.PROMOTION,
    onError,
    onSuccess,
  });

export const duplicatePromotion: IDuplicatePromotion = ({
  id,
  limit,
  page,
  onError,
  onSuccess,
}) =>
  post({
    data: {
      id,
      limit,
      page,
    },
    url: API_ROUTE.PROMOTION,
    onError,
    onSuccess,
  });
