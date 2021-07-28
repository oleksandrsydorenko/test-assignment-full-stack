import { Response } from 'express';
import { IPromotionDocument, IPromotionResponse } from '../ts';

import { error as logError } from './logger';
import { ERROR_RESPONSE } from '../constants';

export const formatPromotionsResponse = (
  data: IPromotionDocument[]
): IPromotionResponse[] =>
  data.map(
    ({ _id, name, startDate, endDate, serialNumber, type, userGroupName }) => ({
      // eslint-disable-next-line no-underscore-dangle
      id: _id,
      name,
      startDate,
      endDate,
      type,
      serialNumber,
      userGroupName,
    })
  );

export const handleInternalServerError = (err: Error, res: Response): void => {
  logError(err);
  res.status(500).json(ERROR_RESPONSE.INTERNAL_SERVER_ERROR);
};

export const handleNotFoundError = (res: Response): void => {
  res.status(404).json(ERROR_RESPONSE.INTERNAL_SERVER_ERROR);
};
