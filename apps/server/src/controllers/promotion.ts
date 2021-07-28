import { Request, Response } from 'express';

import { Promotion } from '../models';
import {
  formatPromotionsResponse,
  handleInternalServerError,
  handleNotFoundError,
  parseStringToNumber,
} from '../utils';
import { IPromotionDocument, IPromotion } from '../ts';

const prepareData = (document: IPromotionDocument): IPromotion => ({
  name: document.name,
  startDate: document.startDate,
  endDate: document.endDate,
  serialNumber: document.serialNumber,
  type: document.type,
  userGroupName: document.userGroupName,
});

export const duplicatePromotion = async (req: Request, res: Response) => {
  const { id, page: pageParam, limit: limitParam } = req.body;
  const page = parseStringToNumber(pageParam);
  const limit = parseStringToNumber(limitParam);

  try {
    const prototype = await Promotion.findById(id);

    if (prototype) {
      await new Promotion(prepareData(prototype)).save();

      const result = await Promotion.find().sort({ serialNumber: 1 });
      const slicedResult = result.slice(0, page * limit + 1);

      res.status(200).json(formatPromotionsResponse(slicedResult));
    } else {
      handleNotFoundError(res);
    }
  } catch (err) {
    handleInternalServerError(err, res);
  }
};

export const updatePromotion = async (req: Request, res: Response) => {
  const { id, ...rest } = req.body;

  try {
    const result = await Promotion.findByIdAndUpdate(id, rest);

    if (result) {
      res.status(200).end();
    } else {
      handleNotFoundError(res);
    }
  } catch (err) {
    handleInternalServerError(err, res);
  }
};

export const deletePromotion = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const result = await Promotion.findByIdAndDelete(id);

    if (result) {
      res.status(200).json(result);
    } else {
      handleNotFoundError(res);
    }
  } catch (err) {
    handleInternalServerError(err, res);
  }
};
