import { API_ROUTE } from '../constants';
import { del, get, post, put } from './http';

import {
  IDeletePromotions,
  IDeletePromotion,
  IDuplicatePromotion,
  IEditPromotion,
  IFetchPromotions,
  IGeneratePromotions,
} from '../ts';

export const deletePromotions: IDeletePromotions = ({ onError, onSuccess }) =>
  del({
    url: API_ROUTE.PROMOTIONS,
    onError,
    onSuccess,
  });

export const deletePromotion: IDeletePromotion = ({
  params,
  onError,
  onSuccess,
}) =>
  del({
    data: params,
    url: API_ROUTE.PROMOTION,
    onError,
    onSuccess,
  });

export const duplicatePromotion: IDuplicatePromotion = ({
  params,
  onError,
  onSuccess,
}) =>
  post({
    data: params,
    url: API_ROUTE.PROMOTION,
    onError,
    onSuccess,
  });

export const editPromotion: IEditPromotion = ({ params, onError, onSuccess }) =>
  put({
    data: params,
    url: API_ROUTE.PROMOTION,
    onError,
    onSuccess,
  });

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
  params,
  onError,
  onSuccess,
}) =>
  post({
    data: params,
    url: API_ROUTE.PROMOTIONS,
    onError,
    onSuccess,
  });
